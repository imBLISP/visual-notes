import { createContext, Dispatch, ReactNode, SetStateAction } from "react";
import { useNoteModal } from "@/ui/modals/note-modal";

export const ModalContext = createContext<{
  setShowNoteModal: Dispatch<SetStateAction<boolean>>;
}>({
  setShowNoteModal: () => {},
});

export default function ModalProvider({ children }: { children: ReactNode }) {
  const { setShowNoteModal, ShowNoteModal } = useNoteModal();
  return (
    <ModalContext.Provider value={{ setShowNoteModal }}>
      {children}
      <ShowNoteModal />
    </ModalContext.Provider>
  );
}
