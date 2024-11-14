import z from "@/lib/zod"
import { TLEditorSnapshot } from "tldraw"

export const BlockPropertiesSchema = z.object({
    text: z.string().optional().describe("The text content of the block."),
    title: z.string().optional().describe("The title of the block."),
    icon: z.string().optional().describe("The icon of the block."),
    x: z.number().optional().describe("The x coordinate of the block."),
    y: z.number().optional().describe("The y coordinate of the block."),
    favourite: z.boolean().optional().describe("Whether the block is a favourite.").default(false),
    meta: z.object({
        id: z.string().uuid()
    }).optional().describe("The meta data of the block."),
    type: z.string().optional().describe("The type of the block."),
    index: z.string().optional().describe("The index of the block."),
    props: z.object({
        h: z.number().optional().describe("The height of the block."),
        w: z.number().optional().describe("The width of the block."),
        text: z.string().optional().describe("The text content of the block."),
    }).optional().describe("The props of the block."),
    opacity: z.number().optional().describe("The opacity of the block."),
    isLocked: z.boolean().optional().describe("Whether the block is locked."),
    parentId: z.string().optional().describe("The ID of the parent block."),
    rotation: z.number().optional().describe("The rotation of the block."),
    typeName: z.string().optional().describe("The type name of the block."),
    editorContent: z.any().optional().describe("The editor content of the block."),
    notePreviewMapping: z.array(z.object({
        shapeId: z.string().uuid(),
        noteBlockId: z.string().uuid()
    })).optional().describe("The note preview mapping of the block."),
})

export const BlocksSchema = z.object({
    id: z.string().uuid().optional().describe("The unique ID of the block.").default(""),
    type: z.string().optional().describe("The type of the block.").default(""),
    properties: BlockPropertiesSchema.optional().describe("The properties of the block.").default({}),
    parentId: z.string().uuid().optional().describe("The ID of the parent block.").default(""),
    content: z.array(z.string().uuid()).optional().describe("The content of the block.").default([]),
    snapshot: z.union([
      z.custom<TLEditorSnapshot>(),
      z.any() // For Tiptap editor snapshot
    ]).optional().describe("Snapshot of the block (TLEditorSnapshot or Tiptap editor snapshot)"),
    active: z.boolean().optional().describe("Whether the block is active.").default(true),
    created_at: z.date().optional().describe("The creation date of the block.").default(new Date()),
})


export type Block = z.infer<typeof BlocksSchema>;
export type BlockProperties = z.infer<typeof BlockPropertiesSchema>;