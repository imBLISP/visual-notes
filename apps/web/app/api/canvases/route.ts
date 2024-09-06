import { db } from "@/lib/drizzle";
import { eq } from "drizzle-orm";
import {canvasesTable} from "@/lib/schema"
import { NextRequest, NextResponse } from "next/server";


// get all canvases
export const GET = async (
    req: NextRequest
) => {
    try {
        const canvases = await db.select().from(canvasesTable)
        return NextResponse.json(canvases)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}

// create a new canvas
export const POST = async (
    req: NextRequest
) => {
    try {
        const { canvas } = await req.json()
        const newCanvas = await db.insert(canvasesTable).values(canvas)
        return NextResponse.json(newCanvas)
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 })
    }
}
