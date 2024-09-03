import {Note} from "@/ui/icons/canvas"
import {Button} from "@repo/ui"
import { ModalContext } from "@/ui/modals/provider";
import { useContext } from "react";

export function NoteTool() {
    const { setShowNoteModal } = useContext(ModalContext);

    function openNoteModal() {
        setShowNoteModal(true);
    }

  return (
    <>
        <Button variant="ghost" className="p-0 w-9 h-9 flex items-center justify-center rounded-sm" onClick={openNoteModal}>
            <Note className="" />
        </Button>
    </>
  );
}