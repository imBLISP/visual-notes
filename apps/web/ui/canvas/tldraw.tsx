"use client";

import {
  createTLStore,
  defaultShapeUtils,
  getSnapshot,
  loadSnapshot,
  Tldraw,
  useEditor,
  TLShapePartial,
  createShapeId
} from "@tldraw/tldraw";
import React, { useState } from "react";
import {CustomArrowShapeUtil} from "@/ui/canvas/arrow";
import { useParams, useSearchParams } from "next/navigation";
import useBlockContent from "@/lib/swr/use-block-content";

const MyCustomShapes = [CustomArrowShapeUtil];

function InsideOfContext() {
	// const editor = useEditor()
  // const {document, session} = getSnapshot(editor.store)
  // // console.log(`doc: ${JSON.stringify(document, null, 2)}`)
  // // console.log(`session: ${JSON.stringify(session, null, 2)}`)
	// // your editor code here
	// return null // or whatever
  const searchParams = useSearchParams()
  const {blocks} = useBlockContent(searchParams.get('page') ?? '')
  let shapes: Array<TLShapePartial> = [];
  blocks?.map((block) => {
    if (block.type == 'tlshape') {
      block.properties.id = createShapeId(block.id)
      shapes.push(block.properties)
    }
  })

  console.log(`shapes: ${JSON.stringify(shapes, null, 2)}`)

  const editor = useEditor()
  if (blocks) {
    editor.createShapes(shapes)
  }
  const unlisten = editor.store.listen(
    (update) => {
      console.log('snapshot', JSON.stringify(getSnapshot(editor.store), null, 2))
      localStorage.setItem('my-editor-snapshot', JSON.stringify(getSnapshot(editor.store)))
    },
    { scope: 'document', source: 'user' }
  )
  return null
}

export default function TldrawCanvas() {

	const [store] = useState(() => {
		// const stringified = localStorage.getItem('my-editor-snapshot')
    const stringified = null
    if (!stringified) {
      return createTLStore({
        shapeUtils: [...defaultShapeUtils, ...MyCustomShapes]
    })
    }

		// Create the store
		const newStore = createTLStore({shapeUtils: [...defaultShapeUtils, ...MyCustomShapes]})

		// Get the snapshot
    // console.log(`stringified: ${stringified}`)
    if (!stringified) {
      return newStore
    }
		const snapshot = JSON.parse(stringified)

		// Load the snapshot
		loadSnapshot(newStore, snapshot)
		return newStore
	})



  return (
    <div className="h-full w-full">
    <Tldraw
      shapeUtils={MyCustomShapes}
      // onMount={(editor) => {
      //   editor.createShapes([{ type: "custom-arrow", x: 100, y: 100 }]);
      // }}
      store={store}
    >
      <InsideOfContext />
      </Tldraw>
    </div>
  );
}

