<script setup lang="ts">
useHead({
  titleTemplate: '%s - Nuxzle',
})
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>
