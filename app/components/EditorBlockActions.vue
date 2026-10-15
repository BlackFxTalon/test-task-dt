<template>
  <div class="actions">
    <EditorBlockMenu :blocks="blocks" />
    <span class="actions__drag" @pointerdown="drag?.start">
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
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'

const props = defineProps<{
  blocks: { label: string; isActive: () => boolean; run: () => unknown }[]
  editor?: Editor
}>()

const drag = props.editor ? useBlockTouchDrag(props.editor) : undefined
</script>

<style scoped lang="less">
.actions {
  display: flex;
  gap: 10px;

  &__drag {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-editor-button);
    background: var(--color-bg);
    color: var(--color-text);
    touch-action: none;
  }
}
</style>
