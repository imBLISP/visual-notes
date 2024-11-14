'use client'

import { HocuspocusProvider } from '@hocuspocus/provider'

import { API } from '@/ui/editor/lib/api'

import {
  BlockquoteFigure,
  CharacterCount,
  CodeBlock,
  Color,
  Details,
  DetailsContent,
  DetailsSummary,
  Document,
  Dropcursor,
  Emoji,
  Figcaption,
  FileHandler,
  Focus,
  FontFamily,
  FontSize,
  Heading,
  Highlight,
  HorizontalRule,
  ImageBlock,
  Link,
  Placeholder,
  Selection,
  SlashCommand,
  StarterKit,
  Subscript,
  Superscript,
  Table,
  TableOfContents,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign,
  TextStyle,
  TrailingNode,
  Typography,
  Underline,
  emojiSuggestion,
  Columns,
  Column,
  // Paragraph,
  TaskItem,
  TaskList,
} from '.'
import Paragraph from './Paragraph/Paragraph'
import { DragHandle } from '@tiptap-pro/extension-drag-handle-react'

import { ImageUpload } from './ImageUpload'
import { TableOfContentsNode } from './TableOfContentsNode'

interface ExtensionKitProps {
  provider?: HocuspocusProvider | null
  readOnly?: boolean
  showParagraph?: boolean
  upload: (dataUrl: string, fileName: string, file : File | null) => Promise<string>
  compressImage: (file: File | null, quality?: number, width?: number, height?: number) => Promise<unknown>
}

export const ExtensionKit = ({ provider, readOnly, showParagraph, upload, compressImage }: ExtensionKitProps) => [
  Document,
  Columns,
  TaskList,
  TaskItem.configure({
    nested: true,
  }),
  Column,
  Selection,
  Heading.configure({
    levels: [1, 2, 3, 4, 5, 6],
    HTMLAttributes: {
      class: 'm-0 p-0',
    },
  }),
  Paragraph.configure({
    showParagraph: showParagraph == undefined ? true : showParagraph,
    HTMLAttributes: {
      class: readOnly ? '!my-0' : '!my-2',
    },
  }),
  HorizontalRule,
  StarterKit.configure({
    document: false,
    dropcursor: false,
    heading: false,
    horizontalRule: false,
    blockquote: false,
    history: false,
    paragraph: false,
    codeBlock: false,
  }),
  Details.configure({
    persist: true,
    HTMLAttributes: {
      class: 'details',
    },
  }),
  DetailsContent,
  DetailsSummary,
  CodeBlock.configure({
    HTMLAttributes: {
      class: '!m-0 p-0 !bg-[#f7f6f3] border-none !text-stone-800',
    },
  }),
  TextStyle,
  FontSize,
  FontFamily,
  Color,
  TrailingNode,
  Link.configure({
    openOnClick: false,
  }),
  Highlight.configure({ multicolor: true }),
  Underline,
  CharacterCount.configure({ limit: 50000 }),
  TableOfContents,
  TableOfContentsNode,
  ImageUpload.configure({
    clientId: provider?.document?.clientID,
  }),
  ImageBlock,
  FileHandler.configure({
    allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
    onDrop: async function (currentEditor, files, pos) {
      files.forEach(async function (file) {
        console.log("@FileHandler: onDrop", file)
        const compressedImage = await compressImage(file, 0.8);
        console.log("@FileHandler: onDrop", files, compressedImage)
        const url = await upload(compressedImage as string, file.name, null);
        console.log("@FileHandler: onDrop", url)
        // const url = await API.uploadImage(file)
        // const url = ""

        currentEditor.chain().setImageBlockAt({ pos, src: url }).focus().run()
      })
    },
    onPaste: (currentEditor, files) => {
      files.forEach(async file => {
        const url = await API.uploadImage(file)

        return currentEditor
          .chain()
          .setImageBlockAt({ pos: currentEditor.state.selection.anchor, src: url })
          .focus()
          .run()
      })
    },
  }),
  Emoji.configure({
    enableEmoticons: true,
    suggestion: emojiSuggestion,
  }),
  TextAlign.extend({
    addKeyboardShortcuts() {
      return {}
    },
  }).configure({
    types: ['heading', 'paragraph'],
  }),
  Subscript,
  Superscript,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  Typography,
  Placeholder.configure({
    includeChildren: true,
    showOnlyCurrent: false,
    placeholder: () => '',
  }),
  SlashCommand,
  Focus,
  Figcaption,
  BlockquoteFigure,
  Dropcursor.configure({
    width: 2,
    class: 'ProseMirror-dropcursor border-black',
  })
]

export default ExtensionKit
