import { db } from "@/lib/drizzle";
import { blocksTable, workspacesTable } from "@/lib/schema";
import { BlocksSchema, Block } from "@/lib/zod";
import { eq, sql } from "drizzle-orm";
import { uuid } from "drizzle-orm/pg-core";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
    req: NextRequest,
    { params }: { params: { workspaceId: string } }
) => {

    const nestedBlocks = await db.execute(sql`
      WITH RECURSIVE nested_blocks AS (
        SELECT id, type, properties, content, parent_id, active, created_at
        FROM ${blocksTable}
        WHERE parent_id = ${params.workspaceId} AND active = true

        UNION ALL

        SELECT b.id, b.type, b.properties, b.content, b.parent_id, b.active, b.created_at
        FROM ${blocksTable} b
        INNER JOIN nested_blocks nb ON b.parent_id = nb.id
        WHERE b.active = true
      )
      SELECT * FROM nested_blocks;
    `);

    const parsedNestedBlocks = nestedBlocks.map((block: any) => {
        const mappedBlock = {
            id: blocksTable.id.mapFromDriverValue(block.id),
            type: blocksTable.type.mapFromDriverValue(block.type),
            properties: blocksTable.properties.mapFromDriverValue(block.properties),
            content: blocksTable.content.mapFromDriverValue(block.content),
            parentId: blocksTable.parentId.mapFromDriverValue(block.parent_id),
            active: blocksTable.active.mapFromDriverValue(block.active),
            created_at: blocksTable.created_at.mapFromDriverValue(block.created_at)
        }

        return BlocksSchema.parse(mappedBlock)
    })

    return NextResponse.json(parsedNestedBlocks);
};
