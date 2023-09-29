export default defineNuxtPlugin(() => {
  const format = {
    asCurrency: (value: number) => Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value),
    asCents: (value: number) => Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(value / 100),
  }

  return {
    provide: {
      format,
    },
  }
})
