export interface TableColumn<T extends Record<string, unknown>> {
  [key: string]: any
  label: string
  key: keyof T | string & NonNullable<unknown>
  sortable?: boolean
  direction?: 'asc' | 'desc'
  class?: string
  transform?: (item: T) => string
}
