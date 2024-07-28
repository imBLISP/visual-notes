import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { useNoteModal } from "@/ui/modals/note-modal";
import { useAddWorkspaceModal } from "@/ui/modals/add-workspace-modal";

export const ModalContext = createContext<{
  setShowNoteModal: Dispatch<SetStateAction<boolean>>;
  setShowAddWorkspaceModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowNoteModal: () => {},
  setShowAddWorkspaceModal: () => {},
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { setShowNoteModal, ShowNoteModal } = useNoteModal();
  const { setShowAddWorkspaceModal, ShowAddWorkspaceModal } = useAddWorkspaceModal();
  return (
    <ModalContext.Provider value={{ setShowNoteModal , setShowAddWorkspaceModal}}>
      <ShowAddWorkspaceModal/>
      <ShowNoteModal />
      {children}
    </ModalContext.Provider>
  );
}
