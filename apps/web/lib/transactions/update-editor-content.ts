import { BlockTransaction } from "@/lib/types";
import { set } from "@/lib/transactions/operations";
import { Content } from "@tiptap/core";

export default function (
    editorContent: Content,
    pageId: string,
    workspaceId: string,
): BlockTransaction {
    const path = ["properties", "editorContent"]

    return {
        operations: [
            set(editorContent, pageId, workspaceId, path),
        ],
    };
}
