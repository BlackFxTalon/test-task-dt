<template>
  <NuxtLink to="/" class="back">
    <svg class="back__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 5l-7 7 7 7" />
    </svg>
    <span>Назад</span>
  </NuxtLink>
</template>

<style scoped lang="less">
.back {
  display: inline-flex;
  align-items: center;
  gap: var(--space-icon);
  color: var(--color-text);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-button);
  line-height: normal;
  transition: color 0.2s;

  &:hover {
    color: var(--color-accent);
  }

  &__icon {
    width: var(--icon-size-lg);
    height: var(--icon-size-lg);
  }
}
</style>
