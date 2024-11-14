"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  TooltipButton,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Sidebar as ShadSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  Avatar,
  ScrollArea
} from "@repo/ui";
import useWorkspaces from "@/lib/swr/use-workspaces";
import { useParams } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronsUpDown, ChevronsDown, Plus, GripVertical, Check } from "lucide-react";
import { ModalContext } from "@/ui/modals/provider";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { KeyedMutator } from "swr";
import { Workspace } from "@/lib/zod"
import unaliveWorkspace from "@/lib/transactions/unalive-workspace";
import { useRouter } from "next/navigation";
import { cn } from "@repo/utils";
import { cva } from "class-variance-authority";
import { CSS } from "@dnd-kit/utilities";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { coordinateGetter } from "@/ui/dndkit/workspace/multiple-containers-keyboard-preset";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import {
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  useSensor,
  useSensors,
  KeyboardSensor,
  Announcements,
  UniqueIdentifier,
  TouchSensor,
  MouseSensor,
} from "@dnd-kit/core";

// export default function WorkspaceSwitcher() {
//   const [switcherOpen, setSwitcherOpen] = useState(false);
//   const { setShowAddWorkspaceModal } = useContext(ModalContext);
//   const { workspaces, mutate: mutateWorkspaces } = useWorkspaces();
//   const {
//     workspaceId,
//     key,
//     domain,
//   } = useParams() as {
//     workspaceId?: string;
//     key?: string;
//     domain?: string;
//   };

//   const selected = useMemo(() => {
//     const selectedWorkspace = workspaces?.find(
//       (workspace) => workspace.id == workspaceId
//     );

//     if (workspaceId && workspaces && selectedWorkspace) {
//       return {
//         ...selectedWorkspace,
//       };
//     } else {
//       // return personal account selector if there's no workspace or error (user doesn't have access to workspace)
//       return {
//         id: "account_name_id",
//         name: "account_name_workspce",
//         logo: "https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&fontFamily=Helvetica&fontSize=40&seed=",
//         content: [],
//       };
//     }
//   }, [workspaceId, workspaces]) as {
//     id: string;
//     name: string;
//     logo: string;
//     content: string[];
//   };

//   return (
//     <>
//       <Popover onOpenChange={(open) => { setSwitcherOpen(open) }} open={switcherOpen}>
//         <PopoverTrigger asChild>
//           <Button variant="ghost" className="items-center h-8 pr-2">
//             <Image
//               referrerPolicy="no-referrer"
//               alt="logo of workspace"
//               src={selected.logo}
//               width={23}
//               height={23}
//               className="rounded-sm"
//             ></Image>
//             <div className="ml-3">{selected.name}</div>
//             {switcherOpen ? <ChevronsDown size={15} className="ml-3" /> : <ChevronsUpDown size={15} className="ml-3" />}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent
//           align={"start"}
//           sideOffset={25}
//           className="z-50 flex flex-col gap-y-2 w-72 pt-2 pb-0 px-0 shadow-xl rounded-lg"
//         >
//           <div className="flex justify-between items-center">
//             <div className="ml-3 text-sm text-neutral-500 font-normal">
//               Workspaces
//             </div>
//             <div className="mr-3 text-sm text-neutral-500 font-normal">
//               <WorkspaceSwitcherOptions setSwitcherOpen={setSwitcherOpen}/>
//             </div>
//           </div>
//           <WorkspaceList initialWorkspaces={workspaces || []} selectedWorkspace={selected} />
//           <div className="border-t flex justify-center bg-[#f7f7f5] pb-2">
//             <Button
//               variant="ghost"
//               className="mt-2 font-normal flex w-full items-center justify-start text-sm rounded-sm mx-1 p-2 text-neutral-500 font-normal hover:bg-[#e8e8e6]"
//               onClick={() => setShowAddWorkspaceModal(true)}
//             >
//               Add workspace
//             </Button>
//           </div>
//         </PopoverContent>
//       </Popover>
//     </>
//   );
// }

function WorkspaceOptions({ setSwitcherOpen }: { setSwitcherOpen?: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { workspaces, mutate: mutateWorkspaces } = useWorkspaces();
  const { setShowEditWorkspaceModal } = useContext(ModalContext);
  const router = useRouter();
  const { workspaceId } = useParams() as {
    workspaceId?: string;
  };


  const deleteWorkspace = () => {
    if (!workspaceId) {
      return;
    }

    const transaction = unaliveWorkspace(workspaceId)

    fetch(`/api/saveTransactions`, {
      method: "POST",
      body: JSON.stringify(transaction),
    }).then(
      function (data) {
        mutateWorkspaces();
        if (setSwitcherOpen)
          setSwitcherOpen(false);
        toast.success(`Workspace deleted`);
        const newWorkspaceId = workspaces?.find((workspace) => workspace.id != workspaceId)?.id;
        router.push(`/${newWorkspaceId}`);

        // route to a different workspace id
      }
    ).catch((error) => {
      console.error("Error deleting workspace", error);
      toast.error("Error deleting workspace");
    });
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="m-0 p-0 flex justify-center items-center">
          <Ellipsis size={20} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 p-1">
        <div className="flex flex-col">
          <Button
            variant="ghost"
            className="flex items-center justify-start text-sm rounded-sm p-2 text-neutral-500 font-normal hover:bg-[#e8e8e6]"
            onClick={() => setShowEditWorkspaceModal(true)}
          >
            <div className="flex flex-row items-center gap-x-2">
              <Pencil size={15} />
              <div>
                Edit workspace
              </div>
            </div>
          </Button>
          <div className="flex flex-row">
            <Button
              variant="ghost"
              className="flex items-center justify-start text-sm rounded-sm p-2 text-neutral-500 font-normal hover:bg-[#e8e8e6]"
              onClick={deleteWorkspace}
            >
              <div className="flex flex-row items-center gap-x-2">
                <Trash size={15} />
                <div>
                  Delete workspace
                </div>
              </div>
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

interface WorkspaceCardProps {
  workspace: Workspace;
  isOverlay?: boolean;
  isAnythingDragging?: boolean;
  isSelected?: boolean;
}

export function WorkspaceCard({
  workspace,
  isOverlay,
  isAnythingDragging = false,
  isSelected = false
}: WorkspaceCardProps) {
  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: workspace.id,
    data: {
      task: workspace,
    },
  });

  const router = useRouter();

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  const variants = cva("", {
    variants: {
      dragging: {
        over: "",
        overlay: "",
        normal: "hover:bg-secondary-foreground/5",
      },
    },
  });

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={variants({
        dragging: isOverlay
          ? "overlay"
          : isDragging || isAnythingDragging
            ? "over"
            : "normal",
      })}
    >
      <div
        {...attributes}
        {...listeners}
        className=" text-secondary-foreground/50  h-auto cursor-grab w-full group"
      >
        <Button
          // href={`/${workspace.id}`}
          variant="ghost"
          className={cn(
            "h-8 hover:bg-transparent hover:text-secondary-foreground/50 hover:text gap-2 flex flex-row items-center justify-between px-2 w-full rounded-none"
          )}
          onClick={(e) => router.push(`/${workspace.id}`)}
        >
          <div className="flex flex-row items-center gap-2">
            <span className="sr-only">Move task</span>
            {/* <GripVertical size={15} /> */}
            <Avatar className="h-[20px] w-[20px] rounded-sm">
              <Image
                referrerPolicy="no-referrer"
                alt="logo of workspace"
                src={workspace.logo}
                width={20}
                height={20}
                className="object-cover"
              // className="rounded-sm "
              ></Image>
            </Avatar>
            <div className="ml-1 flex flex-col items-start justify-center">
              <div className="text-medium font-normal">{workspace.name}</div>
              {/* <div className="text-xs font-normal">Free plan . 1 member</div> */}
            </div>
          </div>
          {isSelected? <Check size={15}/>: <GripVertical className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 ease-in" size={15}/>}
        </Button>
      </div>
    </div>
  );
}

interface WorkspaceListProps {
  initialWorkspaces: Workspace[];
  selectedWorkspace: Workspace;
}

function WorkspaceList({
  initialWorkspaces,
  selectedWorkspace
}: WorkspaceListProps
) {
  const [workspaces, setWorkspaces] = useState<Workspace[]>(initialWorkspaces);
  const [isAnyDragging, setIsAnyDragging] = useState(false);
  const workspaceIds = useMemo(() => {
    return workspaces.map((task) => task.id);
  }, [workspaces]);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10
      }
    }),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: coordinateGetter,
    })
  );

  return (
    <DndContext
      accessibility={
        {
          // announcements,
        }
      }
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      modifiers={[restrictToVerticalAxis, restrictToParentElement]}
    >
      <ScrollArea>
        <SortableContext items={workspaceIds}>
          {workspaces.map((workspace) => (
            <WorkspaceCard key={workspace.id} workspace={workspace} isAnythingDragging={isAnyDragging} isSelected={workspace.id == selectedWorkspace.id} />
          ))}
        </SortableContext>
      </ScrollArea>
    </DndContext>
  );

  function onDragStart(event: DragStartEvent) {
    setIsAnyDragging(true);
  }

  function onDragEnd(event: DragEndEvent) {
    setIsAnyDragging(false);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    // if (!hasDraggableData(active) || !hasDraggableData(over)) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    // // const isActiveATask = activeData?.type === "Task";
    // // const isOverATask = overData?.type === "Task";

    // if (!isActiveATask) return;

    // if (isActiveATask && isOverATask) {
    // print active and over ids
    setWorkspaces((tasks) => {
      const activeIndex = tasks.findIndex((t) => t.id === activeId);
      const overIndex = tasks.findIndex((t) => t.id === overId);
      // const activeTask = tasks[activeIndex];
      // const overTask = tasks[overIndex];
      return arrayMove(tasks, activeIndex, overIndex);
    });
    // }
  }

  function onDragOver(event: DragOverEvent) { }
}

export function WorkspaceSwitcher() {
  const { setShowAddWorkspaceModal } = useContext(ModalContext);
  const { workspaces, mutate: mutateWorkspaces, loading } = useWorkspaces();
  const {
    workspaceId,
    key,
    domain,
  } = useParams() as {
    workspaceId?: string;
    key?: string;
    domain?: string;
  };

  const selected = useMemo(() => {
    const selectedWorkspace = workspaces?.find(
      (workspace) => workspace.id == workspaceId
    );

    if (workspaceId && workspaces && selectedWorkspace) {
      return {
        ...selectedWorkspace,
      };
    } else {
      // return personal account selector if there's no workspace or error (user doesn't have access to workspace)
      return {
        id: "account_name_id",
        name: "account_name_workspce",
        logo: "https://api.dicebear.com/7.x/initials/svg?backgroundType=gradientLinear&fontFamily=Helvetica&fontSize=40&seed=",
        content: [],
      };
    }
  }, [workspaceId, workspaces]) as {
    id: string;
    name: string;
    logo: string;
    content: string[];
  };

  if (loading || !workspaces) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:ml-1"
        >
          <div className="">
            <Image
              referrerPolicy="no-referrer"
              alt="logo of workspace"
              src={selected.logo}
              width={30}
              height={30}
              className="rounded-sm"
            ></Image>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              {selected.name}
            </span>
            <span className="truncate text-xs">
              {"Free"}
            </span>
          </div>
          <ChevronsUpDown className="ml-auto group-data-[collapsible=icon]:hidden" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-72 rounded-lg"
        align="start"
        side="bottom"
        sideOffset={4}
      >
        <DropdownMenuLabel className="text-xs text-muted-foreground">
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Image
                referrerPolicy="no-referrer"
                alt="logo of workspace"
                src={selected.logo}
                width={42}
                height={42}
                className="rounded-sm"
              ></Image>
              <div className="flex flex-col">
                <span className="font-semibold">
                  {selected.name}
                </span>
                <span>
                  Free
                </span>
              </div>
            </div>
            <WorkspaceOptions />
          </div>
          {/* Workspaces */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <WorkspaceList
          initialWorkspaces={workspaces}
          selectedWorkspace={selected}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-md border bg-background">
            <Plus className="size-4" />
          </div>
          <div className="font-medium text-muted-foreground" onClick={() => setShowAddWorkspaceModal(true)}>
            Add Workspace
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
