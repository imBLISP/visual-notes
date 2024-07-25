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
  TLEventMapHandler,
  Editor
} from "@tldraw/tldraw";
import React, { useCallback, useEffect, useState } from "react";
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
import NoteEditor from "@/ui/editor/advanced-editor"
import useBlocksStore from "@/lib/zustand/transactionQueue";
import _ from "lodash"
import {v4 as uuidv4, validate as validateUuid} from "uuid";
import createBlock from "@/lib/transactions/create-block"
import {Block} from "@/lib/types"

const MyCustomShapes = [CustomArrowShapeUtil];

// function BlocksState() {
//   // const editor = useEditor()
//   // const {document, session} = getSnapshot(editor.store)
//   // // console.log(`doc: ${JSON.stringify(document, null, 2)}`)
//   // // console.log(`session: ${JSON.stringify(session, null, 2)}`)
//   // // your editor code here
//   // return null // or whatever
//   const {addBlock, blocks: storeBlocks} = useBlocksStore();
//   const searchParams = useSearchParams();
//   const { blocks } = useBlockContent(searchParams.get("page") ?? "");
//   let shapes: Array<TLShapePartial> = [];
//   blocks?.map((block) => {
//     if (block.type == "tlshape") {
//       block.properties.id = createShapeId(block.id);
//       shapes.push(block.properties);
//     }
//   });

//   const editor = useEditor();
//   if (blocks) {
//     editor.createShapes(shapes);
//   }
//   // const unlisten = editor.store.listen(
//   //   (update) => {
//   //     const added = update.changes.added;
//   //     const updated = update.changes.updated;
//   //     const removed = update.changes.removed;
//   //     if (Object.keys(added).length > 0) {
//   //       console.log("storeBlocks initial", storeBlocks);
//   //       console.log("added", added);
//   //       for (const [key, value] of Object.entries(added)) {
//   //         addBlock({
//   //           id: value.id,
//   //           type: "tlshape",
//   //           properties: value,
//   //           parentId: searchParams.get("page") ?? "",
//   //         });
//   //       }
//   //       console.log(storeBlocks);
//   //     }
//   //   },
//   //   { scope: "document", source: "user" }
//   // );
//   return null;
// }

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

  // [2]
  let size;
  if (hoveredShape) {
    size = editor.getShapeStyleIfExists(hoveredShape, DefaultSizeStyle);
  } else {
    size = editor.getSharedStyles().get(DefaultSizeStyle);
  }
  if (!size) return null;

  const currentSize = size;

  const pageCoordinates = editor.pageToViewport(
    selectionRotatedPageBounds.point
  );

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
            <SheetTrigger>
              <Button>Open note</Button>
            </SheetTrigger>
            <SheetPortal>
              <SheetContent className="sm:max-w-[800px]">
                <ScrollArea className="w-full h-full">
                  <NoteEditor initialValue={{}} onChange={() => console.log("changed")} />
                </ScrollArea>
              </SheetContent>
            </SheetPortal>
          </Sheet>
        </div>
      </div>
    </div>
  );
});

const components: TLEditorComponents = {
  InFrontOfTheCanvas: ContextToolbarComponent,
};

export default function TldrawCanvas() {
  console.log("TLDrawCanvas updated..")
  const searchParams = useSearchParams();
  const pageId = searchParams.get("page");
	const [editor, setEditor] = useState<Editor>()
	const setAppToState = useCallback((editor: Editor) => {
		setEditor(editor)
	}, [])
  const { blocks } = useBlockContent(pageId ?? "");
  console.log('blocks', blocks)
	// const [storeEvents, setStoreEvents] = useState<string[]>([])
  const {enqueueTransaction} = useBlocksStore()

  useEffect(() => {
    if (editor) {
      let shapes: Array<TLShapePartial> = [];

      blocks?.map((block) => {
        if (block.type == "tlshape") {
          shapes.push(block.properties);
        }
      });

      console.log('initializing Shapes...', shapes)

      editor.createShapes(shapes);
    }
  }, [editor, blocks])

  function logChangeEvent(eventName: string) {
    // setStoreEvents((events) => [...events, eventName])
    console.log('event', eventName)
  }

	useEffect(() => {
		if (!editor) return
    console.log('editor changed')

    editor.sideEffects.registerBeforeCreateHandler('shape', (shape, source) => {
      // remove 'shape' from shape.id
      console.log('before create shape', shape)
      if (shape.meta.id) {
        console.log('shape id already has a uuid', shape.id)
        return shape
      }
      else {
        return {...shape, meta: {id: uuidv4()}}
      }
    })

		//[1]
		const handleChangeEvent: TLEventMapHandler<'change'> = (change) => {
			// Added
			for (const record of Object.values(change.changes.added)) {
				if (record.typeName === 'shape') {
					logChangeEvent(`created shape (${record.type})\n`)
          let alreadyExists = false;

          for (let b of blocks || []) {
            console.log('block id', b.id)
            console.log('record id', record.meta.id)
            if (b.id == record.meta.id) {
              alreadyExists = true;
            }
          }

          if (!alreadyExists) {
            console.log('creating block', record )
            const block: Block = {
              id: record.meta.id,
              type: "tlshape",
              properties: record,
              parentId: searchParams.get("page") ?? "",
            }
            const pageId = searchParams.get("page") ?? "";
            const transaction = createBlock( block, pageId);

            enqueueTransaction(transaction);
          }
				}
			}

			// Updated
			for (const [from, to] of Object.values(change.changes.updated)) {
        if (from.typeName === 'shape') {
          // updateBlockProperties({id: record.meta.id, type: "tlshape", properties: record, parentId: searchParams.get("page") ?? "", alive: true});
        }
				// if (
				// 	from.typeName === 'instance' &&
				// 	to.typeName === 'instance' &&
				// 	from.currentPageId !== to.currentPageId
				// ) {
				// 	logChangeEvent(`changed page (${from.currentPageId}, ${to.currentPageId})`)
				// } else if (from.id.startsWith('shape') && to.id.startsWith('shape')) {
				// 	let diff = _.reduce(
				// 		from,
				// 		(result: any[], value, key: string) =>
				// 			_.isEqual(value, (to as any)[key]) ? result : result.concat([key, (to as any)[key]]),
				// 		[]
				// 	)
				// 	if (diff?.[0] === 'props') {
				// 		diff = _.reduce(
				// 			(from as any).props,
				// 			(result: any[], value, key) =>
				// 				_.isEqual(value, (to as any).props[key])
				// 					? result
				// 					: result.concat([key, (to as any).props[key]]),
				// 			[]
				// 		)
				// 	}
				// 	logChangeEvent(`updated shape (${JSON.stringify(diff)})\n`)
				// }
			}

			// Removed
			for (const record of Object.values(change.changes.removed)) {
				if (record.typeName === 'shape') {
					// logChangeEvent(`deleted shape (${record.type})\n`)
          // unaliveBlock({id: record.meta.id, type: "tlshape", properties: record, parentId: searchParams.get("page") ?? "", alive: false});
				}
			}
		}

		// [2]
		const cleanupFunction = editor.store.listen(handleChangeEvent, { source: 'user', scope: 'all' })

		return () => {
			cleanupFunction()
		}
	}, [editor, enqueueTransaction, blocks])


  const [store, setStore] = useState(() => {
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
    if (!stringified) {
      return newStore;
    }
    const snapshot = JSON.parse(stringified);

    // Load the snapshot
    loadSnapshot(newStore, snapshot);
    return newStore;
  });

  // useEffect(() => {
  //   setStore(createTLStore({
  //       shapeUtils: [...defaultShapeUtils, ...MyCustomShapes],
  //   }));
  // }, [pageId])

  return (
    <div className="h-full w-full">
      <Tldraw
        shapeUtils={MyCustomShapes}
        // onMount={(editor) => {
        //   editor.createShapes([{ type: "custom-arrow", x: 100, y: 100 }]);
        // }}
        store={store}
        components={components}
        onMount={setAppToState}
      >
        {/* <BlocksState /> */}
      </Tldraw>
    </div>
  );
}

function getBlockIdFromShapeId(shapeId: string): string {
  const blockId = shapeId.split('shape:')[1]
  return blockId || ""
}

function initShapes(editor: Editor) {
};