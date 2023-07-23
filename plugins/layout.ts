export default defineNuxtPlugin(() => {
  const title = ref('')

  return {
    provide: {
      layout: {
        title,
      },
    },
  }
})
