import {db} from "@/lib/drizzle";
import {workspacesTable} from "@/lib/schema";
import {WorkspaceSchema} from "@/lib/zod"
import {NextResponse} from "next/server";

export const GET = async (workspaceId: string) => {
    const workspaces = await db.select().from(pagesTable).where();

    return NextResponse.json(
        workspaces.map((workspace) => WorkspaceSchema.parse(workspace))
    );
} 