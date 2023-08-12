export interface TableColumn<T> {
  label: string
  key: keyof T | string & NonNullable<unknown>
}
