import { db } from "@/lib/drizzle";
import { blocksTable } from "@/lib/schema";
import { BlocksSchema, BlockTransactionSchema } from "@/lib/zod";
import { eq, sql } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import { NextRequest, NextResponse } from "next/server";
// import {BlockTransactions} from "@/lib/zustand/blocksStore"; 

const zodSchemaMap = {
  "blocks": BlocksSchema
}

const dbSchemaMap: { [key: string]: any } = {
  "blocks": blocksTable
}

function updateNestedObject(obj: any, path: string[], newValue: any) {
  const lastKey = path.pop();
  if (!lastKey) {
    return newValue;
  }
  const lastObj = path.reduce((acc, key) => acc[key], obj);
  lastObj[lastKey] = newValue;
  return obj;
}

export const POST = async (
  req: NextRequest
) => {
  const transaction = await BlockTransactionSchema.parseAsync(await req.json());

  try {
    let response: any = null;
    let txResponse: any;
    txResponse = await db.transaction(async (tx) => {
      for (const operation of transaction.operations) {
        const currentSchema = dbSchemaMap[operation.pointer.table];

        if (operation.command == 'set') {
          let prev = await tx.select().from(currentSchema).where(eq(currentSchema.id, operation.pointer.id));
          if (prev.length == 0) {
            response = await tx.insert(currentSchema).values({
              ...operation.args,
              id: operation.pointer.id,
              ...('properties' in operation.args && { properties: sql`${operation.args.properties}::jsonb` })
            });
          } else {
            let current = prev[0];
            current = updateNestedObject(current, operation.path, operation.args);
            if (current) {
              response = await tx.update(currentSchema).set(current).where(eq(currentSchema.id, operation.pointer.id));
            }
          }
        }
        else if (operation.command == 'listAfter') {
          let prev = await tx.select({ content: currentSchema.content }).from(currentSchema).where(eq(currentSchema.id, operation.pointer.id));
          if (prev.length == 0) {
            return;
          }
          let current = prev[0];
          let content = current?.content || [];
          let index = content.findIndex((block: any) => block.id == operation.args.after);
          content.splice(index + 1, 0, operation.args.id);
          response = await tx.update(currentSchema).set({ content }).where(eq(currentSchema.id, operation.pointer.id));
        }
        else if (operation.command == 'listRemove') {
          let prev = await tx.select().from(currentSchema).where(eq(currentSchema.id, operation.pointer.id));
          if (prev.length == 0) {
            return;
          }
          let current = prev[0];
          let content = current?.content || [];
          let index = content.findIndex((block: any) => block.id == operation.args.id);
          content.splice(index, 1);
          response = await tx.update(currentSchema).set({ content }).where(eq(currentSchema.id, operation.pointer.id));
        }
        else if (operation.command == 'update') {
          response = await tx.update(currentSchema).set(
            {
              ...operation.args,
              ...('properties' in operation.args && { properties: sql`${operation.args.properties}::jsonb` })
            }
          ).where(eq(currentSchema.id, operation.pointer.id));
        }

      }
    });


    return NextResponse.json(response);
  }
  catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};


