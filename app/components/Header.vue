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
            <Icon name="plus" />
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
