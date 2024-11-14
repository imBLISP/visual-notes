import { NextRequest, NextResponse } from "next/server";
import { blocksTable } from "@/lib/schema";
import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm"

export const POST = async (req: NextRequest) => {
    const body = await req.json();

    const response = await db.update(blocksTable).set({
        snapshot: body.snapshot
    }).where(eq(blocksTable.id, body.blockId)).returning();

    return NextResponse.json(response);
}