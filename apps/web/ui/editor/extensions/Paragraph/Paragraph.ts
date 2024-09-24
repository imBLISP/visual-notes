import { Paragraph } from '@tiptap/extension-paragraph'
import { mergeAttributes } from '@tiptap/core'

export const Selection = Paragraph.extend({
    renderHTML({ HTMLAttributes }) {
        const { editor } = this
        const isEditable = editor?.isEditable
        let show = false
        if (editor?.isInitialized) {
            console.log("editor is initialized")
            const json = editor?.getJSON()
            if (json?.content?.length === 1) {
                show = true
            }
        }

        return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
            class: !isEditable && !show ? "hidden" : ""
        }), 0]
    },
})

export default Selection
