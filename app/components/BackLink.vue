<template>
  <NuxtLink to="/" class="back">
    <Icon name="arrow-left" class="back__icon" />
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
    padding-top: 3px;
  }
}
</style>
