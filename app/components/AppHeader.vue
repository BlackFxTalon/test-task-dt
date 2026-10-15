<template>
  <header class="header">
    <div class="header__content">
      <NuxtLink to="/" class="header__logo">
        <img src="/logo.svg" alt="Моя планета" />
      </NuxtLink>
      <NuxtLink to="/materials/new" class="header__create" aria-label="Создать историю">
        <span class="header__create-text">Создать историю</span>
        <svg class="header__create-icon" viewBox="0 0 28 28" width="28" height="28" aria-hidden="true">
          <path d="M14 5v18M5 14h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
        </svg>
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped lang="less">
@import '../assets/styles/breakpoints.less';

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  height: var(--header-height);
  background: var(--color-white);

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    max-width: var(--container-header);
    margin: 0 auto;
    padding: 0 var(--header-padding);
  }

  &__logo img {
    height: 44px;
  }

  &__create {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    padding: 13px 24px;
    border-radius: var(--radius-button);
    background: var(--color-button);
    color: var(--color-accent);
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-button);
    transition: background-color 0.2s;

    &:hover,
    &:active {
      background: var(--color-button-hover);
    }
  }

  &__create-icon {
    display: none;
  }
}

@media (max-width: @breakpoint-mobile) {
  .header__logo img {
    height: 36px;
  }

  .header__create {
    width: 48px;
    height: 48px;
    padding: 10px 14px;
  }

  .header__create-text {
    display: none;
  }

  .header__create-icon {
    display: block;
  }
}
</style>
