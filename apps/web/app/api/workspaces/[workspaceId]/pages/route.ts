import { db } from "@/lib/drizzle";
import { blocksTable, workspacesBlocksTable } from "@/lib/schema";
import { BlocksSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) => {
  const pages = await db
    .select({
      id: blocksTable.id,
      type: blocksTable.type,
      properties: blocksTable.properties,
      parentId: blocksTable.parentId,
    })
    .from(blocksTable)
    .innerJoin(
      workspacesBlocksTable,
      eq(workspacesBlocksTable.blockId, blocksTable.id)
    )
    .where(eq(workspacesBlocksTable.workspaceId, params.workspaceId));

  return NextResponse.json(
    pages.map((page) => BlocksSchema.parse(page))
  );
};
