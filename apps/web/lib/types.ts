import {TLShapePartial} from "@tldraw/tldraw"

export interface WorkspaceProps {
    id: string;
    name: string;
    content: string[];
    slug: string;
    logo: string;
}

export interface PagePropertiesProps {
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

export type BlockProps = 
    | { id: string; type: 'tlshape'; properties: TLShapePartial; parentId: string; }
    | { id: string; type: 'page'; properties: PagePropertiesProps; parentId: string; };

export interface PagesProps {
    id: string;
    type: string;
    properties: PagePropertiesProps;
    content: string[];
    parent: string;
}