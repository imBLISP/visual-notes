"use client";

import { HoverCard, HoverCardTrigger, HoverCardContent, Button, Badge, TooltipButton, Popover, PopoverTrigger, PopoverContent } from "@repo/ui";
import useWorkspaceBlocks from "@/lib/swr/use-workspace-pages";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { cn } from "@repo/utils";
import { ChevronsUpDown, ChevronsDown, Plus, NotepadText, Ellipsis, Pencil, Trash } from "lucide-react";
import { Block, BlocksSchema } from "@/lib/zod"
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import createBlock from "@/lib/transactions/create-block";
import { toast } from "sonner";
import unaliveBlock from "@/lib/transactions/unalive-block";


function PageOptionsButton({ blockId, workspaceId }: { blockId: string, workspaceId: string }) {
  const { mutate: mutateWorkspaceBlocks } = useWorkspaceBlocks(workspaceId)

  const deletePage = async () => {
    const transaction = unaliveBlock(blockId, workspaceId)

    const res = await fetch(`/api/saveTransactions`, {
      method: "POST",
      body: JSON.stringify(transaction),
    })
    mutateWorkspaceBlocks()
    toast.success("Page deleted")
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <TooltipButton
          tooltip="Edit, delete and more"
          side="right"
          sideOffset={30}
          variant="ghost"
          className="hover:bg-neutral-200 h-5 w-5 p-0 flex items-center justify-center"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Ellipsis size={15} strokeWidth={2} />
        </TooltipButton>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className="flex items-center justify-start text-sm rounded-sm p-2 text-neutral-500 font-normal hover:bg-[#e8e8e6]"
            onClick={() => {
            }}
          >
            <div className="flex flex-row items-center gap-x-2">
              <Pencil size={12} />
              <div>
                Edit page
              </div>
            </div>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center justify-start text-sm rounded-sm p-2 text-neutral-500 font-normal hover:bg-[#e8e8e6]"
            onClick={() => {
              deletePage()
            }}
          >
            <div className="flex flex-row items-center gap-x-2">
              <Trash size={12} />
              <div>
                Delete page
              </div>
            </div>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}


function AddPageButton({ switchPage }: { switchPage: (pageId: string) => void }) {
  // call create page api add empty content with title as new page
  // mutate useworkspace blocks  
  // reroute to the new page 
  const { workspaceId } = useParams() as { workspaceId: string };
  const { mutate: mutateWorkspaceBlocks } = useWorkspaceBlocks(workspaceId)

  const createPage = async function () {
    const newPageId = uuidv4()

    const transaction = createBlock({
      id: newPageId,
      type: "canvas",
      properties: {
        title: "New page",
      },
      content: [],
      parentId: workspaceId,
      snapshot: [],
      active: true,
      created_at: new Date(),
    }, workspaceId)

    const res = await fetch(`/api/saveTransactions`, {
      method: "POST",
      body: JSON.stringify(transaction),
    })
    mutateWorkspaceBlocks()
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

function HeadingCard({ heading, switchPage }: { heading: string, switchPage: (pageId: string) => void }) {
  return (
    <Button
      variant="ghost"
      className="px-1 text-sm text-neutral-500 font-normal h-7 flex items-center justify-between hover:bg-neutral-100 group"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div>
        {heading}
      </div>
      <AddPageButton switchPage={switchPage} />
    </Button>
  )
}

function PageCard({ block, selected, workspaceId }: { block: Block, selected: { id: string }, workspaceId: string }) {
  return (
    <div
      className={cn(
        { "bg-neutral-100": selected.id == block.id },
        "p-1 text-neutral-500 flex flex-row gap-x-2 h-full w-full items-center justify-between"
      )}
    >
      <div className="flex flex-row gap-x-2 items-center">
        <NotepadText size={15} strokeWidth={2} />
        <div >
          {block.properties?.title}
        </div>
      </div>
      <div className="transition-all duration-200 opacity-0 group-hover:opacity-100">
        <PageOptionsButton blockId={block.id} workspaceId={workspaceId} />
      </div>
    </div>
  )
}

export default function PageSwitcher() {
  const { workspaceId } = useParams() as { workspaceId: string };
  const { pages } = useWorkspaceBlocks(workspaceId);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const canvasBlocks = useMemo(() => {
    return pages?.filter((block) => block.type == "canvas")
  }, [pages]) 

  const selected = useMemo(() => {
    const selectedPage = canvasBlocks?.find(
      (page) => page.id == searchParams.get("page")
    );
    if (workspaceId && canvasBlocks && selectedPage) {
      return {
        ...selectedPage,
        name: selectedPage.properties.title,
      };
    } else {
      return {
        id: "page_id",
        name: "new page",
        content: [],
      };
    }
  }, [workspaceId, canvasBlocks, searchParams]) as {
    id: string;
    name: string;
    content: string[];
  };

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const switchPage = (pageId: string) => {
    router.push(pathname + "?" + createQueryString("page", pageId))
    setOpen(false)
  }

  return (
    <>
      <HoverCard open={open} onOpenChange={setOpen} openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button onClick={(e) => setOpen(true)} variant="ghost" className="items-center h-8 flex-row gap-x-2">
            {/* <NotepadText size={15} strokeWidth={2} /> */}
            <div>
              {selected.name}
            </div>
            <div>
              {open ? <ChevronsDown size={15} /> : <ChevronsUpDown size={15} />}
            </div>
          </Button>
        </HoverCardTrigger>
        <HoverCardContent align={"start"} sideOffset={25} className="flex flex-col gap-y-2 w-72 min-h-96">
          <HeadingCard heading={"Favorites"} switchPage={switchPage} />
          {canvasBlocks?.map((block) => (
            <Button
              key={block.id}
              variant="ghost"
              onClick={() => {
                switchPage(block.id ?? "")
              }}
              className={cn(
                { "bg-neutral-100": selected.id == block.id },
                "px-1 text-sm text-neutral-500 font-normal h-7 flex items-center hover:bg-neutral-100 group"
              )}
            >
              <PageCard block={block} selected={selected} workspaceId={workspaceId} />
            </Button>
          ))}
          <HeadingCard heading={"All"} switchPage={switchPage} />
          {canvasBlocks?.map((block) => (
            <Button
              key={block.id}
              variant="ghost"
              onClick={() => {
                switchPage(block.id ?? "")
              }}
              className={cn(
                { "bg-neutral-100": selected.id == block.id },
                "px-1 text-sm text-neutral-500 font-normal h-7 flex items-center hover:bg-neutral-100 group"
              )}
            >
              <PageCard block={block} selected={selected} workspaceId={workspaceId} />
            </Button>
          ))}
        </HoverCardContent>
      </HoverCard>
    </>
  );
}
