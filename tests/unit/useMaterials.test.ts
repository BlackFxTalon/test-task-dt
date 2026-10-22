import { beforeEach, describe, expect, it } from 'vitest';
import { registerEndpoint } from '@nuxt/test-utils/runtime';
import { readBody } from 'h3';

const material = (id: number, datetime: string): IMaterial => ({
  id,
  title: `Материал ${id}`,
  short_description: 'Описание',
  datetime,
  description_html: '<p>Текст</p>',
  description_json: {}
});

registerEndpoint('/api/materials', () => [
  material(1, '2026-01-01T10:00:00.000Z'),
  material(2, '2026-03-01T10:00:00.000Z'),
  material(3, '2026-02-01T10:00:00.000Z')
]);

registerEndpoint('/api/materials/save', {
  method: 'POST',
  handler: async (event) => {
    const { title } = await readBody(event);
    return title === 'Ошибка'
      ? { success: false, id: 0, errors: ['invalid'] }
      : { success: true, id: 4, errors: [] };
  }
});

const draft = {
  title: 'Новый',
  short_description: 'Описание',
  datetime: '2026-05-01T10:00:00.000Z',
  description_html: '<p>Текст</p>',
  description_json: {}
};

describe('useMaterials', () => {
  beforeEach(() => {
    clearNuxtState(['materials', 'materials-loaded']);
  });

  it('loads materials sorted from newest to oldest', async () => {
    const { materials, load } = useMaterials();
    await load();

    expect(materials.value.map((item) => item.id)).toEqual([2, 3, 1]);
  });

  it('finds material by route id', async () => {
    const { load, findById } = useMaterials();
    await load();

    expect(findById('3')?.title).toBe('Материал 3');
    expect(findById('100')).toBeUndefined();
  });

  it('adds saved material with id from save response', async () => {
    const { materials, create } = useMaterials();

    const created = await create(draft);

    expect(created).toEqual({ ...draft, id: 4 });
    expect(materials.value[0]).toEqual(created);
  });

  it('throws and keeps list unchanged when save fails', async () => {
    const { materials, create } = useMaterials();

    await expect(create({ ...draft, title: 'Ошибка' })).rejects.toThrow();
    expect(materials.value).toEqual([]);
  });
});
