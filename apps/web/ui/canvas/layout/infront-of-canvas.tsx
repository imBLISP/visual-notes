import { Toolbar } from "@/ui/canvas/toolbar/primaryToolbar/primary-toolbar";
import { ContextToolbar } from "@/ui/canvas/toolbar/contextToolbar/context-toolbar";
import { HoverNote } from "@/ui/canvas/layout/hover-note";
import { useNoteModal } from "@/ui/modals/note-modal";
import { createContext, Dispatch, SetStateAction } from "react";
import { HelpMenu } from "@/ui/canvas/layout/help-menu";
import { ExtendHandle } from "@/ui/canvas/layout/extend-handles";

export const InfrontOfCanvasContext = createContext<{
  setShowNoteModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowNoteModal: () => { },
});

export default function InfrontOfCanvas() {
  const { setShowNoteModal, ShowNoteModal } = useNoteModal();

  return (
    <InfrontOfCanvasContext.Provider value={{ setShowNoteModal }}>
        <Toolbar />
        <ContextToolbar />
        <HoverNote />
        <ShowNoteModal />
        <HelpMenu/>
        <ExtendHandle/>
    </InfrontOfCanvasContext.Provider>
  );
}
