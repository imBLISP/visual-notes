"use client";

import {
  createTLStore,
  defaultShapeUtils,
  getSnapshot,
  loadSnapshot,
  Tldraw,
  useEditor,
  TLShapePartial,
  createShapeId,
  TLEditorComponents,
  track,
  DefaultSizeStyle,
} from "@tldraw/tldraw";
import React, { useEffect, useState } from "react";
import { CustomArrowShapeUtil } from "@/ui/canvas/arrow";
import { useParams, useSearchParams } from "next/navigation";
import useBlockContent from "@/lib/swr/use-block-content";
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
  ScrollArea
} from "@repo/ui";
import Editor from "@/ui/editor/editor"

const MyCustomShapes = [CustomArrowShapeUtil];

function InsideOfContext() {
  // const editor = useEditor()
  // const {document, session} = getSnapshot(editor.store)
  // // console.log(`doc: ${JSON.stringify(document, null, 2)}`)
  // // console.log(`session: ${JSON.stringify(session, null, 2)}`)
  // // your editor code here
  // return null // or whatever
  const searchParams = useSearchParams();
  const { blocks } = useBlockContent(searchParams.get("page") ?? "");
  let shapes: Array<TLShapePartial> = [];
  blocks?.map((block) => {
    if (block.type == "tlshape") {
      block.properties.id = createShapeId(block.id);
      shapes.push(block.properties);
    }
  });

  console.log(`shapes: ${JSON.stringify(shapes, null, 2)}`);

  const editor = useEditor();
  if (blocks) {
    editor.createShapes(shapes);
  }
  const unlisten = editor.store.listen(
    (update) => {
      localStorage.setItem(
        "my-editor-snapshot",
        JSON.stringify(getSnapshot(editor.store))
      );
    },
    { scope: "document", source: "user" }
  );
  return null;
}

const ContextToolbarComponent = track(() => {
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (modalOpen) {
      // Pushing the change to the end of the call stack
      const timer = setTimeout(() => {
        document.body.style.pointerEvents = '';
      }, 0);

      return () => clearTimeout(timer);
    } else {
      document.body.style.pointerEvents = 'auto';
    }
  }, [modalOpen]);

  const editor = useEditor();
  const showToolbar = editor.isIn("select.idle");
  if (!showToolbar) return null;
  // const selectionRotatedPageBounds = editor.getSelectionRotatedPageBounds()
  const hoveredShape = editor.getHoveredShape();
  let selectionRotatedPageBounds;
  if (hoveredShape) {
    selectionRotatedPageBounds = editor.getShapePageBounds(hoveredShape);
  } else {
    selectionRotatedPageBounds = editor.getSelectionRotatedPageBounds();
  }

  if (!selectionRotatedPageBounds) return null;
  console.log(`hoveredShape: ${JSON.stringify(hoveredShape, null, 2)}`);
  console.log(
    `selectionRotatedPageBounds: ${JSON.stringify(selectionRotatedPageBounds, null, 2)}`
  );

  // [2]
  let size;
  if (hoveredShape) {
    size = editor.getShapeStyleIfExists(hoveredShape, DefaultSizeStyle);
  } else {
    size = editor.getSharedStyles().get(DefaultSizeStyle);
  }
  // const size = editor.getShapeStyleIfExists(hoveredShape, DefaultSizeStyle)
  // const size = editor.getSharedStyles().get(DefaultSizeStyle)
  console.log(`size: ${JSON.stringify(size, null, 2)}`);
  if (!size) return null;
  // const currentSize = size.type === 'shared' ? size.value : undefined
  const currentSize = size;

  const pageCoordinates = editor.pageToViewport(
    selectionRotatedPageBounds.point
  );

  const OpenNoteClicked = () => {
    console.log("Open note clicked");
  };

  return (
    <div
      style={{
        position: "absolute",
        top: Math.max(16, pageCoordinates.y - 48),
        left: Math.max(16, pageCoordinates.x),
        pointerEvents: "all",
        // [3]
        width: selectionRotatedPageBounds.width,
      }}
      // [4]
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            borderRadius: 8,
            display: "flex",
            boxShadow: "0 0 0 1px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)",
            background: "var(--color-panel)",
            width: "fit-content",
            alignItems: "center",
          }}
        >
          <Sheet onOpenChange={(open) => setModalOpen(open)} modal={false}>
            {/* <SheetOverlay className=""></SheetOverlay> */}
            <SheetTrigger>
              <Button>Open note</Button>
            </SheetTrigger>
            <SheetPortal>
              <SheetContent className="sm:max-w-[800px]">
                <ScrollArea className="w-full h-full">
                <Editor onChange={(change) => {console.log(change)}}></Editor>
                {/* <SheetHeader>
                  <SheetTitle>Are you absolutely sure?</SheetTitle>
                  <SheetDescription>
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
                  </SheetDescription>
                </SheetHeader>
                <SheetFooter>
                  <SheetClose asChild>
                    <Button type="submit">Save changes</Button>
                  </SheetClose>
                </SheetFooter> */}
                </ScrollArea>
              </SheetContent>
            </SheetPortal>
          </Sheet>
          {/* <Button onClick={() => OpenNoteClicked()}>
            Open note
          </Button> */}
          {/* <div
								style={{
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									height: 32,
									width: 32,
									background:'transparent',
								}}
								onClick={() => console.log("button clicked")}
							>
                Open note
							</div> */}
        </div>
      </div>
    </div>
  );
});

const components: TLEditorComponents = {
  InFrontOfTheCanvas: ContextToolbarComponent,
};

export default function TldrawCanvas() {
  const [store] = useState(() => {
    // const stringified = localStorage.getItem('my-editor-snapshot')
    const stringified = null;
    if (!stringified) {
      return createTLStore({
        shapeUtils: [...defaultShapeUtils, ...MyCustomShapes],
      });
    }

    // Create the store
    const newStore = createTLStore({
      shapeUtils: [...defaultShapeUtils, ...MyCustomShapes],
    });

    // Get the snapshot
    // console.log(`stringified: ${stringified}`)
    if (!stringified) {
      return newStore;
    }
    const snapshot = JSON.parse(stringified);

    // Load the snapshot
    loadSnapshot(newStore, snapshot);
    return newStore;
  });

  return (
    <div className="h-full w-full">
      <Tldraw
        shapeUtils={MyCustomShapes}
        // onMount={(editor) => {
        //   editor.createShapes([{ type: "custom-arrow", x: 100, y: 100 }]);
        // }}
        store={store}
        components={components}
      >
        <InsideOfContext />
      </Tldraw>
    </div>
  );
}
