import type { Notification } from '@nuxthq/ui/dist/runtime/types'

export function displayErrorNotification(options: Partial<Notification>) {
  const toast = useToast()

  const {
    title = 'Error',
    description = 'La operación no se pudo realizar',
  } = options

  toast.add({
    ...options,
    title,
    description,
    color: 'red',
  })
}

export function displaySuccessNotification(options: Partial<Notification>) {
  const toast = useToast()

  const {
    title = 'Éxito',
    description = 'La operación se realizó con éxito',
  } = options

  toast.add({
    ...options,
    title,
    description,
    color: 'green',
  })
}