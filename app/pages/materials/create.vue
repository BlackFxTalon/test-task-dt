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
            id="textarea-description"
            :maxlength="DESCRIPTION_MAX"
          />
          <span class="field__counter">{{ counters.short_description }}/{{ DESCRIPTION_MAX }}</span>
          <span v-if="errors.short_description" class="field__error">
            {{ errors.short_description }}
          </span>
        </div>
        <div class="field">
          <label class="field__date">
            <IconCalendar class="field__icon" />
            <input v-model="form.datetime" type="datetime-local" class="field__input field__input--date" />
          </label>
          <span v-if="errors.datetime" class="field__error">{{ errors.datetime }}</span>
        </div>
      </div>
      <div class="field">
        <RichTextEditor
          v-model:html="form.description_html"
          v-model:json="form.description_json"
          placeholder="Введите текст..."
        />
        <span v-if="errors.description_html" class="field__error field__error--description-html">{{ errors.description_html }}</span>
      </div>
      <p v-if="submitError" class="field__error">{{ submitError }}</p>
    </form>

    <ClientOnly>
      <Teleport to="#header-action">
        <HeaderButton form="material-form" :loading="saving">
          <template #text>Сохранить</template>
          <template #icon>
            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.8133 22.4862C12.4367 22.4862 10.4883 21.5178 8.94833 16.8862L8.10833 14.3662L5.58833 13.5262C0.968333 11.9862 0 10.0378 0 8.66118C0 7.29618 0.968333 5.33618 5.58833 3.78451L15.4933 0.482848C17.9667 -0.345485 20.0317 -0.100485 21.3033 1.15951C22.575 2.41951 22.82 4.49618 21.9917 6.96951L18.69 16.8745C17.1383 21.5178 15.19 22.4862 13.8133 22.4862ZM6.13667 5.45285C2.89333 6.53785 1.73833 7.82118 1.73833 8.66118C1.73833 9.50118 2.89333 10.7845 6.13667 11.8578L9.07667 12.8378C9.33333 12.9195 9.54333 13.1295 9.625 13.3862L10.605 16.3262C11.6783 19.5695 12.9733 20.7245 13.8133 20.7245C14.6533 20.7245 15.9367 19.5695 17.0217 16.3262L20.3233 6.42118C20.9183 4.62451 20.8133 3.15451 20.055 2.39618C19.2967 1.63785 17.8267 1.54452 16.0417 2.13951L6.13667 5.45285Z" fill="#00B2FF"/>
            <path d="M9.01833 14.0512C8.79667 14.0512 8.575 13.9695 8.4 13.7945C8.06167 13.4562 8.06167 12.8962 8.4 12.5578L12.5767 8.36951C12.915 8.03118 13.475 8.03118 13.8133 8.36951C14.1517 8.70785 14.1517 9.26785 13.8133 9.60618L9.63667 13.7945C9.47333 13.9695 9.24 14.0512 9.01833 14.0512Z" fill="#00B2FF"/>
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
  background-color: var(--color-white);

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
    background-color: transparent;
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
      color: var(--color-text-muted);
      font-size: var(--font-size-card-text);

      &::-webkit-calendar-picker-indicator {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        cursor: pointer;
      }
    }
  }

  &__date {
    position: relative;
    display: flex;
    align-items: center;
    align-self: flex-start;
    gap: var(--space-icon);
  }

  &__icon {
    width: var(--icon-size);
    height: var(--icon-size);
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

  &__error--description-html {
      padding-left: var(--editor-header-indent);
  }
}
</style>
