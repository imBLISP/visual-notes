import { db } from "@/lib/drizzle";
import { workspacesTable, blocksTable } from "@/lib/schema";
import { BlocksSchema, Block } from "@/lib/zod"
import { eq, inArray, and } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server";

// GET /api/blocks/:blockId/notes
export const GET = async (req: NextRequest, { params }: { params: { blockId: string } }) => {

    const notes = await db.select().from(blocksTable).where(
      eq(blocksTable.parentId, params.blockId)
    )

    return NextResponse.json(
        notes.map((block) => BlocksSchema.parse(block))
    );
} 