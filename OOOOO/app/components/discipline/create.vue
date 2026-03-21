<script setup lang="ts">
import type { FormErrorEvent, FormSubmitEvent } from "@nuxt/ui"
import { set } from "@vueuse/core"
import { kebabCase } from "lodash"

const emits = defineEmits<{
  refresh: []
}>()

const {
  ui: { icons }
} = useAppConfig()
const toast = useToast()

const isOpen = ref(false)
const isSubmitting = ref(false)

const { data: sports, status } = await useFetch<Array<SportType>>("/api/sports", { default: () => [] })

const state = ref<Partial<DisciplineType>>({})

const handleReset = () => {
  state.value = {}
}

const onError = (error: FormErrorEvent) => console.error("Form error:", error)

const onSubmit = async (data: FormSubmitEvent<DisciplineType>) => {
  set(isSubmitting, true)

  await $fetch("/api/disciplines/create", {
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

const formFields = computed<Array<FormField<DisciplineType>>>(() => [
  { label: "Name", key: "name", type: "text", required: true, class: "col-span-3" },
  { label: "Sport", key: "sport", type: "inputMenu", required: true, items: sports.value, loading: status.value === "pending", class: "col-span-3" },
  { label: "Code", key: "code", type: "text", required: true },
  { label: "Season", key: "season", type: "radio", items: ["Summer", "Winter"], required: true },
  {
    label: "Active",
    key: "active",
    type: "radio",
    items: [
      { label: "Active", value: true },
      { label: "Inactive", value: false }
    ],
    required: true
  }
])
</script>

<template>
  <u-modal
    title="Create Discipline"
    v-model:open="isOpen"
  >
    <u-button
      color="secondary"
      :icon="icons.plus"
    >
      Create Discipline
    </u-button>

    <template #body>
      <u-form
        id="discipline-form"
        :schema="DisciplineTypeSchema"
        :state
        @submit="onSubmit"
        @error="onError"
      >
        <div class="grid md:grid-cols-3 gap-3 items-center">
          <u-form-field
            v-for="field in formFields"
            :key="field.key"
            :name="field.key"
            :label="field.label"
            :required="field.required"
            :class="field.class"
          >
            <form-field
              v-model="state"
              :field
            />
          </u-form-field>
        </div>
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
        form="discipline-form"
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
