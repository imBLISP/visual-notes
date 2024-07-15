import { db } from "@/lib/drizzle";
import { blocksBlocksTable, blocksTable} from "@/lib/schema";
import { BlocksSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { blockId: string } }
) => {
  const blocks = await db
    .select({
      id: blocksTable.id,
      type: blocksTable.type,
      properties: blocksTable.properties,
      parentId: blocksTable.parentId,
    })
    .from(blocksBlocksTable)
    .innerJoin(blocksTable, eq(blocksTable.id, blocksBlocksTable.blockId))
    .where(eq(blocksBlocksTable.parentBlockId, params.blockId));

  return NextResponse.json(
    blocks.map((block) => BlocksSchema.parse(block))
  );
};

