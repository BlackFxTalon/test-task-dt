import { DESCRIPTION_MAX, TITLE_MAX } from '~/constants/material'

const toLocalInputValue = (date: Date) =>
  new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString().slice(0, 16)

const isEmptyHtml = (html: string) => html.replace(/<[^>]*>/g, '').trim() === ''

export const useMaterialForm = () => {
  const form = reactive({
    title: '',
    short_description: '',
    datetime: toLocalInputValue(new Date()),
    description_html: '',
    description_json: {} as Record<string, unknown>
  })
  const submitted = ref(false)

  const fieldErrors = computed(() => {
    const errors: Partial<Record<keyof typeof form, string>> = {}
    const title = form.title.trim()
    const description = form.short_description.trim()

    if (!title) errors.title = 'Введите заголовок'
    else if (title.length > TITLE_MAX) errors.title = `Не более ${TITLE_MAX} символов`

    if (!description) errors.short_description = 'Введите краткое описание'
    else if (description.length > DESCRIPTION_MAX) {
      errors.short_description = `Не более ${DESCRIPTION_MAX} символов`
    }

    if (Number.isNaN(Date.parse(form.datetime))) errors.datetime = 'Укажите дату и время'
    if (isEmptyHtml(form.description_html)) errors.description_html = 'Введите текст материала'

    return errors
  })

  const errors = computed(() => (submitted.value ? fieldErrors.value : {}))
  const isValid = computed(() => Object.keys(fieldErrors.value).length === 0)

  const counters = computed(() => ({
    title: form.title.length,
    short_description: form.short_description.length
  }))

  const validate = () => {
    submitted.value = true
    return isValid.value
  }

  const toDraft = (): MaterialDraft => ({
    ...form,
    title: form.title.trim(),
    short_description: form.short_description.trim(),
    datetime: new Date(form.datetime).toISOString()
  })

  return { form, errors, counters, isValid, validate, toDraft }
}
