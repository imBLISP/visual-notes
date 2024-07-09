"use client"

import {blocksTable, workspacesTable} from "@/lib/schema";
import { Popover, PopoverTrigger, PopoverContent} from "@repo/ui"
import {cn} from "@repo/utils"
import useWorkspaces from "@/lib/swr/use-workspaces"

export async function getWorkspaces(): Promise<
  Array<{
    id: string;
    name: string;
  }>
> {
  return db.select().from(workspacesTable);
}

export default function WorkspaceSwitcher() {
  const { workspaces } = useWorkspaces();
  console.log(workspaces)

  return (
    <>
    <Popover>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>Place content for the popover here.</PopoverContent>
    </Popover>
    </>
  );
}
