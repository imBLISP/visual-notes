"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Label,
  Input,
} from "@repo/ui";
import { cn } from "@repo/utils";
import useWorkspaces from "@/lib/swr/use-workspaces";
import { useParams, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

export default function WorkspaceSwitcher() {
  const { workspaces } = useWorkspaces();
  const pathname = usePathname();
  const { slug, key, domain } = useParams() as {
    slug?: string;
    key?: string;
    domain?: string;
  };

  const selected = useMemo(() => {
    const selectedWorkspace = workspaces?.find(
      (workspace) => workspace.id == slug
    );
    if (slug && workspaces && selectedWorkspace) {
      return {
        ...selectedWorkspace,
      };

      // return personal account selector if there's no workspace or error (user doesn't have access to workspace)
    } else {
      return {
        id: "account_name_id",
        name: "account_name_workspce",
        content: [],
      };
    }
  }, [slug, workspaces]) as {
    id: string;
    name: string;
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
          <Button variant="outline">{selected.name}</Button>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col gap-y-4 w-40">
          {workspaces?.map(({ id, name, logo }) => (
            <Link key={id}  href={href(id)} className="flex flex-row gap-2 hover:bg-slate-100">
              <Image referrerPolicy="no-referrer" alt="logo of workspace" src={logo + name} width={20} height={20} className="rounded-full"></Image>
            <div className={cn({"bg-neutral-100": selected.id == id}, "p-1 rounded-md")}>
              {name}
            </div>
            </Link>
        ))}
        </PopoverContent>
      </Popover>
    </>
  );
}
