<script setup lang="ts">
definePageMeta({
  title: 'Inicio',
  middleware: ['auth'],
})

const authStore = useAuthStore()
</script>

<template>
  <img class="rounded-full mx-auto max-w-80 max-h-80 object-cover mt-8" src="https://images.unsplash.com/photo-1488161628813-04466f872be2" alt="Avatar" height="320" width="320">

  <div class="overflow-hidden mt-8 border rounded-xl max-w-lg mx-auto">
    <div class="p-4 flex gap-4 items-center">
      <h3 class="text-xl font-semibold">
        Email:
      </h3> {{ authStore.user?.email }}
    </div>
    <hr>
    <div class="p-4 flex gap-4 items-center">
      <h3 class="text-xl font-semibold">
        Nombre:
      </h3> {{ authStore.user?.name ?? 'Por definir' }}
    </div>
    <hr>
    <div class="p-4 flex gap-4 items-center">
      <h3 class="text-xl font-semibold">
        Teléfono:
      </h3> {{ authStore.user?.phone ?? 'Por definir' }}
    </div>
  </div>

  <div class="overflow-hidden mt-20 border rounded-xl max-w-lg mx-auto">
    <div class="p-4 flex gap-4 items-center">
      <h3 class="text-xl font-semibold">
        Mercado preferido:
      </h3> {{ authStore.user?.default_market ?? 'Por definir' }}
    </div>
    <hr>
    <div class="p-4 flex gap-4 items-center">
      <h3 class="text-xl font-semibold">
        Dirección:
      </h3> {{ authStore.user?.address ?? 'Por definir' }}
    </div>
  </div>
</template>
