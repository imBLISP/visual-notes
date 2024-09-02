import { db } from "@/lib/drizzle";
import { blocksTable } from "@/lib/schema";
import { BlocksSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { blockId: string } }
) => {

    const block = await db.select().from(blocksTable).where(eq(blocksTable.id, params.blockId));

  return NextResponse.json(
    BlocksSchema.parse(block[0])
  );
};

