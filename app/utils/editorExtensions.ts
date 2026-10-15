import StarterKit from '@tiptap/starter-kit'

export const editorExtensions = [
  StarterKit.configure({
    heading: { levels: [1, 2, 3] },
    bold: false,
    italic: false,
    strike: false,
    underline: false,
    code: false,
    codeBlock: false,
    bulletList: false,
    orderedList: false,
    listItem: false,
    listKeymap: false,
    horizontalRule: false,
    link: false
  })
]
