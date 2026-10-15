<template>
  <header class="header">
    <div class="header__content">
      <NuxtLink to="/" class="header__logo">
        <img src="/logo.svg" alt="Моя планета" />
      </NuxtLink>
      <div id="header-action">
        <HeaderButton v-if="route.path !== '/materials/create'" to="/materials/create">
          Создать материал
          <template #icon>
            <svg viewBox="0 0 28 28" width="28" height="28">
              <path d="M14 5v18M5 14h18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </template>
        </HeaderButton>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const route = useRoute()
</script>

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
}

@media (max-width: @breakpoint-mobile) {
  .header__logo img {
    height: 36px;
  }
}
</style>
