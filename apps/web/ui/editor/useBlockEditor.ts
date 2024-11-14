"use client"

import { useEffect, useRef, useState } from 'react'
import { useEditor, useEditorState } from '@tiptap/react'
import deepEqual from 'fast-deep-equal'
import type { AnyExtension, Editor, JSONContent } from '@tiptap/core'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { TiptapCollabProvider, WebSocketStatus } from '@hocuspocus/provider'
import { v4 as uuidv4 } from "uuid";
import type { Doc as YDoc } from 'yjs'
import { usePathname } from "next/navigation";
import { ExtensionKit } from '@/ui/editor/extensions/extension-kit'
import { userColors, userNames } from '@/ui/editor/lib/constants'
import { randomElement } from '@/ui/editor/lib/utils'
import type { EditorUser } from '@/ui/editor/types'
import UniqueID from '@tiptap-pro/extension-unique-id'
import { Content } from '@tiptap/core'
import updateEditorContent from '@/lib/transactions/update-editor-content'
import useBlocksStore from '@/lib/zustand/transactionQueue'
import updateBlock from '@/lib/transactions/update-block'
import { debounce, isEqual } from 'lodash'
import { useCallback } from 'react'
import useBlock from '@/lib/swr/use-block'
import useBlockSnapshot from '@/lib/swr/use-block-snapshot'
import { uploadFile } from '@/lib/uploadThing/uploadImage'

import { getContentDiff } from '@/ui/editor/lib/data/serializeOperations'

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = ({
  initialContent,
  readOnlyContent,
  noteId,
  aiToken,
  ydoc,
  provider,
  userId,
  userName = 'Maxi',
  readOnly = false,
  className,
}: {
  initialContent: Content;
  readOnlyContent: Content;
  noteId: string | null;
  aiToken?: string
  ydoc: YDoc
  provider?: TiptapCollabProvider | null | undefined
  userId?: string
  userName?: string
  readOnly?: boolean
  className?: string,
}) => {
  // HOOKS
  // const { mutate: mutateNote, block: note, loading: noteLoading} = useBlock(noteId)
  const { mutate: mutateSnapshot } = useBlockSnapshot(noteId)
  const { upload, compressImage } = uploadFile();
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    provider ? WebSocketStatus.Connecting : WebSocketStatus.Disconnected,
  )

  const updateEditorContent = async function (content: JSONContent, noteId: string | null) {
    if (!noteId) return;
    console.log("@useBlockEditor: note inside updateEditorContent", noteId, content);

    await mutateSnapshot(async () => {
      const res = await fetch(`/api/blocks/${noteId}/snapshot`, {
        method: "POST",
        body: JSON.stringify({
          snapshot: content
        }),
      })
      console.log("@useBlockEditor: updateEditorContent: res", JSON.stringify(await res.json()));
      return { snapshot: content }
    }, {
      optimisticData: { snapshot: content },
      revalidate: false,
    });

    // const transaction = updateBlock({
    //   snapshot: content
    // }, noteId)

    // const updatedContent = {
    //   ...note,
    //   snapshot: content
    // }

    // console.log("@useBlockEditor: updateEditorContent", updatedContent);

    // This is causing note title editor to show old title
    // await mutateNote(updatedContent, {
    //   revalidate: false,
    // })

    // const res = await fetch(`/api/saveTransactions`, {
    //   method: "POST",
    //   body: JSON.stringify(transaction),
    // })
  }

  // const debouncedUpdateEditorContent = debounce(updateEditorContent, 1000)

  // useEffect(() => {
  //   if (!readOnly && noteId) {
  //     enableTransaction.current = false
  //     editor?.commands.setContent(initialContent)
  //     enableTransaction.current = true
  //   }
  // }, [noteId])


  // useEffect(() => {
  //   if (readOnly) {
  //     editor?.commands.setContent(readOnlyContent)
  //     // 
  //   }
  // }, [readOnlyContent])

  const debouncedUpdateEditorContent = useCallback(debounce(updateEditorContent, 2000), [])
  // 
  const shouldShowParagraph = readOnlyContent?.content?.length == 1 && readOnlyContent?.content[0]?.type == "paragraph"
  // console.log("@useBlockEditor: note outside", note);
  
  const editor =  useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      editable: !readOnly,
      autofocus: !readOnly,
      content: readOnly ? readOnlyContent : initialContent,

      onBeforeCreate({ editor }) {
      },
      onUpdate({ editor }) {
      },
      onSelectionUpdate({ editor }) {
      },
      onTransaction({ editor, transaction }) {
        // console.log("@useBlockEditor: onTransactionCalled");
        if (!readOnly) {
          const content = editor.getJSON()
          debouncedUpdateEditorContent(content, noteId)
        }
      },
      onFocus({ editor, event }) {
      },
      onBlur({ editor, event }) {
      },
      onDestroy() {
      },
      onContentError({ editor, error, disableCollaboration }) {
      },
      onCreate: ctx => {
      },
      extensions: [
        ...ExtensionKit({
          provider: provider,
          readOnly: readOnly,
          showParagraph: shouldShowParagraph,
          upload: upload,
          compressImage: compressImage,
        }),
        // provider
        //   ? Collaboration.configure({
        //     document: ydoc,
        //   })
        //   : undefined,
        // provider
        //   ? CollaborationCursor.configure({
        //     provider,
        //     user: {
        //       name: randomElement(userNames),
        //       color: randomElement(userColors),
        //     },
        //   })
        //   : undefined,
        UniqueID.configure({
          attributeName: 'uid',
          types: ['heading', 'paragraph', 'bulletList', 'orderedList', 'codeBlock', 'imageBlock', ''],
          generateID: () => uuidv4()
        }),
      ].filter((e): e is AnyExtension => e !== undefined),
      editorProps: {
        attributes: {
          autocomplete: 'off',
          autocorrect: 'off',
          autocapitalize: 'off',
          class: `min-h-full p-0 !py-0 ${readOnly ? '!ml-0 !p-0' : '!ml-12 !mr-12'} ${className}`,
        },
      },
    },
    [noteId],
  )

  window.editor = editor

  return { editor }
}
