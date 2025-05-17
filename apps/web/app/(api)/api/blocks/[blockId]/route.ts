import { db } from "@/lib/drizzle";
import { blocksTable } from "@/lib/schema";
import { BlocksSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET /api/blocks/:blockId
export const GET = async (req: NextRequest, props: { params: Promise<{ blockId: string }> }) => {
  const params = await props.params;
  if (!params.blockId || params.blockId == "null") {
    return NextResponse.json({ error: "Block ID is required" }, { status: 400 });
  }

  const block = await db.select().from(blocksTable).where(eq(blocksTable.id, params.blockId));

  return NextResponse.json(
    BlocksSchema.parse(block[0])
  );
};

// POST /api/blocks/:blockId
export const POST = async (req: NextRequest, props: { params: Promise<{ blockId: string }> }) => {
  const params = await props.params;
  const blockData = BlocksSchema.parse(req.body)

  // update block
  const block = await db.update(blocksTable).set(blockData).where(eq(blocksTable.id, params.blockId));

  return NextResponse.json(block);
};

// DELETE /api/blocks/:blockId
export const DELETE = async (req: NextRequest, props: { params: Promise<{ blockId: string }> }) => {
  const params = await props.params;
  const block = await db.delete(blocksTable).where(eq(blocksTable.id, params.blockId));

  return NextResponse.json(block);
};  
