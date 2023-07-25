<script setup lang="ts">
definePageMeta({
  title: 'Inicio',
})

const { data, refresh } = apiClient('/api/users')

onMounted(() => {
  setTimeout(() => {
    refresh()
  }, 3000)
})
</script>

<template>
  <UContainer class="space-y-4">
    <h1 class="text-primary-500 text-xl">
      LaLaLanding
    </h1>
    {{ data }}
  </UContainer>
</template>
