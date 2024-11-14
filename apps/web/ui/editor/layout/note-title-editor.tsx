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
import useSWRMutation from "swr";

const formSchema = BlockPropertiesSchema.partial()

export default function PageTitleEditor({ className }: { className: string }) {

    const { workspaceId } = useParams() as { workspaceId: string };
    const searchParams = useSearchParams()
    const noteId = searchParams.get("note")
    const { block: note, mutate: mutateNote } = useBlock(noteId)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: note?.properties?.title,
        },
    })

    useEffect(() => {
        form.reset({
            title: note?.properties?.title,
        })
    }, [note])

    console.log("@pageTitleEditor: rerendered", note, noteId);

    const onSubmit = async (data: BlockProperties) => {
        if (!noteId) return
        if (!note) return

        const updatedNote = {
            ...note,
            properties: {
                ...note?.properties,
                ...data
            }
        }

        console.log("@pageTitleEditor: onsubmitcalled", updatedNote);

        // const { data: res } = useSWRMutation(`/api/saveTransactions`, async (url, { arg }: { arg: any }) => {
        //     const transaction = deepUpdateBlock(data, noteId, ["properties"])
        //     const res = await fetch(`/api/saveTransactions`, {
        //         method: "POST",
        //         body: JSON.stringify(transaction),
        //     })
        //     return updatedNote
        // }, {})

        await mutateNote(updatedNote, {revalidate: false})

        // await mutateNote(async () => {
        const transaction = deepUpdateBlock(data, noteId, ["properties"])
        const res = await fetch(`/api/saveTransactions`, {
            method: "POST",
            body: JSON.stringify(transaction),
        })
        // return updatedNote
        // }, { optimisticData: updatedNote, revalidate: false })
    }

    const debouncedChangeTitle = useMemo(() => debounce(onSubmit, 500), [noteId, note])

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
                                    style={{ outline: "none", boxShadow: "none"}}
                                    {...field}
                                    onBlur={form.handleSubmit(debouncedChangeTitle)}
                                    className={className}
                                    defaultValue={note?.properties?.title}
                                >
                                </Input>
                            </FormControl>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    )
}