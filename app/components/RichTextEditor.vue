<template>
  <div v-if="editor">
    <div class="editor">
      <DragHandle :editor="editor" class="editor__handle">
        <EditorBlockActions :blocks="blocks" />
      </DragHandle>
      <EditorContent :editor="editor" />
    </div>
    <EditorBlockActions class="editor__add" :blocks="blocks" :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { Placeholder } from '@tiptap/extensions'
import { DragHandle } from '@tiptap/extension-drag-handle-vue-3'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const props = defineProps<{ placeholder?: string }>()
const html = defineModel<string>('html', { default: '' })
const json = defineModel<Record<string, unknown>>('json')

const editor = useEditor({
  content: html.value,
  extensions: [...editorExtensions, Placeholder.configure({ placeholder: props.placeholder })],
  onUpdate: ({ editor }) => {
    html.value = editor.getHTML()
    json.value = editor.getJSON()
  }
})

const blocks = computed(() => {
  const current = editor.value
  if (!current) return []

  const headings = ([1, 2, 3] as const).map((level) => ({
    label: `Заголовок ${level}`,
    isActive: () => current.isActive('heading', { level }),
    run: () => current.chain().focus().toggleHeading({ level }).run()
  }))

  return [
    {
      label: 'Текст',
      isActive: () => current.isActive('paragraph'),
      run: () => current.chain().focus().setParagraph().run()
    },
    ...headings,
    {
      label: 'Цитата',
      isActive: () => current.isActive('blockquote'),
      run: () => current.chain().focus().toggleBlockquote().run()
    }
  ]
})
</script>

<style lang="less">
@import '../assets/styles/breakpoints.less';

.editor {
  position: relative;
  padding-left: var(--editor-header-indent);

  &__handle {
    padding-right: 24px;
  }

  &__add {
    display: none;
  }

  .ProseMirror {
    outline: none;

    p.is-editor-empty:first-child::before {
      content: attr(data-placeholder);
      float: left;
      height: 0;
      color: var(--color-text-placeholder);
      pointer-events: none;
      white-space: nowrap;
    }
  }
}

@media (max-width: @breakpoint-mobile) {
  .editor__handle {
    display: none;
  }

  .editor__add {
    display: block;
    margin-top: 16px;
  }
}
</style>
