<template>
  <header class="header">
    <div class="header__content">
      <NuxtLink to="/" class="header__logo">
        <img src="/logo.svg" alt="Моя планета" />
      </NuxtLink>
      <div id="header-action">
        <HeaderButton 
        v-if="route.path !== '/materials/create'" 
        to="/materials/create"
        >
          <template #text>
            {{ route.name === 'materials-id' ? 'Создать историю' : 'Создать материал' }}
          </template>
          <template #icon>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.875 8.75H0.875C0.396667 8.75 0 8.35333 0 7.875C0 7.39667 0.396667 7 0.875 7H14.875C15.3533 7 15.75 7.39667 15.75 7.875C15.75 8.35333 15.3533 8.75 14.875 8.75Z" fill="#00B2FF"/>
            <path d="M7.875 15.75C7.39667 15.75 7 15.3533 7 14.875V0.875C7 0.396667 7.39667 0 7.875 0C8.35333 0 8.75 0.396667 8.75 0.875V14.875C8.75 15.3533 8.35333 15.75 7.875 15.75Z" fill="#00B2FF"/>
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
  background-color: var(--color-white);

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
