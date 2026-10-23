<template>
  <!-- eslint-disable-next-line vue/no-v-html -- html is built from the editor schema, text is escaped -->
  <div class="viewer" v-html="html" />
</template>

<script setup lang="ts">
import type { JSONContent } from '@tiptap/vue-3';
import { renderToHTMLString } from '@tiptap/static-renderer';

const props = defineProps<{ content?: JSONContent }>();

const html = computed(() =>
  props.content ? renderToHTMLString({ extensions: editorExtensions, content: props.content }) : ''
);
</script>

<style lang="less">
.viewer {
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
