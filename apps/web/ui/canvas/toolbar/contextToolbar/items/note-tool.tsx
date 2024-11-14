"use client"

import { Note } from "@/ui/icons/canvas"
import { Button, HoverCard, HoverCardTrigger, HoverCardContent } from "@repo/ui"
import { ModalContext } from "@/ui/modals/provider";
import { useContext, useEffect, useState } from "react";
import { DefaultSizeStyle, track, useEditor } from "tldraw";
import createBlock from "@/lib/transactions/create-block";
import { v4 as uuidv4 } from "uuid";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import { InfrontOfCanvasContext } from "@/ui/canvas/layout/infront-of-canvas";

export function NoteTool() {
  const editor = useEditor();

  const selectedShapes = editor.getSelectedShapes();
  const { workspaceId } = useParams() as { workspaceId: string };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const pageId = searchParams.get("page")
  const { setShowNoteModal } = useContext(InfrontOfCanvasContext)
  const [hasNote, setHasNote] = useState(false);
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    if (selectedShapes.length == 1) {
      const shape = editor.getShape(selectedShapes[0].id);
      if (shape && shape.meta.noteId) {
        setHasNote(true);
      }
      else {
        setHasNote(false);
      }
    }
  }, [selectedShapes, editor])

  function openExistingNotes() {
    params.set("shape", selectedShapes[0].id);
    router.replace(`${pathname}?${params.toString()}`);
    setShowNoteModal(true);
  }

  function openExistingNote() {
    console.log("OPENING EXISTING NOTE");
    const noteId = selectedShapes[0].meta?.noteId
    if (!noteId) return;
    console.log("NOTE ID", noteId);

    params.set("note", noteId.toString());
    params.set("shape", selectedShapes[0].id);
    console.log("PARAMS", params.toString());
    router.push(`${pathname}?${params.toString()}`);

    // editor.resetZoom()
    const bounds = editor.getShapePageBounds(selectedShapes[0])
    const pageBounds = editor.getViewportPageBounds()
    if (!bounds) return;
    // editor.centerOnPoint({ x: bounds.center.x + pageBounds.w / 4.5, y: bounds.center.y + pageBounds.h / 15 }, { animation: { duration: 200 } })
    // setShowNoteModal(true);
  }

  async function createNewNote() {
    if (!pageId) return;

    const noteNoteId = uuidv4()
    const shapeId = selectedShapes[0].id

    const transaction = createBlock({
      id: noteNoteId,
      type: "note",
      properties: {
        title: "Untitled"
      },
      content: [],
      parentId: pageId,
      snapshot: [],
      active: true,
      created_at: new Date(),
    }, workspaceId)

    const res = await fetch(`/api/saveTransactions`, {
      method: "POST",
      body: JSON.stringify(transaction),
    })

    editor.updateShapes([{
      id: shapeId,
      type: "shape",
      meta: {
        ...selectedShapes[0].meta,
        noteId: noteNoteId
      }
    }])

    // set the note search param to note id 
    const noteId = selectedShapes[0].meta?.noteId
    if (!noteId) return;

    params.set("note", noteId.toString());
    params.set("shape", selectedShapes[0].id);
    router.replace(`${pathname}?${params.toString()}`);

    setShowNoteModal(true);
  }

  return (
    <>
      <Button variant="ghost" className="p-0 w-9 h-9 flex items-center justify-center rounded-sm" onClick={hasNote? openExistingNote: createNewNote}>
        <Note className="" />
      </Button>
    </>
  );
}