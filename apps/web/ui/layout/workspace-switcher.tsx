"use client";

import { Popover, PopoverTrigger, PopoverContent, Button, TooltipButton } from "@repo/ui";
import useWorkspaces from "@/lib/swr/use-workspaces";
import { useParams } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronsUpDown, ChevronsDown } from "lucide-react";
import { WorkspaceList } from "../dndkit/workspace/workspace-list-dnd";
import { ModalContext } from "@/ui/modals/provider";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { toast } from "sonner";
import { KeyedMutator } from "swr";
import { Workspace } from "@/lib/zod"
import unaliveWorkspace from "@/lib/transactions/unalive-workspace";
import { useRouter } from "next/navigation";


function WorkspaceSwitcherOptions({ setSwitcherOpen }: { setSwitcherOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
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
                <Pencil size={15}/>
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
                <Trash size={15}/>
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

export default function WorkspaceSwitcher() {
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const { setShowAddWorkspaceModal } = useContext(ModalContext);
  const { workspaces, mutate: mutateWorkspaces } = useWorkspaces();
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

  return (
    <>
      <Popover onOpenChange={(open) => { setSwitcherOpen(open) }} open={switcherOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="items-center h-8 pr-2">
            <Image
              referrerPolicy="no-referrer"
              alt="logo of workspace"
              src={selected.logo + selected.name}
              width={20}
              height={20}
              className="rounded-sm"
            ></Image>
            <div className="ml-3">{selected.name}</div>
            {switcherOpen ? <ChevronsDown size={15} className="ml-3" /> : <ChevronsUpDown size={15} className="ml-3" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          sideOffset={25}
          className="z-50 flex flex-col gap-y-2 w-72 pt-2 pb-0 px-0 shadow-xl rounded-lg"
        >
          <div className="flex justify-between items-center">
            <div className="ml-3 text-sm text-neutral-500 font-normal">
              Workspaces
            </div>
            <div className="mr-3 text-sm text-neutral-500 font-normal">
              <WorkspaceSwitcherOptions setSwitcherOpen={setSwitcherOpen}/>
            </div>
          </div>
          <WorkspaceList initialWorkspaces={workspaces || []} selectedWorkspace={selected} />
          <div className="border-t flex justify-center bg-[#f7f7f5] pb-2">
            <Button
              variant="ghost"
              className="mt-2 font-normal flex w-full items-center justify-start text-sm rounded-sm mx-1 p-2 text-neutral-500 font-normal hover:bg-[#e8e8e6]"
              onClick={() => setShowAddWorkspaceModal(true)}
            >
              Add workspace
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
