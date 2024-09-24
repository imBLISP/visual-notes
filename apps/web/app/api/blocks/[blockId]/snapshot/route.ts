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

    return NextResponse.json(
        BlocksSchema.pick({
            snapshot: true,
        }).parse(block[0])
    );
};

// POST /api/blocks/:blockId/snapshot
export const POST = async (
  req: NextRequest,
  { params }: { params: { blockId: string } }
) => {
    const updateResponse = await db.update(blocksTable).set({
        snapshot: req.body,
    }).where(eq(blocksTable.id, params.blockId));

    return NextResponse.json(
        updateResponse
    );
};
