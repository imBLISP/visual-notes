"use client";

import {
  createTLStore,
  defaultShapeUtils,
  getSnapshot,
  loadSnapshot,
  Tldraw,
  TLEditorComponents,
  TLEventMapHandler,
  Editor,
  TLUiComponents,
  TLEditorSnapshot,
  TLUiOverrides,
  TLUiActionsContextType,
  TLUiToolsContextType,
  TLAssetStore,
} from "tldraw";
import React, { useCallback, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import useBlockContent from "@/lib/swr/use-block-content";
import useBlocksStore from "@/lib/zustand/transactionQueue";
import _ from "lodash";
import { v4 as uuidv4, validate as validateUuid } from "uuid";
import { ContextToolbar } from "@/ui/canvas/toolbar/contextToolbar/context-toolbar";
import { Toolbar } from "@/ui/canvas/toolbar/primaryToolbar/primary-toolbar";
import { Background } from "@/ui/canvas/backgrounds/background"
import { debounce } from "lodash";
import updateBlock from "@/lib/transactions/update-block";
import useBlock from "@/lib/swr/use-block";
import { HoverNote } from "@/ui/canvas/layout/hover-note";
import InfrontOfTheCanvas from "@/ui/canvas/layout/infront-of-canvas";
import { uploadFile } from "@/lib/uploadThing/uploadImage";


// const MyCustomShapes = [];

function InfrontOfTheCanvasWrapper() {
  return (
    <>
      <InfrontOfTheCanvas />
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
  // ZoomMenu: null,
  MainMenu: null,
  // Minimap: null,
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

export default function Canvas() {
  const searchParams = useSearchParams();
  const { workspace: workspaceId } = useParams<{ workspace: string }>();
  const pageId = searchParams.get("page");
  const { block: canvasBlock, mutate: mutateCanvasBlock, loading: canvasBlockLoading } = useBlock(pageId);
  const [editor, setEditor] = useState<Editor>();
  const setAppToState = useCallback((editor: Editor) => {
    setEditor(editor);
  }, []);
  const { upload } = uploadFile()

  // BLOCKS
  const { blocks, loading } = useBlockContent(pageId);
  const { enqueueTransaction } = useBlocksStore();


  const assetStore: TLAssetStore = {
    // [a]
    async upload(asset, file) {
      try {
        const url = await upload("", file.name, file);
        console.log("uploaded asset", url)
        console.log("file", file)
        return url
      } catch (error) {
        console.log("Error uploading asset", error)
        return ""
      }
    },

    // [b]
    resolve(asset) {
      return asset.props.src
    },
  }

  // EVENTS
  useEffect(() => {
    if (!editor) return;

    editor.sideEffects.registerBeforeCreateHandler("shape", (shape, source) => {
      // remove 'shape' from shape.id

      if (shape.meta.id) {
        return shape;
      }

      let updatedShape = shape
      updatedShape = {
        ...shape,
        meta: { id: uuidv4(), noteId: "" }
      };

      if (shape.meta.noteId) {
        updatedShape = {
          ...shape,
          props: {
            ...shape.props,
            text: shape.meta.noteId
          }
        }
      }

      return updatedShape
    });

    const saveCanvas = debounce(async (snapshot: TLEditorSnapshot) => {
      if (!pageId) return;
      if (!canvasBlock) return;

      const transaction = updateBlock({
        snapshot: snapshot,
      }, pageId);

      mutateCanvasBlock({
        ...canvasBlock,
        snapshot: snapshot,
      }, { revalidate: false });

      const res = await fetch(`/api/saveTransactions`, {
        method: "POST",
        body: JSON.stringify(transaction),
      })
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

      if (shapeUpdated && !canvasBlockLoading) {
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
    // Create the store
    const newStore = createTLStore({
      shapeUtils: [...defaultShapeUtils],
      assets: assetStore,
    });

    const snapshot = canvasBlock?.snapshot;

    // Load the snapshot
    if (snapshot) {
      loadSnapshot(newStore, snapshot);
    }

    return newStore;
  });

  // NEW STORE WHEN PAGE CHANGES
  useEffect(() => {
    // Create the store
    console.log("NEW STORE");
    const newStore = createTLStore({
      shapeUtils: [...defaultShapeUtils],
      assets: assetStore,
    });

    const snapshot = canvasBlock?.snapshot;

    // Load the snapshot
    if (snapshot) {
      loadSnapshot(newStore, snapshot);
    }

    setStore(newStore);
  }, [pageId, canvasBlockLoading]);

  if (canvasBlockLoading) {
    return <div className="h-full w-full flex items-center justify-center">
      Loading...
    </div>
  }

  return (
    <div className="h-full w-full">
      <Tldraw
        // shapeUtils={MyCustomShapes}
        store={store}
        components={{ ...components, ...UIcomponents }}
        onMount={setAppToState}
        overrides={overrides}
      >
        {/* <BlocksState /> */}
      </Tldraw>
    </div>
  );
}

const overrides: TLUiOverrides = {
  //[a]
  actions(_editor, actions): TLUiActionsContextType {
    const newActions = {
      ...actions,
    }

    return newActions
  },
  //[b]
  tools(_editor, tools): TLUiToolsContextType {
    const newTools = { ...tools }
    return newTools
  },
}

function getBlockIdFromShapeId(shapeId: string): string {
  const blockId = shapeId.split("shape:")[1];
  return blockId || "";
}

function initShapes(editor: Editor) { }
