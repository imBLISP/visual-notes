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
import unaliveBlock from "@/lib/transactions/unalive-block";
import { Block } from "@/lib/types";
import updateBlock from "@/lib/transactions/update-block";
import {ContextToolbar} from "@/ui/canvas/toolbar/contextToolbar/context-toolbar";
import {Toolbar} from "@/ui/canvas/toolbar/primaryToolbar/primary-toolbar";
import {Background} from "@/ui/canvas/backgrounds/background"
import {debounce} from "lodash";

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

  // BLOCKS
  const { blocks, loading } = useBlockContent(pageId ?? "");
  const { enqueueTransaction } = useBlocksStore();

  // EVENTS
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

    const saveCanvas = debounce((snapshot) => {
      console.log("saving canvas", snapshot);
      fetch("/api/saveCanvas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snapshot),
      }).catch((err) => {
        console.log(err);
      });
    }, 1000);

    //[1]
    const handleChangeEvent: TLEventMapHandler<"change"> = (change) => {
      let shapeUpdated = false

      // Added
      for (const record of Object.values(change.changes.added)) {
        if (record.typeName === "shape") {
          shapeUpdated = true;
        }
      }

      // Updated
      for (const [from, to] of Object.values(change.changes.updated)) {
        if (to.typeName === "shape" || to.typeName === "camera") {
          shapeUpdated = true;
        }
      }

      // Removed
      for (const record of Object.values(change.changes.removed)) {
        if (record.typeName === "shape") {
          shapeUpdated = true;
        }
      }

      if (shapeUpdated) {
        const snapshot = getSnapshot(editor.store);
        saveCanvas(snapshot);
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

  // STORE
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

  // NEW STORE WHEN PAGE CHANGES
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
