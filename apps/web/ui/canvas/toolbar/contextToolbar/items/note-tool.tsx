"use client"

import { Note } from "@/ui/icons/canvas"
import { Button } from "@repo/ui"
import { ModalContext } from "@/ui/modals/provider";
import { useContext, useEffect, useState } from "react";
import { DefaultSizeStyle, track, useEditor } from "@tldraw/tldraw";
import createBlock from "@/lib/transactions/create-block";
import { v4 as uuidv4 } from "uuid";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";


export function NoteTool() {
  const editor = useEditor();

  const selectedShapes = editor.getSelectedShapes();
  const { workspaceId } = useParams() as { workspaceId: string };
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()
  const pageId = searchParams.get("page")
  const { setShowNoteModal } = useContext(ModalContext);
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

  async function openNoteModal() {
    if (!hasNote) {
      if (!pageId) return;



      const noteId = uuidv4()
      const shapeId = selectedShapes[0].id

      const transaction = createBlock({
        id: noteId,
        type: "note",
        properties: {},
        content: [],
        parentId: pageId,
        snapshot: [],
        active: true
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
          noteId: noteId
        }
      }])

      // create a new note and add it to the shape meta
    }
    // set the note search param to note id 
    const noteId = selectedShapes[0].meta?.noteId
    if (!noteId) return;

    params.set("note", noteId.toString());
    router.replace(`${pathname}?${params.toString()}`);

    setShowNoteModal(true);
  }

  return (
    <>
      <Button variant="ghost" className="p-0 w-9 h-9 flex items-center justify-center rounded-sm" onClick={openNoteModal}>
        <Note className="" />
        {!hasNote && <div className="absolute w-2 h-2 bg-red-500 rounded-full"></div>}
      </Button>
    </>
  );
}