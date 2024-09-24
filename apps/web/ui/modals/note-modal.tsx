import {
    Sheet,
    SheetContent,
} from "@repo/ui";
import {
    Dispatch,
    SetStateAction,
    useCallback,
    useMemo,
    useRef,
    useState,
    useEffect
} from "react";
import {
    BlockEditor
} from "@/ui/editor"
import { useSearchParams } from "next/navigation";
import useBlockContent from "@/lib/swr/use-block-content";
import { useRouter, usePathname } from "next/navigation";
import useBlock from "@/lib/swr/use-block";
import { ScrollArea, Separator } from "@repo/ui";
import { useEditor } from "@tldraw/tldraw";
const wait = () => new Promise((resolve) => setTimeout(resolve, 200));

function NoteModal({
    showNoteModal,
    setShowNoteModal,
    onNoteDelete
}: {
    showNoteModal: boolean;
    setShowNoteModal: Dispatch<SetStateAction<boolean>>;
    onNoteDelete: () => void;
}) {
    const sheetRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    // get the block id from the url
    const searchParams = useSearchParams();
    const blockId = useMemo(() => searchParams.get("blockId"), [searchParams]);
    const noteId = useMemo(() => searchParams.get("note"), [searchParams]);
    // get the block content only once per render
    const { block: noteBlock, loading: noteLoading } = useBlock(noteId)
    const noteContent = noteBlock?.snapshot

    useEffect(() => {
        if (!showNoteModal) {
            const params = new URLSearchParams(searchParams);
            params.delete("note");
            router.replace(`${pathname}?${params.toString()}`);
        }
    }, [showNoteModal]);


    return (
        <Sheet
            modal={false}
            open={showNoteModal}
            onOpenChange={(open) => {
                if (sheetRef.current) {
                    sheetRef.current.setAttribute("data-state", open ? "open" : "closed");
                }
                wait().then(() => setShowNoteModal(open));
            }}
        >
            <SheetContent
                className="sm:max-w-[700px] m-0 p-0"
                ref={sheetRef}
                // forceMount={true}
                onPointerDownOutside={(e) => {
                    e.preventDefault();
                }}
                onInteractOutside={(e) => {
                    e.preventDefault();
                }}
            >
                <div className="h-14 w-full border-b border-gray-200" />
                {/* <div className="h-14 w-full" /> */}
                <ScrollArea className="h-full">
                    <div className="pt-6 text-4xl font-bold ml-11 px-8 text-neutral-700">Untitled</div>
                    <Separator className="mt-6 ml-20 w-[600px]" />
                    {noteLoading ? <div>Loading...</div> : <BlockEditor
                        initialContent={noteContent || []}
                        noteId={noteId}
                        ydoc={null}
                        provider={null}
                        hasCollab={false}
                    ></BlockEditor>}

                </ScrollArea>
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
                onNoteDelete={() => {}}
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
