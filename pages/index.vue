<script setup lang="ts">
useHead({
  title: 'Inicio',
})
</script>

<template>
  <section class="text-center h-full flex items-center justify-center flex-col gap-8">
    <h1 class="text-primary-500 text-7xl text-center max-w-5xl">
      El precio de todos tus mercados en un solo sitio
    </h1>
    <div class="space-x-4 mt-10">
      <UButton :to="{ name: 'products' }" size="xl" class="px-4 rounded-s-full rounded-e-full">
        Ver productos
      </UButton>
      <UButton size="xl" class="px-4 rounded-s-full rounded-e-full" variant="outline">
        Saber más...
      </UButton>
    </div>
  </section>
</template>
