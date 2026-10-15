<template>
  <div v-if="editor" class="editor">
    <div class="editor__toolbar">
      <button
        v-for="action in actions"
        :key="action.label"
        type="button"
        class="editor__button"
        :class="{ 'editor__button--active': action.isActive() }"
        @click="action.run()"
      >
        {{ action.label }}
      </button>
    </div>
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3'

const html = defineModel<string>('html', { default: '' })
const json = defineModel<Record<string, unknown>>('json')

const editor = useEditor({
  content: html.value,
  extensions: editorExtensions,
  onUpdate: ({ editor }) => {
    html.value = editor.getHTML()
    json.value = editor.getJSON()
  }
})

const actions = computed(() => {
  const current = editor.value
  if (!current) return []

  const headings = ([1, 2, 3] as const).map((level) => ({
    label: `H${level}`,
    isActive: () => current.isActive('heading', { level }),
    run: () => current.chain().focus().toggleHeading({ level }).run()
  }))

  return [
    {
      label: 'P',
      isActive: () => current.isActive('paragraph'),
      run: () => current.chain().focus().setParagraph().run()
    },
    ...headings,
    {
      label: '❝',
      isActive: () => current.isActive('blockquote'),
      run: () => current.chain().focus().toggleBlockquote().run()
    }
  ]
})
</script>

<style lang="less">
.editor {
  &__toolbar {
    display: flex;
    gap: 8px;
    margin-bottom: 16px;
  }

  &__button {
    padding: 4px 12px;
    border: 1px solid var(--color-text-placeholder);
    border-radius: var(--radius-editor-button);
    background: var(--color-white);
    cursor: pointer;

    &--active {
      border-color: var(--color-accent);
      background: var(--color-button);
    }
  }

  .ProseMirror {
    min-height: 200px;
    outline: none;
  }
}
</style>
