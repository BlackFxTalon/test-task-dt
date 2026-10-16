<template>
  <div class="menu">
    <button type="button" class="menu__button" @click="isOpen = !isOpen">
      <Icon name="add" class="menu__icon menu__icon--desktop" />
      <Icon name="plus" class="menu__icon menu__icon--mobile" />
    </button>
    <ul v-if="isOpen" class="menu__list">
      <li v-for="block in blocks" :key="block.label">
        <button
          type="button"
          class="menu__item"
          :class="{ 'menu__item--active': block.isActive() }"
          @click="select(block)"
        >
          {{ block.label }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Block {
  label: string
  isActive: () => boolean
  run: () => unknown
}

defineProps<{ blocks: Block[] }>();

const isOpen = ref(false);

const select = (block: Block) => {
  block.run();
  isOpen.value = false;
};
</script>

<style scoped lang="less">
@import '../assets/styles/breakpoints.less';

.menu {
  position: relative;

  &__button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 0;
    border: 0;
    border-radius: var(--radius-editor-button);
    background-color: var(--color-bg);
    color: var(--color-icon);
    cursor: pointer;
  }

  &__icon--mobile {
    display: none;
    width: var(--icon-size-lg);
    height: var(--icon-size-lg);
    color: var(--color-text);
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1;
    min-width: 160px;
    margin: 4px 0 0;
    padding: 4px;
    list-style: none;
    border-radius: var(--radius-editor-button);
    background-color: var(--color-white);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  &__item {
    width: 100%;
    padding: 6px 12px;
    border: 0;
    border-radius: var(--radius-editor-button);
    background-color: transparent;
    text-align: left;
    cursor: pointer;

    &:hover,
    &--active {
      background-color: var(--color-bg);
    }
  }
}

@media (max-width: @breakpoint-mobile) {
  .menu__icon--desktop {
    display: none;
  }

  .menu__icon--mobile {
    --icon-size: 12px;
    display: block;
    width: var(--icon-size);
    height: var(--icon-size);
  }

  .menu__list {
    position: fixed;
    top: auto;
    right: 16px;
    bottom: 16px;
    left: 16px;
    padding: 8px;
    border-radius: var(--radius-editor);
  }
}
</style>
