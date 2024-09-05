import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import { canvasesTable } from "@/lib/schema";
import { NextRequest, NextResponse } from "next/server";

// get a canvas
export const GET = async (
    req: NextRequest,
    { params }: { params: { id: string } }
) => {
    try {
        const canvasId = params.id
        const canvas = await db.select().from(canvasesTable).where(eq(canvasesTable.id, canvasId))
        return NextResponse.json(canvas)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

// update a canvas
export const PUT = async (
    req: NextRequest
) => {
    try {
        const { canvas } = await req.json()
        const updatedCanvas = await db.update(canvasesTable).set(canvas).where(eq(canvasesTable.id, canvas.id))
        return NextResponse.json(updatedCanvas)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

// delete a canvas
export const DELETE = async (
    req: NextRequest
) => {
    try {
        const { id } = await req.json()
        const deletedCanvas = await db.delete(canvasesTable).where(eq(canvasesTable.id, id))
        return NextResponse.json(deletedCanvas)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}