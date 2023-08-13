<script setup lang="ts">
const model = defineModel({
  default: false,
})

function onClick() {
  model.value = !model.value
}
</script>

<template>
  <slot name="activator" :on="{ onClick }" />

  <UModal v-model="model">
    <UCard>
      <template #header>
        <slot name="header" />
      </template>

      <slot />
      <template #footer>
        <slot name="header" />
      </template>
    </UCard>
  </UModal>
</template>
