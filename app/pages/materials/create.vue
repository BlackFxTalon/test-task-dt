<template>
  <section class="page">
    <BackLink class="page__back" />
    <h1 class="page__title">Создание материала</h1>
    <form id="material-form" class="editor-box" novalidate @submit.prevent="submit">
      <div class="editor-box__header">
        <div class="field">
          <input
            v-model="form.title"
            class="field__input field__input--title"
            placeholder="Введите заголовок"
            :maxlength="TITLE_MAX"
          />
          <span class="field__counter">{{ counters.title }}/{{ TITLE_MAX }}</span>
          <span v-if="errors.title" class="field__error">{{ errors.title }}</span>
        </div>
        <div class="field">
          <textarea
            v-model="form.short_description"
            class="field__input field__input--description"
            placeholder="Введите краткое описание..."
            rows="2"
            :maxlength="DESCRIPTION_MAX"
          />
          <span class="field__counter">{{ counters.short_description }}/{{ DESCRIPTION_MAX }}</span>
          <span v-if="errors.short_description" class="field__error">
            {{ errors.short_description }}
          </span>
        </div>
        <div class="field">
          <input v-model="form.datetime" type="datetime-local" class="field__input field__input--date" />
          <span v-if="errors.datetime" class="field__error">{{ errors.datetime }}</span>
        </div>
      </div>
      <div class="field">
        <RichTextEditor
          v-model:html="form.description_html"
          v-model:json="form.description_json"
          placeholder="Введите текст..."
        />
        <span v-if="errors.description_html" class="field__error">{{ errors.description_html }}</span>
      </div>
      <p v-if="submitError" class="field__error">{{ submitError }}</p>
    </form>

    <ClientOnly>
      <Teleport to="#header-action">
        <HeaderButton form="material-form" :loading="saving">
          Сохранить
          <template #icon>
            <svg viewBox="0 0 28 28" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M24 4L12 16M24 4l-7 20-5-8-8-5 20-7z" />
            </svg>
          </template>
        </HeaderButton>
      </Teleport>
    </ClientOnly>
  </section>
</template>

<script setup lang="ts">
import { DESCRIPTION_MAX, TITLE_MAX } from '~/constants/material'

const { form, errors, counters, validate, toDraft } = useMaterialForm()
const { create } = useMaterials()

const saving = ref(false)
const submitError = ref('')

const submit = async () => {
  if (!validate()) return

  saving.value = true
  submitError.value = ''
  let material: IMaterial
  try {
    material = await create(toDraft())
  } catch {
    submitError.value = 'Не удалось сохранить материал. Попробуйте ещё раз'
    return
  } finally {
    saving.value = false
  }

  await navigateTo(`/materials/${material.id}`)
}
</script>

<style scoped lang="less">
@import '../../assets/styles/breakpoints.less';

.page {
  max-width: var(--container-content);
  margin: 0 auto;
  padding: var(--space-page-top) var(--space-page);

  &__back {
    margin-bottom: var(--space-create-back);
  }

  &__title {
    margin-bottom: var(--space-page-gap);
  }
}

.editor-box {
  display: flex;
  flex-direction: column;
  gap: var(--space-editor-block);
  min-height: var(--editor-min-height);
  padding: var(--editor-padding-y) var(--editor-padding-x);
  border-radius: var(--radius-editor);
  background: var(--color-white);

  &__header {
    display: flex;
    flex-direction: column;
    gap: var(--space-detail-header);
    padding-left: var(--editor-header-indent);
  }
}

.field {
  display: flex;
  flex-direction: column;
  gap: 4px;

  &__input {
    width: 100%;
    padding: 0;
    border: 0;
    outline: none;
    background: transparent;
    resize: none;
    color: var(--color-text);

    &::placeholder {
      color: var(--color-text-placeholder);
    }

    &--title {
      font-family: var(--font-family-heading);
      font-weight: var(--font-weight-heading);
      font-size: var(--font-size-h1);
      line-height: var(--line-height-heading);
    }

    &--description {
      font-weight: var(--font-weight-medium);
      font-size: var(--font-size-description);
      line-height: var(--line-height-heading);
    }

    &--date {
      width: auto;
      align-self: flex-start;
      color: var(--color-text-muted);
      font-size: var(--font-size-card-text);
    }
  }

  &__counter {
    align-self: flex-end;
    color: var(--color-text-placeholder);
    font-size: var(--font-size-card-text);
  }

  &__error {
    color: var(--color-error);
    font-size: var(--font-size-card-text);
  }
}

@media (max-width: @breakpoint-mobile) {
  .page__back {
    display: none;
  }
}
</style>
