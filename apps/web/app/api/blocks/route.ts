import { db } from "@/lib/drizzle";
import { blocksTable } from "@/lib/schema";
import { BlocksSchema } from "@/lib/zod";
import { sql } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";


// POST /api/blocks
export const POST = async (
  req: NextRequest,
) => {

    const body = await req.json()
    let blockData = BlocksSchema.omit({id: true}).parse(body);
    // const id = uuidv4()
    // blockData.id  = id

    const block = await db.insert(blocksTable).values({
      ...blockData,
      ...('properties' in blockData && { properties: sql`${blockData.properties}::jsonb` })
    }).returning()

  return NextResponse.json(
    BlocksSchema.parse(block[0])
  );
};