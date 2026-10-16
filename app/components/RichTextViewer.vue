<template>
  <EditorContent :editor="editor" class="viewer" />
</template>

<script setup lang="ts">
import { EditorContent, useEditor } from '@tiptap/vue-3';

const props = defineProps<{ content?: Record<string, unknown> }>();

const editor = useEditor({
  content: props.content,
  extensions: editorExtensions,
  editable: false
});
</script>

<style lang="less">
.viewer .ProseMirror {
  outline: none;

  > * + * {
    margin-top: 1.4em;
  }

  h1 {
    font-size: var(--font-size-h1);
  }

  h2 {
    font-size: var(--font-size-description);
  }

  h3 {
    font-family: var(--font-family-heading);
    font-weight: var(--font-weight-heading);
    font-size: var(--font-size-text);
  }

  blockquote {
    padding-left: var(--space-icon);
    border-left: 3px solid var(--color-accent);
  }
}
</style>
