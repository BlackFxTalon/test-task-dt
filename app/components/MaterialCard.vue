<template>
  <NuxtLink :to="`/materials/${material.id}`" class="card">
    <div class="card__date">
      <Icon name="calendar" class="card__icon" />
      <span>{{ formatDate(material.datetime) }}</span>
    </div>
    <div class="card__content">
      <h2 class="card__title">{{ material.title }}</h2>
      <p class="card__description">{{ material.short_description }}</p>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{ material: IMaterial }>()
</script>

<style scoped lang="less">
@import '../assets/styles/breakpoints.less';

.card {
  display: flex;
  flex-direction: column;
  gap: var(--space-card-content);
  width: var(--card-width);
  padding: var(--card-padding-y) var(--card-padding-x);
  border-radius: var(--radius-card);
  background-color: var(--color-white);
  transition: filter 0.2s;

  &__date {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-text-placeholder);
    font-size: var(--font-size-card-text);
  }

  &__icon {
    width: var(--icon-size);
    height: var(--icon-size);
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-card-content);
  }

  &__title,
  &__description {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__title {
    -webkit-line-clamp: 3;
    color: var(--color-text);
  }

  &__description {
    -webkit-line-clamp: 4;
    color: var(--color-text-muted);
    font-size: var(--font-size-card-text);
    line-height: var(--line-height-card-text);
  }
}

@media (min-width: (@breakpoint-mobile + 1px)) {
  .card:hover {
    filter: var(--shadow-card-hover);
  }
}
</style>
