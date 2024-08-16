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
import Editor from "@/ui/dndkit/editor/editor"

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
                <Editor
                    blockId={"test_id"}
                    allBlocks={[
                        {
                            id: "test_id",
                            type: "page",
                            parentId: "test_parent_id",
                            properties: {
                                title: "page_title",
                            },
                            content: ["child_id_1", "child_id_2", "child_id_3"],
                        },
                        {
                            id: "child_id_1",
                            type: "text",
                            parentId: "test_id",
                            properties: {
                                title: "child 1 title",
                            },
                            content: [],
                        },
                        {
                            id: "child_id_2",
                            type: "text",
                            parentId: "test_id",
                            properties: {
                                title: "child 2 title",
                            },
                            content: [],
                        },
                        {
                            id: "child_id_3",
                            type: "text",
                            parentId: "test_id",
                            properties: {
                                title: "child 3 title",
                            },
                            content: [],
                        },

                    ]}
                    disableFirst={true}
                ></Editor>
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
