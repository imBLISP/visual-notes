// import { Paragraph } from '@tiptap/extension-paragraph'
import { mergeAttributes, Node } from '@tiptap/core'

export interface ParagraphOptions {
  /**
   * The HTML attributes for a paragraph node.
   * @default {}
   * @example { class: 'foo' }
   */
  showParagraph: boolean;
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraph: {
      /**
       * Toggle a paragraph
       * @example editor.commands.toggleParagraph()
       */
      setParagraph: () => ReturnType,
    }
  }
}

/**
 * This extension allows you to create paragraphs.
 * @see https://www.tiptap.dev/api/nodes/paragraph
 */
export const Paragraph = Node.create<ParagraphOptions>({
  name: 'paragraph',

  priority: 1000,

  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [
      { tag: 'p' },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },

  addCommands() {
    return {
      setParagraph: () => ({ commands }) => {
        return commands.setNode(this.name)
      },
    }
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Alt-0': () => this.editor.commands.setParagraph(),
    }
  },
})


export const Selection = Paragraph.extend({
    renderHTML({ HTMLAttributes }) {
        // const { editor } = this
        // const isEditable = editor?.isEditable
        

        let show = true;
        // if (editor?.isInitialized) {
        //     show = editor?.state?.doc?.content?.size == 1
        // }

        // 

        return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
            // class: !isEditable && !show ? "hidden" : ""
        }), 0]
    },
})

export default Selection
