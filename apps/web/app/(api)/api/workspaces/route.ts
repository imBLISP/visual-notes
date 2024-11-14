import {db} from "@/lib/drizzle";
import {workspacesTable} from "@/lib/schema";
import {WorkspaceSchema} from "@/lib/zod"
import {NextRequest, NextResponse} from "next/server";
import { eq } from "drizzle-orm";


// GET /api/workspaces
export const GET = async () => {
    const workspaces = await db.select().from(workspacesTable).where(eq(workspacesTable.active, true));

    return NextResponse.json(
        workspaces.map((workspace) => WorkspaceSchema.parse(workspace))
    );
} 

// POST /api/workspaces
export const POST = async (req: NextRequest) => {
    const body = await req.json();
    const workspace = WorkspaceSchema.omit({id: true}).parse(body);
    const newWorkspace = await db.insert(workspacesTable).values(workspace).returning();
    return NextResponse.json(newWorkspace);
}
