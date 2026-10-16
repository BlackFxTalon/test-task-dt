export interface IMaterial {
  id: number
  title: string
  short_description: string
  datetime: string
  description_html: string
  description_json: Record<string, unknown>
}

export type MaterialDraft = Omit<IMaterial, 'id'>;
