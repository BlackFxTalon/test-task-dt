<template>
  <svg
    :width="icon.size"
    :height="icon.size"
    :viewBox="`0 0 ${icon.size} ${icon.size}`"
    fill="currentColor"
  >
    <path v-for="path in icon.paths" :key="path" :d="path" />
  </svg>
</template>

<script setup lang="ts">
import { icons, type IconName } from '~/constants/icons';

const props = defineProps<{ name: IconName }>();

const icon = computed(() => icons[props.name]);
</script>
