import { db } from "@/lib/drizzle";
import { blocksTable, workspacesTable } from "@/lib/schema";
import { BlocksSchema } from "@/lib/zod";
import { eq, sql } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) => {
  const contents = db
    .select({
      id: sql`unnest(${blocksTable.content})`.mapWith(uuid).as("id"),
      idx: sql`generate_subscripts(${blocksTable.content}, 1)`
        .mapWith(Number)
        .as("idx"),
    })
    .from(workspacesTable)
    .where(eq(workspacesTable.id, params.workspaceId))
    .orderBy(({ idx }) => idx)
    .as("contents");

  const pages = await db
    .select({
      id: blocksTable.id,
      type: blocksTable.type,
      properties: blocksTable.properties,
      parentId: blocksTable.parentId,
    })
    .from(blocksTable)
    .innerJoin(contents, eq(blocksTable.id, sql`contents.${contents.id}`));
  return NextResponse.json(pages.map((page) => BlocksSchema.parse(page)));
};
