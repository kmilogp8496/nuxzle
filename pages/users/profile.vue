<script setup lang="ts">
definePageMeta({
  title: 'Inicio',
  middleware: ['auth'],
})

const authStore = useAuthStore()
</script>

<template>
  <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" alt="Avatar" size="" />
</template>
