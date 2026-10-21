import StarterKit from '@tiptap/starter-kit';

export const HEADING_LEVELS = [1, 2, 3] as const;

export const editorExtensions = [
  StarterKit.configure({
    heading: { levels: [...HEADING_LEVELS] },
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
];
