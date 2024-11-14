import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
    PopoverTrigger,
    Popover,
    PopoverContent,
} from "@repo/ui"
import { useSearchParams } from "next/navigation"
import useBlock from "@/lib/swr/use-block"
import TitleEditable from "@/ui/layout/title-editable"
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import debounce from "lodash/debounce";
import deepUpdateBlock from "@/lib/transactions/deep-update-block"
import useNestedBlocks from "@/lib/swr/use-nested-blocks"
import { Block } from "@/lib/zod";
import { Frame } from "lucide-react";
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

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

    async function onIconChange(emoji: string) {
        if (!canvas || !pageId) return

        const updatedCanvas = {
            ...canvas,
            properties: { ...canvas.properties, icon: emoji }
        }

        const updatedNestedBlocks = nestedBlocks.map((block: Block) => {
            if (block.id === pageId) {
                return updatedCanvas
            }
            return block
        })

        mutateCanvas(updatedCanvas, { revalidate: false })
        mutateNestedBlocks(updatedNestedBlocks, { revalidate: false })

        const transaction = deepUpdateBlock({ icon: emoji }, pageId, ["properties"])
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
                    <div className="flex gap-2 items-center">
                        <CanvasIcon icon={canvas?.properties.icon || ""} onIconChange={onIconChange} />
                        <TitleEditable
                            title={canvas?.properties.title || ""}
                            onTitleChange={debouncedChangeTitle}
                        />
                    </div>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    );
}

function CanvasIcon({ icon, onIconChange }: { icon: string, onIconChange: (emoji: string) => void }) {

    function onEmojiClick(emoji: EmojiClickData) {
        onIconChange(emoji.emoji)
    }

    return (
        <Popover>
            <PopoverTrigger className="flex items-center">
                {icon ? (
                    <div className="w-5 h-5 text-gray-600 flex items-center justify-center text-lg">{icon}</div>
                ) : (
                    <Frame className="w-4 h-4 text-gray-600" />
                )}
            </PopoverTrigger>
            <PopoverContent className="p-2 w-full border-none">
                <EmojiPicker width={300} height={400} onEmojiClick={onEmojiClick} />
            </PopoverContent>
        </Popover>
    );
}