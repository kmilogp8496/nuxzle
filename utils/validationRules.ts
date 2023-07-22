export function required(value: string, label: string) {
  return !!value || `${label} es requerido`
}

export function email(value: string, label: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || `${label} debe ser un correo electrónico válido`
}
