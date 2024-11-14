"use client"

import {Button} from "@repo/ui"
import { Trash } from "lucide-react"
import { DefaultSizeStyle, track, useEditor } from "tldraw";

export function DeleteTool() {
  const editor = useEditor();
  const selectedShapes = editor.getSelectedShapes();

  function deleteSelected() {
    editor.deleteShapes(selectedShapes);
  }

  return (
    <>
        <Button variant="ghost" className="p-0 w-9 h-9 flex items-center justify-center rounded-sm" onClick={deleteSelected}>
            <Trash className="" size={15}/>
        </Button>
    </>
  );
}