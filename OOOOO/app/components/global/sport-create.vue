<script setup lang="ts">
import type { FormErrorEvent, FormSubmitEvent } from "@nuxt/ui"
import { set } from "@vueuse/core"

const emits = defineEmits<{
  refresh: []
}>()

const {
  ui: { icons }
} = useAppConfig()
const toast = useToast()

const isOpen = ref(false)
const isSubmitting = ref(false)

const state = ref<Partial<SportType>>({})

const handleReset = () => {
  state.value = {}
}

const onError = (error: FormErrorEvent) => console.error("Form error:", error)

const onSubmit = async (data: FormSubmitEvent<SportType>) => {
  set(isSubmitting, true)

  await $fetch("/api/sports/create", {
    method: "POST",
    body: data.data
  })
    .then(() => {
      toast.add({
        title: `${data.data.name} successfully created`,
        icon: icons.success,
        color: "success"
      })

      emits("refresh")
      handleReset()
      set(isOpen, false)
    })
    .catch(error => console.error(`Error creating ${data.data.name}:`, error))
    .finally(() => set(isSubmitting, false))
}

const formFields: Array<FormField<SportType>> = [
  { label: "Name", key: "name", type: "text", required: true },
  { label: "International Federation", key: "if", type: "text" }
]
</script>

<template>
  <u-modal
    title="Create Sport"
    v-model:open="isOpen"
  >
    <u-button
      color="secondary"
      :icon="icons.plus"
    >
      Create Sport
    </u-button>

    <template #body>
      <u-form
        id="sport-form"
        :schema="SportTypeSchema"
        :state
        @submit="onSubmit"
        @error="onError"
      >
        <u-form-field
          v-for="field in formFields"
          :key="field.key"
          :name="field.key"
          :label="field.label"
          :required="field.required"
          orientation="horizontal"
          :ui="{
            root: 'my-3 gap-4',
            container: 'flex-1'
          }"
        >
          <form-field
            v-model="state"
            :field
          />
        </u-form-field>
      </u-form>
    </template>

    <template #footer="{ close }">
      <u-button
        label="Save"
        color="success"
        block
        :icon="icons.upload"
        :loading="isSubmitting"
        type="submit"
        form="sport-form"
      />

      <u-button
        label="Reset"
        color="warning"
        block
        :icon="icons.reload"
        @click="handleReset"
      />

      <u-button
        label="Cancel"
        color="error"
        block
        :icon="icons.close"
        @click="close"
      />
    </template>
  </u-modal>
</template>
