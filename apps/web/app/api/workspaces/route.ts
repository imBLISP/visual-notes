import {db} from "@/lib/drizzle";
import {workspacesTable} from "@/lib/schema";
import {WorkspaceSchema} from "@/lib/zod"
import {NextResponse} from "next/server";

export const GET = async () => {
    const workspaces = await db.select().from(workspacesTable);

    return NextResponse.json(
        workspaces.map((workspace) => WorkspaceSchema.parse(workspace))
    );
} 
