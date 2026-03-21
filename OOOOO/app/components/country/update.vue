<script setup lang="ts">
import type { FormErrorEvent, FormSubmitEvent } from "@nuxt/ui"
import { set } from "@vueuse/core"

const props = defineProps<{
  country?: CountryType
}>()

const emits = defineEmits<{
  refresh: []
}>()

const {
  ui: { icons }
} = useAppConfig()
const toast = useToast()

const isOpen = ref(false)
const isSubmitting = ref(false)

const state = ref({ ...props.country })

const handleReset = () => {
  state.value = { ...props.country }
}

const onError = (error: FormErrorEvent) => console.error("Form error:", error)

const onSubmit = async (data: FormSubmitEvent<CountryType>) => {
  set(isSubmitting, true)

  await $fetch(`/api/countries/${props.country ? "put" : "create"}`, {
    method: "POST",
    body: data.data
  })
    .then(() => {
      toast.add({
        title: `${data.data.name} successfully ${props.country ? "updated" : "created"}`,
        icon: icons.success,
        color: "success"
      })

      emits("refresh")
      handleReset()
      set(isOpen, false)
    })
    .catch(error => console.error(`Error ${props.country ? "updating" : "creating"} ${data.data.name}:`, error))
    .finally(() => set(isSubmitting, false))
}

const formFields: Array<FormField<CountryType>> = [
  { label: "Name", key: "name", type: "text", required: true, class: "col-span-2" },
  { label: "NOC Title", key: "noc_title", type: "text", class: "col-span-2" },
  { label: "Continent", key: "continent", type: "select", items: CONTINENTS, required: true },
  { label: "Recognition Year", key: "recognition_year", type: "text", subType: "number" },
  { label: "IOC Code", key: "ioc_code", type: "text", required: true },
  { label: "Alpha 2 Code", key: "alpha2_code", type: "text", required: true },
  { label: "Website", key: "website", type: "textarea", class: "col-span-2" }
]
</script>

<template>
  <u-modal
    :title="state.name || 'Create Country'"
    v-model:open="isOpen"
  >
    <u-button
      color="secondary"
      :icon="country ? ICONS.edit : icons.plus"
    >
      Create Country
    </u-button>

    <template #body>
      <u-form
        id="country-form"
        :schema="CountryTypeSchema"
        :state
        @submit="onSubmit"
        @error="onError"
      >
        <div class="grid md:grid-cols-2 gap-3 items-center">
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
        form="country-form"
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
