import { db } from "@/lib/drizzle";
import { blocksTable, workspacesBlocksTable } from "@/lib/schema";
import { BlocksSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  // const pages = await db.select().from(blocksTable).where(eq(blocksTable.parentId, workspaceId));
  console.log("here");
  console.log(params);
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
    .where(eq(workspacesBlocksTable.workspaceId, params.id));
  console.log(JSON.stringify(pages));

  return NextResponse.json(
    pages.map((workspace) => BlocksSchema.parse(workspace))
  );
};
