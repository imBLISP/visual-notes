import {db} from "@/lib/drizzle";
import {workspacesTable} from "@/lib/schema";
import {WorkspaceSchema} from "@/lib/zod"
import {eq} from "drizzle-orm"
import {NextRequest, NextResponse} from "next/server";

// GET /api/workspaces/:workspaceId
export const GET = async (req: NextRequest, props: {params: Promise<{workspaceId: string}>}) => {
    const params = await props.params;

    const workspace = await db.select().from(workspacesTable).where(eq(workspacesTable.id, params.workspaceId));

    return NextResponse.json(
        WorkspaceSchema.parse(workspace[0])
    );
} 

// POST /api/workspaces/:workspaceId
export const POST = async (req: NextRequest, props: {params: Promise<{workspaceId: string}>}) => {
    const params = await props.params;
    const body = await req.json();
    const workspace = WorkspaceSchema.omit({id: true}).parse(body);
    const updatedWorkspace = await db.update(workspacesTable).set(workspace).where(eq(workspacesTable.id, params.workspaceId));
    return NextResponse.json(updatedWorkspace);
}

// DELETE /api/workspaces/:workspaceId
export const DELETE = async (req: NextRequest, props: {params: Promise<{workspaceId: string}>}) => {
    const params = await props.params;
    const deletedWorkspace = await db.delete(workspacesTable).where(eq(workspacesTable.id, params.workspaceId));
    return NextResponse.json(deletedWorkspace);
}