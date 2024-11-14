import { db } from "@/lib/drizzle";
import { blocksTable } from "@/lib/schema";
import { BlocksSchema, TransactionSchema, WorkspaceSchema } from "@/lib/zod";
import { eq, sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
// import {BlockTransactions} from "@/lib/zustand/blocksStore"; 
import { workspacesTable } from "@/lib/schema";

const zodSchemaMap = {
  "blocks": BlocksSchema,
  "workspaces": WorkspaceSchema
}

const dbSchemaMap: { [key: string]: any } = {
  "blocks": blocksTable,
  "workspaces": workspacesTable
}

function updateNestedObject(obj: any, path: string[], newValue: any) {
  if (path.length === 0) {
    return {
      ...obj,
      ...newValue
    };
  }

  const key = path.shift();
  if (key) {
    if (obj[key] === undefined) {
      obj[key] = {};
    }
    obj[key] = updateNestedObject(obj[key], path, newValue);
  }

  return obj;
}

export const POST = async (
  req: NextRequest
) => {
  const body = await req.json()
  const transaction = await TransactionSchema.parseAsync(body);

  try {
    let response: any = null;
    let txResponse: any;
    txResponse = await db.transaction(async (tx) => {
      for (const operation of transaction.operations) {
        const currentSchema = dbSchemaMap[operation.pointer.table];

        // SET
        if (operation.command == 'set') {
          let prev = await tx.select().from(currentSchema).where(eq(currentSchema.id, operation.pointer.id));
          if (prev.length == 0) {
            operation.args.id = operation.pointer.id
            operation.args.created_at = new Date()
            operation.args = zodSchemaMap[operation.pointer.table].parse(operation.args)
            response = await tx.insert(currentSchema).values({
              ...operation.args,
              ...('properties' in operation.args && { properties: sql`${operation.args.properties}::jsonb` })
            });
          } else {
            // TODO validate if id can be accessed by user
            let current = prev[0];
            current = updateNestedObject(current, operation.path, operation.args);
            current = zodSchemaMap[operation.pointer.table].parse(current);
            response = await tx.update(currentSchema).set({
              ...current,
              ...('properties' in current && { properties: sql`${current.properties}::jsonb` })
            }).where(eq(currentSchema.id, operation.pointer.id)).returning();
          }
        }

        // LIST AFTER
        else if (operation.command == 'listAfter') {
          let prev = await tx.select({ content: currentSchema.content }).from(currentSchema).where(eq(currentSchema.id, operation.pointer.id));
          if (!prev || prev.length == 0) {
            return;
          }
          let current = prev[0];
          let index = current?.content.findIndex((block: any) => block.id == operation.args.after);
          current?.content.splice(index + 1, 0, operation.args.id);

          let parsedCurrent = zodSchemaMap[operation.pointer.table].partial().parse(current)
          await tx.update(currentSchema).set(parsedCurrent).where(eq(currentSchema.id, operation.pointer.id)).returning();
        }

        // LIST REMOVE
        else if (operation.command == 'listRemove') {
          let prev = await tx.select().from(currentSchema).where(eq(currentSchema.id, operation.pointer.id));
          if (prev.length == 0) {
            return;
          }
          let current = prev[0];
          let content = current?.content || [];
          let index = content.findIndex((block: any) => block.id == operation.args.id);
          content.splice(index, 1);

          content = zodSchemaMap[operation.pointer.table].parse({ content })
          response = await tx.update(currentSchema).set(content).where(eq(currentSchema.id, operation.pointer.id)).returning();
        }

        // UPDATE
        else if (operation.command == 'update') {
          const updateData = zodSchemaMap[operation.pointer.table].partial().parse(operation.args)
          response = await tx.update(currentSchema).set({
            ...updateData,
            ...('properties' in updateData && { properties: sql`${updateData.properties}::jsonb` }),
            ...('snapshot' in updateData && { snapshot: sql`${updateData.snapshot}::jsonb` })
          }).where(eq(currentSchema.id, operation.pointer.id)).returning();
        }

        // DELETE
        else if (operation.command == 'delete') {
          response = await tx.delete(currentSchema).where(eq(currentSchema.id, operation.pointer.id)).returning();
        }
      }
    });
    


    return NextResponse.json(response);
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};