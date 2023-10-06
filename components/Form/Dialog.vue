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
            <h4 class="text-2xl font-semibold">
              {{ title }}
            </h4>
          </slot>
        </template>

        <div class="space-y-4">
          <slot />
        </div>
        <template #footer>
          <div class="flex justify-end gap-4">
            <slot name="actions" />
          </div>
        </template>
      </UCard>
    </Form>
  </UModal>
</template>
