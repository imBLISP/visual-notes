import { db } from "@/lib/drizzle";
import { blocksTable } from "@/lib/schema";
import { BlocksSchema } from "@/lib/zod";
import { eq, sql } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { blockId: string } }
) => {
  if (!params.blockId) {
    return NextResponse.json({ error: "Block ID is required" }, { status: 400 });
  }

  const contents = db
    .select({
      id: sql`unnest(${blocksTable.content})`.mapWith(uuid).as("id"),
      idx: sql`generate_subscripts(${blocksTable.content}, 1)`
        .mapWith(Number)
        .as("idx"),
    })
    .from(blocksTable)
    .where(eq(blocksTable.id, params.blockId))
    .orderBy(({ idx }) => idx)
    .as("contents");

  const blocks = await db
    .select({
      id: blocksTable.id,
      type: blocksTable.type,
      properties: blocksTable.properties,
      parentId: blocksTable.parentId,
    })
    .from(blocksTable)
    .innerJoin(contents, eq(blocksTable.id, sql`contents.${contents.id}`));

  return NextResponse.json(
    blocks.map((block) => BlocksSchema.parse(block))
  );
};

