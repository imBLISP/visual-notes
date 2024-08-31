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
  Editor,
  TLUiComponents,
} from "@tldraw/tldraw";
import React, { useCallback, useEffect, useState } from "react";
import { CustomArrowShapeUtil } from "@/ui/canvas/shapes/arrow/arrow";
import { useParams, useSearchParams } from "next/navigation";
import useBlockContent from "@/lib/swr/use-block-content";
import useBlocksStore from "@/lib/zustand/transactionQueue";
import _ from "lodash";
import { v4 as uuidv4, validate as validateUuid } from "uuid";
import createBlock from "@/lib/transactions/create-block";
import { Block } from "@/lib/types";
import updateBlock from "@/lib/transactions/update-block";
import {ContextToolbar} from "@/ui/canvas/toolbar/secondary-toolbar";
import {Toolbar} from "@/ui/canvas/toolbar/primary-toolbar";
import {Background} from "@/ui/canvas/backgrounds/background"

const MyCustomShapes = [CustomArrowShapeUtil];

function InfrontOfTheCanvasWrapper() {
  return (
    <>
      <Toolbar/>
      <ContextToolbar/>
    </>
  );
}

const components: TLEditorComponents = {
  InFrontOfTheCanvas: InfrontOfTheCanvasWrapper,
  Background: Background,
};

const UIcomponents: TLUiComponents = {
	ContextMenu: null,
	ActionsMenu: null,
	HelpMenu: null,
	ZoomMenu: null,
	MainMenu: null,
	Minimap: null,
	StylePanel: null,
	PageMenu: null,
	NavigationPanel: null,
	Toolbar: null,
	KeyboardShortcutsDialog: null,
	QuickActions: null,
	HelperButtons: null,
	DebugPanel: null,
	DebugMenu: null,
	SharePanel: null,
	MenuPanel: null,
	TopPanel: null,
	// CursorChatBubble: null,
}

export default function TldrawCanvas() {
  const searchParams = useSearchParams();
  const { workspace: workspaceId } = useParams<{ workspace: string }>();
  const pageId = searchParams.get("page");
  const [editor, setEditor] = useState<Editor>();
  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);
  }, []);
  const { blocks } = useBlockContent(pageId ?? "");
  // const [storeEvents, setStoreEvents] = useState<string[]>([])
  const { enqueueTransaction } = useBlocksStore();

  useEffect(() => {
    if (editor) {
      let shapes: Array<TLShapePartial> = [];

      blocks?.map((block) => {
        if (block.type == "tlshape") {
          shapes.push(block.properties);
        }
      });


      editor.createShapes(shapes);
    }
  }, [editor, blocks]);

  function logChangeEvent(eventName: string) {
    // setStoreEvents((events) => [...events, eventName])
  }

  useEffect(() => {
    if (!editor) return;

    editor.sideEffects.registerBeforeCreateHandler("shape", (shape, source) => {
      // remove 'shape' from shape.id
      if (shape.meta.id) {
        return shape;
      } else {
        return { ...shape, meta: { id: uuidv4() } };
      }
    });

    //[1]
    const handleChangeEvent: TLEventMapHandler<"change"> = (change) => {
      // Added
      for (const record of Object.values(change.changes.added)) {
        if (record.typeName === "shape") {
          console.log("record", record);
          // logChangeEvent(`created shape (${record.type})\n`);
          let alreadyExists = false;

          for (let b of blocks || []) {
            if (b.id == record.meta.id) {
              alreadyExists = true;
            }
          }

          if (!alreadyExists) {
            const block: Block = {
              id: record.meta.id,
              type: "tlshape",
              properties: record,
              parentId: searchParams.get("page") ?? "",
            };
            const pageId = searchParams.get("page") ?? "";
            const transaction = createBlock(block, workspaceId);

            enqueueTransaction(transaction);
          }
        }
      }

      // Updated
      for (const [from, to] of Object.values(change.changes.updated)) {
        if (to.typeName === "shape") {
          const blockUpdate = {
            properties: to,
          };

          const transaction = updateBlock(blockUpdate, to.meta.id, workspaceId);

          enqueueTransaction(transaction);
        }
      }

      // Removed
      for (const record of Object.values(change.changes.removed)) {
        if (record.typeName === "shape") {
          // logChangeEvent(`deleted shape (${record.type})\n`)
          // unaliveBlock({id: record.meta.id, type: "tlshape", properties: record, parentId: searchParams.get("page") ?? "", alive: false});
        }
      }
    };

    // [2]
    const cleanupFunction = editor.store.listen(handleChangeEvent, {
      source: "user",
      scope: "all",
    });

    return () => {
      cleanupFunction();
    };
  }, [editor, enqueueTransaction, blocks]);

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

  useEffect(() => {
    setStore(
      createTLStore({
        shapeUtils: [...defaultShapeUtils, ...MyCustomShapes],
      })
    );
  }, [pageId]);

  return (
    <div className="h-full w-full">
      <Tldraw
        shapeUtils={MyCustomShapes}
        // onMount={(editor) => {
        //   editor.createShapes([{ type: "custom-arrow", x: 100, y: 100 }]);
        // }}
        store={store}
        components={{...components, ...UIcomponents}}
        onMount={setAppToState}
      >
        {/* <BlocksState /> */}
      </Tldraw>
    </div>
  );
}

function getBlockIdFromShapeId(shapeId: string): string {
  const blockId = shapeId.split("shape:")[1];
  return blockId || "";
}

function initShapes(editor: Editor) {}
