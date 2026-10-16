export const useMaterials = () => {
  const materials = useState<IMaterial[]>('materials', () => []);
  const loaded = useState('materials-loaded', () => false);
  const loading = useState('materials-loading', () => false);

  const sorted = computed(() =>
    [...materials.value].sort((a, b) => Date.parse(b.datetime) - Date.parse(a.datetime))
  );

  const load = async () => {
    if (loaded.value || loading.value) return;
    loading.value = true;
    try {
      materials.value = await $fetch<IMaterial[]>('/api/materials');
      loaded.value = true;
    } finally {
      loading.value = false;
    }
  };

  const create = async (draft: MaterialDraft) => {
    const saved = await $fetch<Partial<IMaterial>>('/api/materials/save', {
      method: 'POST',
      body: draft
    });
    const material: IMaterial = { ...draft, ...saved } as IMaterial;
    materials.value.push(material);
    return material;
  };

  const findById = (id: string) => materials.value.find((item) => String(item.id) === id);

  return { materials: sorted, loading, load, create, findById };
};
