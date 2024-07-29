"use client";

import { Popover, PopoverTrigger, PopoverContent, Button } from "@repo/ui";
import useWorkspaces from "@/lib/swr/use-workspaces";
import { useParams } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronsUpDown, ChevronsDown } from "lucide-react";
import { WorkspaceList } from "../dndkit/workspace/workspace-list-dnd";
import { ModalContext } from "@/ui/modals/provider";

export default function WorkspaceSwitcher() {
  const [switcherOpen, setSwitcherOpen] = useState(false);
  const {setShowAddWorkspaceModal} = useContext(ModalContext);
  const { workspaces } = useWorkspaces();
  const {
    workspace: workspaceId,
    key,
    domain,
  } = useParams() as {
    workspace?: string;
    key?: string;
    domain?: string;
  };

  const selected = useMemo(() => {
    const selectedWorkspace = workspaces?.find(
      (workspace) => workspace.id == workspaceId
    );
    console.log("workspaceId", workspaceId);

    if (workspaceId && workspaces && selectedWorkspace) {
      return {
        ...selectedWorkspace,
      };

      // return personal account selector if there's no workspace or error (user doesn't have access to workspace)
    } else {
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
      <Popover onOpenChange={(open) => {setSwitcherOpen(open)}}>
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
            {/* <Badge variant="outline" className="ml-3">Free</Badge> */}
            {switcherOpen ? <ChevronsDown size={15} className="ml-3" /> : <ChevronsUpDown size={15} className="ml-3" />}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align={"start"}
          sideOffset={25}
          className="flex flex-col gap-y-2 w-72 pt-2 pb-0 px-0 shadow-xl rounded-lg"
        >
          <div className="flex justify-between">
            <div className="ml-3 text-sm text-neutral-500 font-normal">
              Workspaces
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
