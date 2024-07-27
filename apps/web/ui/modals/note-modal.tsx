import {
  Button,
  Input,
  Label,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

const wait = () => new Promise((resolve) => setTimeout(resolve, 200));

function NoteModal({
  showNoteModal,
  setShowNoteModal,
}: {
  showNoteModal: boolean;
  setShowNoteModal: Dispatch<SetStateAction<boolean>>;
}) {

    const sheetRef = useRef(null);

  return (
    <Sheet
      modal={false}
      open={showNoteModal}
      onOpenChange={(open) => {
        console.log(sheetRef);
        sheetRef.current?.setAttribute('data-state', open? 'open' : 'closed');
        wait().then(() => setShowNoteModal(open))
      }}
    >
      <SheetContent
        className="sm:max-w-[800px]"
        ref={sheetRef}
        // forceMount={true}
        onPointerDownOutside={(e) => {
          e.preventDefault();
        }}
        onInteractOutside={(e) => {
            e.preventDefault();
        }}
      >
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button>Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export function useNoteModal() {
  const [showNoteModal, setShowNoteModal] = useState(false);

  const ShowNoteModalCallback = useCallback(() => {
    return (
      <NoteModal
        showNoteModal={showNoteModal}
        setShowNoteModal={setShowNoteModal}
      />
    );
  }, [showNoteModal, setShowNoteModal]);

  return useMemo(
    () => ({
      setShowNoteModal: setShowNoteModal,
      ShowNoteModal: ShowNoteModalCallback,
    }),
    [setShowNoteModal, ShowNoteModalCallback]
  );
}
