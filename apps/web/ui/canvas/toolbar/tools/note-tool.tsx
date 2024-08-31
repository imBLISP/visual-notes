import {Note} from "@/ui/icons/canvas"
import {Button} from "@repo/ui"
import { useNoteModal } from "@/ui/modals/note-modal";

export function NoteTool() {
    const { setShowNoteModal, ShowNoteModal } = useNoteModal();

    function openNoteModal() {
        setShowNoteModal(true);
    }

  return (
    <>
        <Button variant="ghost" className="p-0 w-9 h-9 flex items-center justify-center rounded-sm" onClick={openNoteModal}>
            <Note className="" />
        </Button>
        <ShowNoteModal />
    </>
  );
}