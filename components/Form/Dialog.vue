<script setup lang="ts">
defineProps<{ title: string; modelValue?: boolean }>()

const emit = defineEmits<{
  (event: 'submit'): void
}>()

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
    <Form @submit="emit('submit')">
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
    </Form>
  </UModal>
</template>
