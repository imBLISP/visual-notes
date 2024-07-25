import {TLRecord, TLShapePartial} from "@tldraw/tldraw"

export interface Workspace {
    id: string;
    name: string;
    content: string[];
    slug: string;
    logo: string;
}

export interface PageProperties {
    title?: string;
}

// export type BlockProps =
// {

// }

// export interface BlockProps {
//     id: string, 
//     type: string,
//     properties: {
//         ...PagePropertiesProps,
//         canvasShape: TLShapePartial
//     },
//     parentId: string
// }

export type Block = 
    | { id: string; type: 'tlshape'; properties: TLShapePartial; parentId: string; }
    | { id: string; type: 'page'; properties: PageProperties; parentId: string; };

export interface Pages {
    id: string;
    type: string;
    properties: PageProperties;
    content: string[];
    parent: string;
}

export interface BlockOperation {
  args: object;
  path: string[];
  command: "update" | "set" | "listAfter" | "listRemove" | "listBefore";
  pointer: {
    id: string;
    table: string;
    workspaceId?: string;
  }
}

export interface BlockTransaction {
    operations: BlockOperation[];
}