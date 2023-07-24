<script setup lang="ts">
useHead({
  titleTemplate: '%s - My App',
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
