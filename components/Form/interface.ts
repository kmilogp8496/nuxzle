export type Rule = (value: string, label: string) => boolean | string

type InputValue = string | number

export interface Field {
  validate: () => boolean
}

export interface InjectedForm {
  registerField: (field: Field) => void
  removeField: (field: Field) => void
}

export interface FormGroupProps {
  modelValue?: InputValue
  label: string
  help?: string
  description?: string
  error?: string
  rules?: Rule | Rule[]
  lazy?: boolean
}

export interface FormItemProps extends FormGroupProps {
  trailingIcon?: string
  placeholder?: string
  type?: string
  step?: string
}

export interface FormSelectProps<T = unknown> extends FormItemProps {
  optionAttribute?: string
  valueAttribute?: string
  options: T[] | readonly T[]
}
