<script setup lang="ts">
import type { FormErrorEvent, FormSubmitEvent } from "@nuxt/ui"
import { set } from "@vueuse/core"
import { cloneDeep, kebabCase } from "lodash"
import { parseDate } from "@internationalized/date"

const props = defineProps<{
  athlete?: AthleteInterface
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

const { data: countries, status } = await useFetch<Array<CountryType>>("/api/countries", {
  default: () => [],
  transform: (data: Array<CountryType>) =>
    data.map(country => ({
      ...country,
      icon: getFlagCode(country)
    }))
})

const initialState = {
  ...props.athlete,
  dob: props.athlete?.dob ? parseDate(props.athlete.dob) : undefined,
  dod: props.athlete?.dod ? parseDate(props.athlete.dod) : undefined,
  nocs: props.athlete?.nocs?.map(noc => noc._id as string) || [],
  nationalities: props.athlete?.nationalities?.map(noc => noc._id as string) || [],
  relations: props.athlete?.relations?.map(relation => ({
    athlete: {
      _id: relation.athlete._id,
      name: `${relation.athlete.first_name} ${relation.athlete.last_name}`
    },
    type: relation.type
  }))
}

const state = ref<Partial<AthleteInputType>>(cloneDeep(initialState))

const handleReset = () => {
  state.value = cloneDeep(initialState)
}

const onError = (error: FormErrorEvent) => console.error("Form error:", error)

const onSubmit = async (data: FormSubmitEvent<AthleteType>) => {
  set(isSubmitting, true)

  await $fetch(`/api/athletes/${props.athlete ? "put" : "create"}`, {
    method: "POST",
    body: data.data
  })
    .then(() => {
      toast.add({
        title: `${data.data.first_name} ${data.data.last_name} successfully ${props.athlete ? "updated" : "created"}`,
        icon: icons.success,
        color: "success"
      })

      emits("refresh")
      handleReset()
      set(isOpen, false)
    })
    .catch(error => console.error(`Error ${props.athlete ? "updating" : "creating"} ${data.data.first_name} ${data.data.last_name}:`, error))
    .finally(() => set(isSubmitting, false))
}

const formFields = computed<Array<FormField<AthleteType>>>(() => [
  { label: "First Name", key: "first_name", type: "text", required: true },
  { label: "Last Name", key: "last_name", type: "text", required: true },
  {
    label: "Name Order",
    key: "name_order",
    type: "radio",
    items: [
      { label: "Western", value: "western" },
      { label: "Eastern", value: "eastern" }
    ],
    required: true
  },
  {
    label: "Sex",
    key: "sex",
    type: "radio",
    items: [
      { label: "Male", value: "M" },
      { label: "Female", value: "W" }
    ],
    required: true
  },
  { label: "Date of Birth", key: "dob", type: "date" },
  { label: "Date of Death", key: "dod", type: "date" },
  {
    label: "NOCs",
    key: "nocs",
    type: "inputMenu",
    items: countries.value,
    loading: status.value === "pending",
    required: true,
    multiple: true,
    class: "col-span-2"
  },
  {
    label: "Nationalities",
    key: "nationalities",
    type: "inputMenu",
    items: countries.value,
    loading: status.value === "pending",
    multiple: true,
    class: "col-span-2"
  }
])
</script>

<template>
  <u-modal
    :title="state.first_name && state.last_name ? `${state.first_name} ${state.last_name}` : 'Create Athlete'"
    v-model:open="isOpen"
  >
    <u-button
      color="secondary"
      :icon="athlete ? ICONS.edit : icons.plus"
    >
      Create Athlete
    </u-button>

    <template #body>
      <u-form
        id="athlete-form"
        :schema="AthleteTypeSchema"
        :state
        @submit="onSubmit"
        @error="onError"
      >
        <div class="grid md:grid-cols-2 gap-3 items-center mb-3">
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

        <u-form
          v-for="(relation, count) in state.relations || []"
          :key="count"
          :name="`relations.${count}`"
          :schema="AthleteTypeSchema.shape.relations"
          nested
        >
          <div class="flex items-end gap-2">
            <u-form-field
              :label="!count ? 'Relation' : undefined"
              name="athlete"
              class="flex-1"
            >
              <athlete-search v-model="relation.athlete" />
            </u-form-field>

            <u-form-field
              :label="!count ? 'Relationship type' : undefined"
              name="type"
              class="flex-1"
            >
              <u-input
                placeholder="Enter relationship type"
                v-model="relation.type"
              />
            </u-form-field>

            <u-button
              color="error"
              @click="state.relations?.splice(count, 1)"
              :icon="icons.close"
            />
          </div>
        </u-form>

        <u-button
          :icon="icons.plus"
          @click="state.relations = [...(state.relations || []), { athlete: { _id: '', name: '' }, type: '' }]"
          label="Add Relation"
          block
          class="mt-3"
        />
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
        form="athlete-form"
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
