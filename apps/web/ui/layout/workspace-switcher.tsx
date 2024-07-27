"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Label,
  Input,
  Badge,
} from "@repo/ui";
import { cn } from "@repo/utils";
import useWorkspaces from "@/lib/swr/use-workspaces";
import { useParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {ChevronsUpDown} from "lucide-react"
import {Sortable} from "@/ui/dndkit/sortable";
import {restrictToVerticalAxis, restrictToParentElement} from "@dnd-kit/modifiers";

export default function WorkspaceSwitcher() {
  const { workspaces } = useWorkspaces();
  const pathname = usePathname();
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

  const href = useCallback(
    (id: string) => {
      if (domain || key || selected.id === "account_name_id") {
        // if we're on a link page, navigate back to the workspace root
        return `/${id}`;
      } else {
        // else, we keep the path but remove all query params
        return pathname?.replace(selected.id, id).split("?")[0] || "/";
      }
    },
    [domain, key, pathname, selected.id]
  );

  return (
    <>
      <Popover>
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
            <ChevronsUpDown size={15} className="ml-3"/>
          </Button>
        </PopoverTrigger>
        <PopoverContent align={"start"} className="flex flex-col gap-y-4 w-72">
  {/* <div
    style={{
      height: '50vh',
      width: 350,
      margin: '200px auto 0',
      overflow: 'auto',
    }}
  > */}
          <Sortable items={["abc", "def", 'hgh']} modifiers={[restrictToVerticalAxis, restrictToParentElement]} removable handle></Sortable>
  {/* </div> */}
          {/* {workspaces?.map(({ id, name, logo }) => (
            <Link
              key={id}
              href={href(id)}
              className="flex flex-row gap-2 hover:bg-slate-100"
            >
              <Image
                referrerPolicy="no-referrer"
                alt="logo of workspace"
                src={logo + name}
                width={20}
                height={20}
                className="rounded-full"
              ></Image>
              <div
                className={cn(
                  { "bg-neutral-100": selected.id == id },
                  "p-1 rounded-md"
                )}
              >
                {name}
              </div>
            </Link>
          ))} */}
        </PopoverContent>
      </Popover>
    </>
  );
}
