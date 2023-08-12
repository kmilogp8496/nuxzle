export const apiClient: typeof useFetch = (request, options) => {
  return useFetch(request, {
    onResponseError: (error) => {
      if (error.response?.status === 401) {
        const nuxtApp = useNuxtApp()
        useAuthStore(nuxtApp.$pinia).logout()
      }
    },
    ...options,
  })
}
