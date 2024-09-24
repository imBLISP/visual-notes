"use client"
import useBlock from "@/lib/swr/use-block"
import { useSearchParams, useParams } from "next/navigation"
import { Input } from "@repo/ui"
import { NotepadText } from "lucide-react"
import { debounce } from "lodash"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel } from "@repo/ui"
import { useMemo } from "react"
import { BlockPropertiesSchema, BlockProperties, Block } from "@/lib/zod"
import deepUpdateBlock from "@/lib/transactions/deep-update-block"
import useWorkspaceBlocks from "@/lib/swr/use-workspace-pages";
import { useEffect } from "react";

const formSchema = BlockPropertiesSchema.partial()

export default function PageTitleEditor() {

    const { workspaceId } = useParams() as { workspaceId: string };
    const searchParams = useSearchParams()
    const pageId = searchParams.get("page")
    const { block: page, mutate: mutatePage } = useBlock(pageId)
    const { mutate: mutateWorkspaceBlocks, pages: workspaceBlocks } = useWorkspaceBlocks(workspaceId)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: page?.properties?.title,
        },
    })

    useEffect(() => {
        form.reset({
            title: page?.properties?.title,
        })
    }, [page])

    const onSubmit = async (data: BlockProperties) => {
        if (!pageId) return
        if (!page) return
        if (!workspaceBlocks) return

        const updatedPage = {
            ...page,
            properties: {
                ...page?.properties,
                ...data
            }
        }
        mutatePage(updatedPage, { revalidate: false })

        // workpaceBlocks is a array of blocks, find block wtih block id pageid and update it with updatedpage
        const updatedWorkspaceBlocks = workspaceBlocks.map((block: Block) => {
            if (block.id === pageId) {
                return updatedPage
            }
            return block
        })

        mutateWorkspaceBlocks(updatedWorkspaceBlocks, { revalidate: false })

        const transaction = deepUpdateBlock(data, pageId, ["properties"])
        const res = await fetch(`/api/saveTransactions`, {
            method: "POST",
            body: JSON.stringify(transaction),
        })
    }

    const debouncedChangeTitle = useMemo(() => debounce(onSubmit, 500), [pageId, workspaceBlocks, page])

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(debouncedChangeTitle)}>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    style={{ outline: "none", boxShadow: "none", textAlign: "center" }}
                                    {...field}
                                    onBlur={form.handleSubmit(debouncedChangeTitle)}
                                    className="text-neutral-500 font-semibold border-none"
                                    defaultValue={page?.properties?.title}
                                >
                                </Input>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>

        </Form>

        // <div className="flex items-center gap-2">
        //     {page?.properties?.icon && (
        //         <div>
        //             {page?.properties?.icon}
        //         </div>
        //     )}
        //     {!page?.properties?.icon && (
        //         <NotepadText className="w-4 h-4 text-neutral-500" />
        //     )}
        //     <div onInput={(e) => debouncedChangeTitle(e.target.textContent || "")} style={{outline: "none"}} contentEditable={true} className="text-neutral-500 font-semibold border-none">
        //         {page?.properties?.title}
        //     </div>
        // </div >
    )
}