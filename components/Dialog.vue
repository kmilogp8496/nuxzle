<script setup lang="ts">
defineProps<{ title: string }>()

const model = defineModel({
  default: false,
  local: true,
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
        <slot name="title">
          {{ title }}
        </slot>
      </template>

      <slot />
      <template #footer>
        <slot name="actions" />
      </template>
    </UCard>
  </UModal>
</template>
