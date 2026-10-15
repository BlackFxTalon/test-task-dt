<template>
  <component
    :is="to ? NuxtLink : 'button'"
    :to="to"
    :type="to ? undefined : 'submit'"
    :disabled="loading"
    class="button"
  >
    <span v-if="loading" class="button__spinner" />
    <template v-else>
      <span class="button__text"><slot /></span>
      <span class="button__icon"><slot name="icon" /></span>
    </template>
  </component>
</template>

<script setup lang="ts">
defineProps<{ to?: string; loading?: boolean }>()

const NuxtLink = resolveComponent('NuxtLink')
</script>

<style scoped lang="less">
@import '../assets/styles/breakpoints.less';

.button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 13px 24px;
  border: 0;
  border-radius: var(--radius-button);
  background: var(--color-button);
  color: var(--color-accent);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-button);
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover:not(:disabled),
  &:active:not(:disabled) {
    background: var(--color-button-hover);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }

  &__icon {
    display: none;
  }

  &__spinner {
    width: 20px;
    height: 20px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: @breakpoint-mobile) {
  .button {
    width: 48px;
    height: 48px;
    padding: 10px 14px;

    &__text {
      display: none;
    }

    &__icon {
      display: block;
      height: 28px;
    }
  }
}
</style>
