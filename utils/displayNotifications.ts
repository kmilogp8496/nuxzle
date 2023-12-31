import type { Notification } from '@nuxt/ui/dist/runtime/types/notification'

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

export function displayErrorFromApi(error: ReturnType<typeof useFetch<'/api/products'>>['error']) {
  displayErrorNotification({
    description: error.value?.data.message ?? 'La operación no se pudo realizar',
  })
}
