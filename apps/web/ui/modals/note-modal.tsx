import {
    Sheet,
    SheetContent,
    Button,
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbSeparator
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
import { useRouter, usePathname } from "next/navigation";
import useBlock from "@/lib/swr/use-block";
import useBlockNotes from "@/lib/swr/use-block-notes";
import { ScrollArea, Separator } from "@repo/ui";
import NoteTitleEditor from "@/ui/editor/layout/note-title-editor";
import useBlockSnapshot from "@/lib/swr/use-block-snapshot";

const wait = () => new Promise((resolve) => setTimeout(resolve, 200));

import { Payment, columns } from "@/ui/datatables/notes"
import { DataTable } from "@/ui/datatables/notes"
import { ImageIcon } from "lucide-react";

function getData(): Payment[] {
    // Fetch data from your API here.
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "489e1d42",
            amount: 125,
            status: "processing",
            email: "example@gmail.com",
        },
        {
            id: "623a9f1b",
            amount: 75,
            status: "success",
            email: "john@example.com",
        },
        {
            id: "912e3d8c",
            amount: 200,
            status: "failed",
            email: "sarah@example.com",
        },
        {
            id: "345b7c9a",
            amount: 150,
            status: "pending",
            email: "alex@example.com",
        },
    ]
}


function NoteContainer({ noteContent, noteId }: { noteContent: any; noteId: string }) {
    console.log("@NoteContainer: noteContent", noteContent);
    return (
        <div className="h-full w-full">
            <div className="flex flex-col group">
                <div className="w-full ml-20 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" className="font-normal text-sm text-muted-foreground hover:text-muted-foreground p-1 items-center">
                        <div className="flex items-center justify-center">
                            <ImageIcon className="mr-2 h-4 w-4" /> 
                            <div>
                                Add cover
                            </div>
                        </div>
                    </Button>
                </div>
                <NoteTitleEditor className="text-4xl font-bold ml-12 px-8 text-neutral-600 border-none h-full max-w-[700px] pb-6" />
            </div>
            {/* <div className="px-20 py-3">
                <Separator />
            </div> */}
            <BlockEditor
                initialContent={noteContent || []}
                noteId={noteId}
                ydoc={null}
                provider={null}
                hasCollab={false}
            ></BlockEditor>
        </div>
    )
}

function NoteLoader() {
    return (<div>Loading...</div>);
}

function AllNotesContainer({ pageId }: { pageId: string | null }) {
    const { notes, loading } = useBlockNotes(pageId);
    // const data = useMemo(() => notes?.map((note) => ({
    //     id: note.id,
    //     name: note.properties?.title,
    //     created_at: note.created_at
    // })), [notes])

    const sortedNotes = useMemo(() => {
        return notes?.sort((a, b) => {
            const dateComparison = new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
            if (dateComparison === 0) {
                return (a.properties?.title || "").localeCompare(b.properties?.title || "");
            }
            return dateComparison;
        });
    }, [notes]);

    if (loading) return <div>Loading...</div>



    // const data = getData()
    return (
        <div className="h-full w-full">
            <DataTable data={sortedNotes || []} columns={columns} />
        </div>
    )
}

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
    const noteId = useMemo(() => searchParams.get("note"), [searchParams]);
    const pageId = useMemo(() => searchParams.get("page"), [searchParams]);
    const { snapshot, loading } = useBlockSnapshot(noteId)
    const noteContent = snapshot
    console.log("@NoteModal: noteContent", noteId, noteContent)
    // get the block content only once per render
    const { block: noteBlock, loading: noteLoading } = useBlock(noteId)
    // const noteContent = noteBlock?.snapshot


    function clearNoteParams() {
        const params = new URLSearchParams(searchParams);
        params.delete("note");
        params.delete("shape");
        router.replace(`${pathname}?${params.toString()}`);
    }

    useEffect(() => {
        if (!showNoteModal) {
            clearNoteParams()
        }
    }, [showNoteModal]);

    // if noteid is present in url then show the note modal
    useEffect(() => {
        if (noteId) {
            console.log("noteId", noteId)
            setShowNoteModal(true)
        }
        else {
            setShowNoteModal(false)
        }
    }, [noteId])

    const onAllNotesClick = () => {
        console.log("ALL NOTES CLICKED");
        const params = new URLSearchParams(searchParams);
        params.delete("note");
        console.log(params.toString());
        router.replace(`${pathname}?${params.toString()}`);
    }


    return (
        <Sheet
            modal={false}
            open={showNoteModal}
            onOpenChange={(open) => {
                if (sheetRef.current) {
                    sheetRef.current.setAttribute("data-state", open ? "open" : "closed");
                }
                    clearNoteParams()
                wait().then(() => {
                    // setShowNoteModal(open);
                });
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
                {/* <div className="h-12 w-full border-b border-gray-200 flex items-center pl-14"> */}
                {/* <div className="h-12 w-full flex items-center pl-14">
                    <Breadcrumb>
                        <BreadcrumbList className="gap-0 sm:gap-0">
                            <BreadcrumbItem>
                                <Button variant="ghost" className="text-muted-foreground items-center h-8" onClick={onAllNotesClick}>
                                    All notes
                                </Button>
                            </BreadcrumbItem>
                            {
                                noteId && (
                                    <>
                                        <BreadcrumbSeparator>
                                        </BreadcrumbSeparator>
                                        <BreadcrumbItem>
                                            <Button variant="ghost" className="text-muted-foreground items-center h-8">
                                                {noteBlock?.properties?.title}
                                            </Button>
                                        </BreadcrumbItem>
                                    </>
                                )
                            }
                        </BreadcrumbList>
                    </Breadcrumb>
                </div> */}
                {/* <div className="h-14 w-full" /> */}
                <ScrollArea className="pt-6 h-full" type="always">
                    {noteContent && noteId && !loading ?
                        <NoteContainer noteContent={noteContent} noteId={noteId} />
                        : <NoteLoader />
                    }
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
                onNoteDelete={() => { }}
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
