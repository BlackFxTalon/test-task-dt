<template>
  <div class="actions">
    <EditorBlockMenu :blocks="blocks" />
  </div>
</template>

<script setup lang="ts">
import type { Editor } from '@tiptap/vue-3'

const props = defineProps<{
  blocks: { label: string; isActive: () => boolean; run: () => unknown }[]
  editor?: Editor
}>()
</script>

<style scoped lang="less">
.actions {
  display: flex;
  gap: 10px;
}
</style>
