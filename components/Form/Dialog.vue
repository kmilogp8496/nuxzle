<script setup lang="ts" generic="T extends ZodRawShape, K extends Zod.ZodObject<T>">
import type { ZodRawShape, z } from 'zod'
import UForm from '#ui/components/forms/Form.vue'
import type { FormSubmitEvent } from '#ui/types'

defineProps<{
  title: string
  modelValue?: boolean
  schema?: K
  state: InstanceType<typeof UForm>['$props']['state']
}>()

const emit = defineEmits<{
  (event: 'submit', payload: FormSubmitEvent<z.output<K>>): void
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
    <UForm v-bind="{ state, schema }" @submit="emit('submit', $event)">
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
    </UForm>
  </UModal>
</template>
