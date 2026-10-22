export const useMaterials = () => {
  const materials = useState<IMaterial[]>('materials', () => []);
  const loaded = useState('materials-loaded', () => false);

  const sorted = computed(() =>
    [...materials.value].sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
  );

  const load = async () => {
    if (loaded.value) return;
    materials.value = await $fetch<IMaterial[]>('/api/materials');
    loaded.value = true;
  };

  const create = async (draft: MaterialDraft) => {
    const { success, id } = await $fetch<ISaveResponse>('/api/materials/save', {
      method: 'POST',
      body: draft
    });
    if (!success) throw new Error('Material was not saved');

    const material: IMaterial = { ...draft, id };
    materials.value.push(material);
    return material;
  };

  const findById = (id: string) => materials.value.find((item) => String(item.id) === id);

  return { materials: sorted, load, create, findById };
};
