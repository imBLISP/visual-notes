import {db} from "@/lib/drizzle";
import {workspacesTable} from "@/lib/schema";
import {WorkspaceSchema} from "@/lib/zod"
import {eq} from "drizzle-orm"
import {NextRequest, NextResponse} from "next/server";

// GET /api/workspaces/:workspaceId
export const GET = async (req: NextRequest, {params}: {params: {workspaceId: string}}) => {

    const workspace = await db.select().from(workspacesTable).where(eq(workspacesTable.id, params.workspaceId));

    return NextResponse.json(
        WorkspaceSchema.parse(workspace[0])
    );
} 

// POST /api/workspaces/:workspaceId
export const POST = async (req: NextRequest, {params}: {params: {workspaceId: string}}) => {
    const body = await req.json();
    const workspace = WorkspaceSchema.omit({id: true}).parse(body);
    const updatedWorkspace = await db.update(workspacesTable).set(workspace).where(eq(workspacesTable.id, params.workspaceId));
    return NextResponse.json(updatedWorkspace);
}

// DELETE /api/workspaces/:workspaceId
export const DELETE = async (req: NextRequest, {params}: {params: {workspaceId: string}}) => {
    const deletedWorkspace = await db.delete(workspacesTable).where(eq(workspacesTable.id, params.workspaceId));
    return NextResponse.json(deletedWorkspace);
}