<template>
  <div v-if="editor" class="editor">
    <div class="editor__actions">
      <div class="editor__menu">
        <button type="button" class="editor__action" @click="isMenuOpen = !isMenuOpen">
          <svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <path d="M10 4v12M4 10h12" />
          </svg>
        </button>
        <ul v-if="isMenuOpen" class="editor__list">
          <li v-for="block in blocks" :key="block.label">
            <button
              type="button"
              class="editor__item"
              :class="{ 'editor__item--active': block.isActive() }"
              @click="select(block)"
            >
              {{ block.label }}
            </button>
          </li>
        </ul>
      </div>
      <span class="editor__action">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <circle cx="9" cy="6" r="1.2" />
          <circle cx="15" cy="6" r="1.2" />
          <circle cx="9" cy="12" r="1.2" />
          <circle cx="15" cy="12" r="1.2" />
          <circle cx="9" cy="18" r="1.2" />
          <circle cx="15" cy="18" r="1.2" />
        </svg>
      </span>
    </div>
    <EditorContent :editor="editor" class="editor__content" />
  </div>
</template>

<script setup lang="ts">
import { Placeholder } from '@tiptap/extensions'
import { EditorContent, useEditor } from '@tiptap/vue-3'

const props = defineProps<{ placeholder?: string }>()
const html = defineModel<string>('html', { default: '' })
const json = defineModel<Record<string, unknown>>('json')

const isMenuOpen = ref(false)

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

const select = (block: { run: () => unknown }) => {
  block.run()
  isMenuOpen.value = false
}
</script>

<style lang="less">
@import '../assets/styles/breakpoints.less';

.editor {
  display: flex;
  align-items: flex-start;
  gap: 24px;

  &__actions {
    display: flex;
    flex-shrink: 0;
    gap: 10px;
    margin-top: -2px;
  }

  &__menu {
    position: relative;
  }

  &__action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-editor-button);
    background: var(--color-bg);
    color: var(--color-text);
  }

  button.editor__action {
    cursor: pointer;
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    min-width: 160px;
    margin: 4px 0 0;
    padding: 4px;
    list-style: none;
    border-radius: var(--radius-editor-button);
    background: var(--color-white);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  &__item {
    width: 100%;
    padding: 6px 12px;
    border: 0;
    border-radius: var(--radius-editor-button);
    background: transparent;
    text-align: left;
    cursor: pointer;

    &:hover,
    &--active {
      background: var(--color-bg);
    }
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  .ProseMirror {
    min-height: 200px;
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
  .editor {
    gap: 0;

    &__actions {
      display: none;
    }
  }
}
</style>
