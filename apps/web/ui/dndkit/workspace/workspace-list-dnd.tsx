import { useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { BoardColumn, BoardContainer } from "./workspace-sortable-dnd";
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
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { WorkspaceCard} from "./workspace-dnd";
import type { Column } from "./workspace-sortable-dnd";
import { hasDraggableData } from "../utils";
import { coordinateGetter } from "./multiple-containers-keyboard-preset";
import {
  restrictToVerticalAxis,
  restrictToWindowEdges,
  restrictToParentElement,
} from "@dnd-kit/modifiers";
import { ScrollArea } from "@repo/ui";
import { Workspace } from "@/lib/types";

export function WorkspaceList({
  initialWorkspaces,
  selectedWorkspace
}: {
  initialWorkspaces: Workspace[];
  selectedWorkspace: Workspace;
}) {
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

  function onDragOver(event: DragOverEvent) {}
}
