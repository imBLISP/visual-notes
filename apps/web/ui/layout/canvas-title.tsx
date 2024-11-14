import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@repo/ui"
import { useSearchParams } from "next/navigation"
import useBlock from "@/lib/swr/use-block"
import TitleEditable from "@/ui/layout/title-editable"
import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import debounce from "lodash/debounce";
import deepUpdateBlock from "@/lib/transactions/deep-update-block"
import useNestedBlocks from "@/lib/swr/use-nested-blocks"
import { Block } from "@/lib/zod";

export default function CanvasTitle() {
    const { workspaceId } = useParams() as { workspaceId: string };
    const searchParams = useSearchParams();
    const pageId = searchParams.get("page")
    const { block: canvas, mutate: mutateCanvas } = useBlock(pageId)
    const { nestedBlocks, mutate: mutateNestedBlocks } = useNestedBlocks(workspaceId)

    async function onTitleChange(title: string) {
        if (!canvas || !pageId) return

        const updatedCanvas = {
            ...canvas,
            properties: {
                ...canvas.properties,
                title
            }
        }

        const updatedNestedBlocks = nestedBlocks.map((block: Block) => {
            if (block.id === pageId) {
                return updatedCanvas
            }
            return block
        })

        mutateCanvas(updatedCanvas, { revalidate: false })
        mutateNestedBlocks(updatedNestedBlocks, { revalidate: false })

        const transaction = deepUpdateBlock({ title }, pageId, ["properties"])
        const res = await fetch(`/api/saveTransactions`, {
            method: "POST",
            body: JSON.stringify(transaction),
        })
    }

    const debouncedChangeTitle = useMemo(() => debounce(onTitleChange, 500), [pageId, canvas, nestedBlocks])


    if (!canvas) return (<div>Loading...</div>);

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                    <TitleEditable
                        title={canvas?.properties.title || ""}
                        onTitleChange={debouncedChangeTitle}
                    />
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}