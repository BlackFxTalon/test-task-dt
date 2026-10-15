import { describe, expect, it } from 'vitest'
import { DESCRIPTION_MAX, TITLE_MAX } from '~/constants/material'

const fillValid = (form: ReturnType<typeof useMaterialForm>['form']) => {
  form.title = 'Заголовок'
  form.short_description = 'Описание'
  form.description_html = '<p>Текст</p>'
}

describe('useMaterialForm', () => {
  it('starts with current date and time', () => {
    const { form } = useMaterialForm()
    const diff = Math.abs(Date.parse(form.datetime) - Date.now())

    expect(diff).toBeLessThan(60_000)
  })

  it('is invalid and shows errors only after validate', () => {
    const { errors, isValid, validate } = useMaterialForm()

    expect(isValid.value).toBe(false)
    expect(errors.value).toEqual({})

    expect(validate()).toBe(false)
    expect(errors.value.title).toBeTruthy()
    expect(errors.value.short_description).toBeTruthy()
    expect(errors.value.description_html).toBeTruthy()
  })

  it('rejects title and description over the limit', () => {
    const { form, errors, validate } = useMaterialForm()
    fillValid(form)
    form.title = 'a'.repeat(TITLE_MAX + 1)
    form.short_description = 'a'.repeat(DESCRIPTION_MAX + 1)

    expect(validate()).toBe(false)
    expect(errors.value.title).toContain(String(TITLE_MAX))
    expect(errors.value.short_description).toContain(String(DESCRIPTION_MAX))
  })

  it('accepts values at the limit', () => {
    const { form, validate } = useMaterialForm()
    fillValid(form)
    form.title = 'a'.repeat(TITLE_MAX)
    form.short_description = 'a'.repeat(DESCRIPTION_MAX)

    expect(validate()).toBe(true)
  })

  it('treats empty editor html as empty text', () => {
    const { form, errors, validate } = useMaterialForm()
    fillValid(form)
    form.description_html = '<p></p>'

    expect(validate()).toBe(false)
    expect(errors.value.description_html).toBeTruthy()
  })

  it('counts used characters', () => {
    const { form, counters } = useMaterialForm()
    form.title = 'abc'
    form.short_description = 'de'

    expect(counters.value).toEqual({ title: 3, short_description: 2 })
  })

  it('builds draft with trimmed text and iso date', () => {
    const { form, toDraft } = useMaterialForm()
    fillValid(form)
    form.title = '  Заголовок  '

    const draft = toDraft()

    expect(draft.title).toBe('Заголовок')
    expect(draft.datetime).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/)
  })
})
