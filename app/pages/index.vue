<template>
  <section class="page">
    <h1 class="page__title">Материалы</h1>
    <p v-if="loading">Загрузка...</p>
    <p v-else-if="error">Не удалось загрузить материалы</p>
    <p v-else-if="!materials.length">Материалов пока нет</p>
    <div v-else class="page__grid">
      <MaterialCard v-for="material in materials" :key="material.id" :material="material" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { materials, loading, load } = useMaterials()
const error = ref(false)

await load().catch(() => {
  error.value = true
})
</script>

<style scoped lang="less">
@import '../assets/styles/breakpoints.less';

.page {
  max-width: calc(var(--container-list) + 2 * var(--space-page));
  margin: 0 auto;
  padding: var(--space-page-top) var(--space-page);

  &__title {
    margin-bottom: var(--space-page-gap);
  }

  &__grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, var(--card-width));
    gap: var(--space-grid);
  }
}

@media (max-width: @breakpoint-mobile) {
  .page__grid {
      justify-content: center;
  }
}
</style>
