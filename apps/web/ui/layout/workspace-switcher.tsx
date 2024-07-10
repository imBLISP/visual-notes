"use client"

import {blocksTable, workspacesTable} from "@/lib/schema";
import { Popover, PopoverTrigger, PopoverContent, Button, Label, Input} from "@repo/ui"
import {cn} from "@repo/utils"
import useWorkspaces from "@/lib/swr/use-workspaces"

export default function WorkspaceSwitcher() {
  const { workspaces } = useWorkspaces();
  console.log(JSON.stringify(workspaces))

  return (
    <>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Workspaces</Button>
      </PopoverTrigger>
      <PopoverContent className="w-40 flex flex-col gap-3">
        {
          workspaces?.map((workspace) => (
            <Button variant="ghost" key={workspace.id} className="flex flex-row items-left gap-x-4">
              <div className="h-6 w-6 rounded-full bg-neutral-100">
              </div>
              <div>
                {workspace.name}
              </div>
            </Button>
          ))
        }
      </PopoverContent>
    </Popover>
    </>
  );
}
