import { db } from "@/lib/drizzle";
import { workspacesTable, blocksTable } from "@/lib/schema";
import { BlocksSchema, Block } from "@/lib/zod"
import { eq, inArray, and } from "drizzle-orm"
import { NextRequest, NextResponse } from "next/server";

// GET /api/workspaces/:workspaceId/blocks
export const GET = async (req: NextRequest, { params }: { params: { workspaceId: string } }) => {
    const workspace = await db.select({
        content: workspacesTable.content,
    }).from(workspacesTable).where(eq(workspacesTable.id, params.workspaceId));

    // content is a array of block ids 
    let blocks: Block[] = []
    if (workspace && workspace.length >= 1 && workspace[0]?.content.length > 0) {
        blocks = await db.select().from(blocksTable).where(
            and(
                inArray(blocksTable.id, workspace[0].content),
                eq(blocksTable.active, true)
            )
        )
    }

    return NextResponse.json(
        blocks.map((block) => BlocksSchema.parse(block))
    );
} 