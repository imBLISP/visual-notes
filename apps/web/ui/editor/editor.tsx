import { EditorContent } from '@tiptap/react'
import React, { useRef, useEffect, useCallback, useMemo } from 'react'

import { LinkMenu } from './components/menus/LinkMenu'
import { useBlockEditor } from './useBlockEditor'
import useBlock from '@/lib/swr/use-block'

import '@/ui/editor/styles/index.css'

import ImageBlockMenu from './extensions/ImageBlock/components/ImageBlockMenu'
import { ColumnsMenu } from './extensions/MultiColumn/menus'
import { TableColumnMenu, TableRowMenu } from './extensions/Table/menus'
import { TextMenu } from './components/menus/TextMenu'
import { ContentItemMenu } from './components/menus/ContentItemMenu'
import * as Y from 'yjs'
import { TiptapCollabProvider } from '@hocuspocus/provider'

export const BlockEditor = ({
  initialContent,
  readOnlyContent,
  noteId,
  aiToken,
  ydoc,
  provider,
  readOnly = false,
  className
}: {
  initialContent?: any
  readOnlyContent?: any
  noteId: string | null
  aiToken?: string
  hasCollab: boolean
  ydoc: Y.Doc
  provider?: TiptapCollabProvider | null | undefined
  readOnly?: boolean
  className?: string
}) => {
  const menuContainerRef = useRef(null)

  // fetch the intial content from database 
  const { editor } = useBlockEditor({ aiToken, ydoc, provider, initialContent, readOnlyContent, noteId, readOnly, className})


  if (!editor || !noteId) {
    return null
  }

  return (
    <div className="flex h-full" ref={menuContainerRef}>
      <div className="relative flex flex-col flex-1 h-full">
        {!readOnly && (
          <>
            <ContentItemMenu editor={editor} />
            <LinkMenu editor={editor} appendTo={menuContainerRef} />
            <TextMenu editor={editor} />
            <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
            <TableRowMenu editor={editor} appendTo={menuContainerRef} />
            <TableColumnMenu editor={editor} appendTo={menuContainerRef} /> 
            <ImageBlockMenu editor={editor} appendTo={menuContainerRef} /> 
          </>
        )}
        <EditorContent 
          editor={editor} 
          className="flex-1"
        />
      </div>
    </div>
  )
}

export default BlockEditor
