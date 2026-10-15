<template>
  <section class="page">
    <BackLink class="page__back" />
    <article class="material">
      <header class="material__header">
        <div class="material__date">
          <Icon name="calendar" class="material__icon" />
          <span>{{ formatDate(material.datetime) }}</span>
        </div>
        <h1>{{ material.title }}</h1>
        <p class="material__description">{{ material.short_description }}</p>
      </header>
      <RichTextViewer :content="material.description_json" />
    </article>
  </section>
</template>

<script setup lang="ts">
const route = useRoute()
const { load, findById } = useMaterials()

await load()
const material = findById(String(route.params.id))

if (!material) {
  throw createError({ statusCode: 404 })
}
</script>

<style scoped lang="less">
.page {
  max-width: calc(var(--container-content) + 2 * var(--space-page));
  margin: 0 auto;
  padding: var(--space-page-top) var(--space-page);

  &__back {
    margin-bottom: var(--space-page-gap);
  }
}

.material {
  display: flex;
  flex-direction: column;
  gap: var(--space-detail-block);
  padding: var(--detail-padding-y) var(--detail-padding-x);
  border-radius: var(--radius-detail);
  background-color: var(--color-white);

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--space-detail-header);
  }

  &__date {
    display: flex;
    align-items: center;
    gap: var(--space-icon);
    color: var(--color-text-placeholder);
    font-weight: var(--font-weight-date);
    font-size: var(--font-size-date);
  }

  &__icon {
    width: var(--icon-size-lg);
    height: var(--icon-size-lg);
  }

  &__description {
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-description);
    line-height: var(--line-height-heading);
  }
}
</style>
