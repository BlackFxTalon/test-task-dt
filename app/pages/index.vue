<template>
  <section class="page">
    <h1 class="page__title">Материалы</h1>
    <p v-if="error">Не удалось загрузить материалы</p>
    <p v-else-if="!materials.length">Материалов пока нет</p>
    <div v-else class="page__grid">
      <MaterialCard v-for="material in materials" :key="material.id" :material="material" />
    </div>
  </section>
</template>

<script setup lang="ts">
useHead({ title: 'Материалы' });

const { materials, load } = useMaterials();
const error = ref(false);

try {
  await load();
} catch {
  error.value = true;
}
</script>

<style scoped lang="less">
.page {
  --container: var(--container-list);

  &__title {
    margin-bottom: var(--space-page-gap);
  }

  &__grid {
    display: grid;
    justify-content: center;
    grid-template-columns: repeat(auto-fill, var(--card-width));
    gap: var(--space-grid);
  }
}
</style>
