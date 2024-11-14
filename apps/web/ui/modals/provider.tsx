"use client";

import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { useNoteModal } from "@/ui/modals/note-modal";
import { useAddWorkspaceModal } from "@/ui/modals/add-workspace-modal";
import { useEditWorkspaceModal } from "@/ui/modals/edit-workspace-modal";
export const ModalContext = createContext<{
  // setShowNoteModal: Dispatch<SetStateAction<boolean>>;
  setShowAddWorkspaceModal: Dispatch<SetStateAction<boolean>>;
  setShowEditWorkspaceModal: Dispatch<SetStateAction<boolean>>;
}>({
  // setShowNoteModal: () => { },
  setShowAddWorkspaceModal: () => { },
  setShowEditWorkspaceModal: () => { },
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  // const { setShowNoteModal, ShowNoteModal } = useNoteModal();
  const { setShowAddWorkspaceModal, ShowAddWorkspaceModal } = useAddWorkspaceModal();
  const { setShowEditWorkspaceModal, ShowEditWorkspaceModal } = useEditWorkspaceModal();
  return (
    <ModalContext.Provider value={{ setShowAddWorkspaceModal, setShowEditWorkspaceModal }}>
      <ShowAddWorkspaceModal />
      {/* <ShowNoteModal /> */}
      <ShowEditWorkspaceModal />
      {children}
    </ModalContext.Provider>
  );
}
