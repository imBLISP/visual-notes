"use client";

import type { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, CardHeader } from "@repo/ui";
import { Button } from "@repo/ui";
import { cva } from "class-variance-authority";
import { GripVertical, Check } from "lucide-react";
import { Badge } from "@repo/ui";
import { Workspace } from "@/lib/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@repo/utils";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@repo/ui";
interface WorkspaceProps {
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
}: WorkspaceProps) {
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
        className=" text-secondary-foreground/50  h-auto cursor-grab w-full"
      >
        <Button
          // href={`/${workspace.id}`}
          variant="ghost"
          className={cn(
            "h-12 hover:bg-transparent hover:text-secondary-foreground/50 hover:text gap-2 flex flex-row items-center justify-between px-3 w-full rounded-none"
          )}
          onClick={(e) => router.push(`/${workspace.id}`)}
        >
          <div className="flex flex-row items-center gap-2">
            <span className="sr-only">Move task</span>
            <GripVertical size={15} />
            <Avatar className="h-[35px] w-[35px] rounded-sm">
              <Image
                referrerPolicy="no-referrer"
                alt="logo of workspace"
                src={workspace.logo}
                width={35}
                height={35}
                className="object-cover"
                // className="rounded-sm "
              ></Image>
            </Avatar>
            <div className="ml-1 flex flex-col items-start justify-center">
              <div className="text-base font-normal">{workspace.name}</div>
              <div className="text-xs font-normal">Free plan . 1 member</div>
            </div>
          </div>
          {isSelected && <Check size={15} />}
        </Button>
      </div>
    </div>
  );
}
