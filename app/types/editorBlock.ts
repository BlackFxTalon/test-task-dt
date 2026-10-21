export interface IBlock {
  label: string
  isActive: () => boolean
  run: () => unknown
}