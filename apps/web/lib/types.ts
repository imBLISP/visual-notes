export interface WorkspaceProps {
    id: string;
    name: string;
    content: string[];
    slug: string;
    logo: string;
}

export interface PagePropertiesProps {
    title: string;
}

export interface PagesProps {
    id: string;
    type: string;
    properties: PagePropertiesProps;
    content: string[];
    parent: string;
}