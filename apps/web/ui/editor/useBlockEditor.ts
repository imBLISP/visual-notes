import { useEffect, useRef, useState } from 'react'
import { useEditor, useEditorState } from '@tiptap/react'
import deepEqual from 'fast-deep-equal'
import type { AnyExtension, Editor, JSONContent } from '@tiptap/core'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import { TiptapCollabProvider, WebSocketStatus } from '@hocuspocus/provider'
import { v4 as uuidv4 } from "uuid";
import type { Doc as YDoc } from 'yjs'

import { ExtensionKit } from '@/ui/editor/extensions/extension-kit'
import { userColors, userNames } from '@/ui/editor/lib/constants'
import { randomElement } from '@/ui/editor/lib/utils'
import type { EditorUser } from '@/ui/editor/types'
import { initialContent } from '@/ui/editor/lib/data/initialContent'
import UniqueID from '@tiptap-pro/extension-unique-id'

import { getContentDiff } from '@/ui/editor/lib/data/serializeOperations'

declare global {
  interface Window {
    editor: Editor | null
  }
}

export const useBlockEditor = ({
  aiToken,
  ydoc,
  provider,
  userId,
  userName = 'Maxi',
}: {
  aiToken?: string
  ydoc: YDoc
  provider?: TiptapCollabProvider | null | undefined
  userId?: string
  userName?: string
}) => {
  const [collabState, setCollabState] = useState<WebSocketStatus>(
    provider ? WebSocketStatus.Connecting : WebSocketStatus.Disconnected,
  )


  const editor = useEditor(
    {
      immediatelyRender: true,
      shouldRerenderOnTransaction: false,
      autofocus: true,

    onBeforeCreate({ editor }) {
      console.log('onBeforeCreate', editor) 
      // Before the view is created.
    },
    onUpdate({ editor }) {
      // The content has changed.
    },
    onSelectionUpdate({ editor }) {
      // The selection has changed.
    },
    onTransaction({ editor, transaction }) {
      console.log('onTransaction', editor.getJSON())
    },
    onFocus({ editor, event }) {
      // The editor is focused.
    },
    onBlur({ editor, event }) {
      // The editor isn’t focused anymore.
    },
    onDestroy() {
      // The editor is being destroyed.
    },
    onContentError({ editor, error, disableCollaboration }) {
      // The editor content does not match the schema.
    },

      onCreate: ctx => {
        if (provider && !provider.isSynced) {
          provider.on('synced', () => {
            setTimeout(() => {
              if (ctx.editor.isEmpty) {
                ctx.editor.commands.setContent(initialContent)
              }
            }, 0)
          })
        } else if (ctx.editor.isEmpty) {
          ctx.editor.commands.setContent(initialContent)
          ctx.editor.commands.focus('start', { scrollIntoView: true })
        }
      },
      extensions: [
        ...ExtensionKit({
          provider,
        }),
        provider
          ? Collaboration.configure({
              document: ydoc,
            })
          : undefined,
        provider
          ? CollaborationCursor.configure({
              provider,
              user: {
                name: randomElement(userNames),
                color: randomElement(userColors),
              },
            })
          : undefined,
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
          class: 'min-h-full',
        },
      },
    },
    [ydoc, provider],
  )
  const users = useEditorState({
    editor,
    selector: (ctx): (EditorUser & { initials: string })[] => {
      if (!ctx.editor?.storage.collaborationCursor?.users) {
        return []
      }

      return ctx.editor.storage.collaborationCursor.users.map((user: EditorUser) => {
        const names = user.name?.split(' ')
        const firstName = names?.[0]
        const lastName = names?.[names.length - 1]
        const initials = `${firstName?.[0] || '?'}${lastName?.[0] || '?'}`

        return { ...user, initials: initials.length ? initials : '?' }
      })
    },
    equalityFn: deepEqual,
  })

  useEffect(() => {
    provider?.on('status', (event: { status: WebSocketStatus }) => {
      setCollabState(event.status)
    })
  }, [provider])

  window.editor = editor

  return { editor, users, collabState }
}
