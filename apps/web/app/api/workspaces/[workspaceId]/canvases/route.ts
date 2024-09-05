import { db } from "@/lib/drizzle";
import { canvasesTable } from "@/lib/schema";
import { CanvasSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { workspaceId: string } }
) => {

    const canvases = await db.select().from(canvasesTable).where(eq(canvasesTable.parentId, params.workspaceId))

  return NextResponse.json(canvases.map((canvas) => CanvasSchema.parse(canvas)));
};
