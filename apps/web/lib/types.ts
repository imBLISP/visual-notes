import { TLShapePartial } from "tldraw";
import { Content } from "@tiptap/core";

export interface Workspace {
    id: string;
    name: string;
    content: string[];
    logo: string;
}

export type BaseBlock = {
    id: string;
    parentId: string;
    content: string[];
}

export interface ShapeBlock extends BaseBlock {
    type: "tlshape";
    properties: TLShapePartial;
}

export interface PageBlock extends BaseBlock {
    type: "page";
    properties: {
        title?: string;
        editorContent: Content;
        previewBlockId: string;
    };
}

export interface TextBlock extends BaseBlock {
    type: "text";
    properties: {
        title?: string;
    };
}

export type Block = ShapeBlock | PageBlock | TextBlock

export interface BlockOperation {
    args: object;
    path: string[];
    command: "update" | "set" | "listAfter" | "listRemove" | "listBefore" | "delete";
    pointer: {
        id: string;
        table: string;
        workspaceId?: string;
    };
}

export interface BlockTransaction {
    operations: BlockOperation[];
}
