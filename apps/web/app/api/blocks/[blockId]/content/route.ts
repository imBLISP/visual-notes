import { db } from "@/lib/drizzle";
import { blocksTable } from "@/lib/schema";
import { BlocksSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { blockId: string } }
) => {
  if (!params.blockId || params.blockId == "null") {
    return NextResponse.json({ error: "Block ID is required" }, { status: 400 });
  }

  const contents = await db
    .select({
      content: blocksTable.content,
    })
    .from(blocksTable)
    .where(eq(blocksTable.id, params.blockId));

  return NextResponse.json(
    contents.map((content) => BlocksSchema.pick({ content: true }).parse(content))
  );
};

