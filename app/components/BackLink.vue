<template>
  <NuxtLink to="/" class="back">
    <svg class="back__icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9.56994 18.82C9.37994 18.82 9.18994 18.75 9.03994 18.6L2.96994 12.53C2.67994 12.24 2.67994 11.76 2.96994 11.47L9.03994 5.4C9.32994 5.11 9.80994 5.11 10.0999 5.4C10.3899 5.69 10.3899 6.17 10.0999 6.46L4.55994 12L10.0999 17.54C10.3899 17.83 10.3899 18.31 10.0999 18.6C9.95994 18.75 9.75994 18.82 9.56994 18.82Z" fill="#14142A"/>
    <path d="M20.4999 12.75H3.66994C3.25994 12.75 2.91994 12.41 2.91994 12C2.91994 11.59 3.25994 11.25 3.66994 11.25H20.4999C20.9099 11.25 21.2499 11.59 21.2499 12C21.2499 12.41 20.9099 12.75 20.4999 12.75Z" fill="#14142A"/>
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

  &:hover .back__icon path {
    fill: var(--color-accent);
  }

  &__icon {
    width: var(--icon-size-lg);
    height: var(--icon-size-lg);
    padding-top: 3px;
  }

  &__icon path {
    transition: fill 0.2s;
  }
}
</style>
