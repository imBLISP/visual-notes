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
import {
    BlockEditor
} from "@/ui/editor"
import { useSearchParams } from "next/navigation";
import useBlockContent from "@/lib/swr/use-block-content";

const wait = () => new Promise((resolve) => setTimeout(resolve, 200));

function NoteModal({
    showNoteModal,
    setShowNoteModal,
}: {
    showNoteModal: boolean;
    setShowNoteModal: Dispatch<SetStateAction<boolean>>;
}) {
    const sheetRef = useRef(null);
    // get the block id from the url
    const searchParams = useSearchParams();
    const blockId = searchParams.get("blockId");

    // get the block content only once per render
    const { data: blockContent, error } = useBlockContent(blockId);

    console.log("blockContent", blockContent);

    return (
        <Sheet
            modal={false}
            open={showNoteModal}
            onOpenChange={(open) => {
                console.log(sheetRef);
                if (sheetRef.current) {
                    sheetRef.current.setAttribute("data-state", open ? "open" : "closed");
                }
                wait().then(() => setShowNoteModal(open));
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
                <BlockEditor
                    ydoc={null}
                    provider={null}
                    hasCollab={false}
                ></BlockEditor>
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
