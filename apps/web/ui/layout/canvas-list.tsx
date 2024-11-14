import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    DropdownMenu,
    DropdownMenuTrigger,
    SidebarMenuAction,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@repo/ui"

import {
    MoreHorizontal,
    Folder,
    Forward,
    ChevronRight,
    FileText,
    Frame,
    Star,
    Link
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { usePathname } from "next/navigation"
import { useCallback } from "react"
import { useContext } from "react"

import useNestedBlocks from "@/lib/swr/use-nested-blocks"
import { useParams } from "next/navigation"
import { InfrontOfCanvasContext } from "@/ui/canvas/layout/infront-of-canvas"
// import { useWorkspaceBlocks } from "@/lib/swr/use-workspace-blocks"
import { toast } from "sonner"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { TooltipButton } from "@repo/ui"
import { v4 as uuidv4 } from 'uuid';
import createBlock from "@/lib/transactions/create-block"
import { useEffect } from "react"
import deepUpdateBlock from "@/lib/transactions/deep-update-block"
import deleteBlock from "@/lib/transactions/operations/delete"
import { Block } from "@/lib/zod/schemas/blocks"
import unaliveBlock from "@/lib/transactions/unalive-block"

function CanvasListNote({ note }: { note: any }) {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()
    const { setShowNoteModal } = useContext(InfrontOfCanvasContext)

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const showNote = (noteId: string) => {
        if (!noteId) return;

        router.push(pathname + "?" + createQueryString("note", noteId))
        setShowNoteModal(true)
    }

    return (
        <SidebarMenuSub className="border-none mx-1">
            <SidebarMenuSubItem key={note.properties.title}>
                {/* <CollapsibleTrigger asChild> */}
                <SidebarMenuButton onClick={() => {
                    showNote(note.id)
                }}>
                    {/* <a href={note.url}> */}
                    <div className="flex gap-2 items-center text-sidebar-foreground">
                        <FileText className="w-4 h-4 !text-gray-600" />
                        <span>{(note.properties.title || "Untitled").slice(0, 20)}{(note.properties.title || "Untitled").length > 20 ? "..." : ""}</span>
                    </div>
                    {/* </a> */}
                </SidebarMenuButton>
                {/* </CollapsibleTrigger> */}
                {/* <CollapsibleContent> */}
                {note.content.map((subItem: any) => (
                    <div key={subItem.id}>
                        <CanvasListNote note={subItem} />
                    </div>
                ))}
                {/* </CollapsibleContent> */}
            </SidebarMenuSubItem>
        </SidebarMenuSub>
    );
}

interface CanvasListProps {
    type: "Favourites" | "Private";
}

export function CanvasList({ type }: CanvasListProps) {
    const {
        workspaceId,
        key,
        domain,
    } = useParams() as {
        workspaceId: string;
        key?: string;
        domain?: string;
    };
    let { nestedBlocks } = useNestedBlocks(workspaceId)
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    // filter nested blocks if properties.favourite is true only for Favourites type
    if (type === "Favourites") {
      nestedBlocks = nestedBlocks?.filter((item: any) => item.properties.favourite);
    }

    const createQueryString = useCallback(
        (name: string, value: string) => {
            // const params = new URLSearchParams(searchParams.toString());
            const params = new URLSearchParams();
            params.set(name, value);

            return params.toString();
        },
        [searchParams]
    );

    const switchPage = (pageId: string) => {
        router.push(pathname + "?" + createQueryString("page", pageId))
    }

    console.log("nestedBlocksUpdated", nestedBlocks)

    if (nestedBlocks?.length === 0 && type === "Favourites") return null;

    return (
        // <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroup>
            <SidebarGroupLabel>
                <div className="w-full flex gap-2 justify-between">
                    <div>{type}</div>
                    <AddPageButton switchPage={switchPage} type={type} />
                </div>
            </SidebarGroupLabel>
            <SidebarMenu>
                {nestedBlocks?.map((item, index) => (
                    <Collapsible
                        key={item.id + type}
                        asChild
                        defaultOpen={false}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            {/* <div className="flex gap-2 items-center"> */}
                            <SidebarMenuButton tooltip={item.properties.title} className=" icon-swap" onClick={() => {
                                switchPage(item.id)
                            }}>
                                <div className="w-full h-full flex items-center justify-between">
                                    <div className="flex gap-2 items-center w-full">
                                        <div className="w-full h-full hidden group-data-[collapsible=icon]:block">
                                            {item.properties.icon ? (
                                                <div className="w-5 h-5 text-gray-600 flex items-center justify-center text-lg">{item.properties.icon}</div>
                                            ) : (
                                                <Frame className="w-4 h-4 text-gray-600" />
                                            )}
                                            {/* <Frame className="w-4 h-4 p-0 text-gray-600 transition-transform duration-200" /> */}
                                        </div>
                                        <CollapsibleTrigger onClick={(e) => { e.stopPropagation() }}>
                                            {/* <Frame className="w-4 h-4 text-gray-600 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 hidden group-data-[collapsible=icon]:block" /> */}
                                            <div className="relative w-4 h-4 group-data-[collapsible=icon]:hidden">
                                                <div className="absolute inset-0 transition-all duration-100 ease-in-out opacity-100 [.icon-swap:hover_&]:opacity-0 ">
                                                    {item.properties.icon ? (
                                                        <div className="w-4 h-4 text-gray-600 flex items-center justify-center text-lg">{item.properties.icon}</div>
                                                    ) : (
                                                        <Frame className="w-4 h-4 text-gray-600" />
                                                    )}
                                                    {/* <Frame className="w-4 h-4 text-gray-600 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                                                </div>
                                                <div className="absolute inset-0 transition-all duration-100 ease-in-out opacity-0 [.icon-swap:hover_&]:opacity-100 ">
                                                    <ChevronRight className="w-4 h-4 ml-auto text-gray-600 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                                                </div>
                                            </div>
                                        </CollapsibleTrigger>
                                        <span className="group-data-[collapsible=icon]:hidden">{item.properties.title}</span>
                                    </div>
                                </div>
                                <div className="opacity-0 [.icon-swap:hover_&]:opacity-100 transition-opacity duration-200">
                                    <CanvasListMore item={item} workspaceId={workspaceId} />
                                </div>
                            </SidebarMenuButton>
                            {/* </div> */}
                            <CollapsibleContent>
                                {item.content.map((subItem, index) => (
                                    <div>
                                        <CanvasListNote note={subItem} />
                                    </div>
                                ))}
                            </CollapsibleContent>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function CanvasListMore({ item, workspaceId }: { item: any, workspaceId: string }) {

    const {mutate: mutateNestedBlocks, nestedBlocks} = useNestedBlocks(workspaceId)

    const handleAddToFavourites = async (itemId: string) => {
        if (item.properties.favourite) return;

        // nested block already has the item with item.id we just have to update the properties of that item not create a new one
        const updatedNestedBlocks = nestedBlocks.map((block: Block) => {
            if (block.id === itemId) {
                return { ...block, properties: { ...block.properties, favourite: true } }
            }
            return block
        })

        const transaction = deepUpdateBlock({ favourite: true }, itemId, ["properties"])
        mutateNestedBlocks(updatedNestedBlocks, { revalidate: false })
        const res = await fetch(`/api/saveTransactions`, {
            method: "POST",
            body: JSON.stringify(transaction),
        })
    }

    const handleDelete = async (itemId: string) => {
        const transaction = unaliveBlock(itemId, workspaceId)

        const updatedNestedBlocks = nestedBlocks.filter((block: Block) => block.id !== itemId)
        mutateNestedBlocks(updatedNestedBlocks, { revalidate: false })
        const res = await fetch(`/api/saveTransactions`, {
            method: "POST",
            body: JSON.stringify(transaction),
        })
        toast.success("Page deleted")
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div>
                    <MoreHorizontal size={15} strokeWidth={2} />
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleAddToFavourites(item.id);
                    // Handle delete
                }}>
                    <Star className="w-4 h-4 mr-2" />
                    Add to favourites
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    // Handle delete
                }}>
                    <Link className="w-4 h-4 mr-2" />
                    Copy link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    // Handle rename
                }}>
                    <Pencil className="w-4 h-4 mr-2" />
                    Rename
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                    // Handle delete
                }}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function AddPageButton({ switchPage, type }: { switchPage: (pageId: string) => void, type: "Favourites" | "Private" }) {
    // call create page api add empty content with title as new page
    // mutate useworkspace blocks  
    // reroute to the new page 
    const { workspaceId } = useParams() as { workspaceId: string };
    const { nestedBlocks, mutate: mutateNestedBlocks } = useNestedBlocks(workspaceId)
    //   const { mutate: mutateWorkspaceBlocks } = useWorkspaceBlocks(workspaceId)

    const createPage = async function () {
        const newPageId = uuidv4()
        const newCanvas = {
            id: newPageId,
            type: "canvas",
            properties: {
                title: "New page",
                favourite: type === "Favourites",
            },
            content: [],
            parentId: workspaceId,
            snapshot: [],
            active: true,
            created_at: new Date(),
        }

        const transaction = createBlock(newCanvas, workspaceId)

        mutateNestedBlocks([...nestedBlocks, newCanvas], { revalidate: false })

        const res = await fetch(`/api/saveTransactions`, {
            method: "POST",
            body: JSON.stringify(transaction),
        })
        // mutateWorkspaceBlocks()
        toast.success("Page created")
        switchPage(newPageId)
    };

    return (
        <TooltipButton
            tooltip="Add page"
            side="right"
            sideOffset={30}
            variant="ghost"
            className="hover:bg-neutral-200 text-neutral-500 h-5 w-5 p-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            onClick={(e) => {
                e.stopPropagation();
                createPage()
            }}
        >
            <Plus size={15} strokeWidth={2} />
        </TooltipButton>
    )
}