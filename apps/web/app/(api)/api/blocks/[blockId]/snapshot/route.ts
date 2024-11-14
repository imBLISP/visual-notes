import { db } from "@/lib/drizzle";
import { blocksTable } from "@/lib/schema";
import { BlocksSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

// GET /api/blocks/:blockId/snapshot
export const GET = async (
  req: NextRequest,
  { params }: { params: { blockId: string } }
) => {
    const block = await db.select({
        snapshot: blocksTable.snapshot,
    }).from(blocksTable).where(eq(blocksTable.id, params.blockId));

    const snapshot = BlocksSchema.pick({
            snapshot: true,
        }).parse(block[0])
    
    return NextResponse.json(snapshot)
};

// POST /api/blocks/:blockId/snapshot
export const POST = async (
  req: NextRequest,
  { params }: { params: { blockId: string } }
) => {
    const body = await req.json()

    const updateResponse = await db.update(blocksTable).set({
        snapshot: body.snapshot,
    }).where(eq(blocksTable.id, params.blockId));

    return NextResponse.json(
        updateResponse
    );
};
