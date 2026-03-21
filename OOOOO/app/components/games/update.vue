<script setup lang="ts">
import type { FormErrorEvent, FormSubmitEvent } from "@nuxt/ui"
import { set } from "@vueuse/core"
import { cloneDeep } from "lodash"
import { parseDate, type DateValue } from "@internationalized/date"

const props = defineProps<{
  games?: GamesInterface
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
  ...props.games,
  host: {
    city: props.games?.host.city || "",
    country: props.games?.host.country?._id || ""
  },
  dates: {
    opening_ceremony: props.games?.dates.opening_ceremony ? parseDate(props.games.dates.opening_ceremony) : undefined,
    closing_ceremony: props.games?.dates.closing_ceremony ? parseDate(props.games.dates.closing_ceremony) : undefined,
    start: props.games?.dates.start ? parseDate(props.games.dates.start) : undefined,
    end: props.games?.dates.end ? parseDate(props.games.dates.end) : undefined
  }
}

const competitionDates = ref({ start: initialState.dates.start, end: initialState.dates.end })

watch(
  competitionDates,
  newDates => {
    state.value.dates = {
      ...state.value.dates,
      start: newDates.start,
      end: newDates.end
    }
  },
  { deep: true }
)

const state = ref<Partial<GamesInputType>>(cloneDeep(initialState))

const handleReset = () => {
  state.value = cloneDeep(initialState)
  competitionDates.value = { start: initialState.dates.start, end: initialState.dates.end }
}

const onError = (error: FormErrorEvent) => console.error("Form error:", error)

const onSubmit = async (data: FormSubmitEvent<GamesType>) => {
  set(isSubmitting, true)

  await $fetch(`/api/games/${props.games ? "put" : "create"}`, {
    method: "POST",
    body: data.data
  })
    .then(() => {
      toast.add({
        title: `${data.data.host.city} ${data.data.year} successfully ${props.games ? "updated" : "created"}`,
        icon: icons.success,
        color: "success"
      })

      emits("refresh")
      handleReset()
      set(isOpen, false)
    })
    .catch(error => console.error(`Error ${props.games ? "updating" : "creating"} ${data.data.host.city} ${data.data.year}:`, error))
    .finally(() => set(isSubmitting, false))
}
</script>

<template>
  <u-modal
    :title="state.host?.city && state.year ? `${state.host.city} ${state.year}` : 'Create Games'"
    v-model:open="isOpen"
  >
    <u-button
      color="secondary"
      :icon="games ? ICONS.edit : icons.plus"
    >
      Create Games
    </u-button>

    <template #body>
      <u-form
        id="games-form"
        :schema="GamesTypeSchema"
        :state
        @submit="onSubmit"
        @error="onError"
        class="*:my-3"
      >
        <div class="flex gap-3 items-center">
          <u-form-field
            name="season"
            label="Season"
            required
          >
            <u-radio-group
              v-model="state.season"
              :items="['Summer', 'Winter']"
              orientation="horizontal"
              loop
            />
          </u-form-field>

          <u-form-field
            name="year"
            label="Year"
            required
          >
            <u-input
              type="number"
              placeholder="Enter year"
              v-model="state.year"
            />
          </u-form-field>

          <u-form-field
            name="number"
            label="Number"
          >
            <u-input
              placeholder="Enter number"
              v-model="state.number"
            />
          </u-form-field>
        </div>

        <u-form
          v-if="state.host"
          nested
          :schema="GamesTypeSchema.shape.host"
          name="host"
        >
          <u-form-field
            :error-pattern="/^(city|country)$/"
            label="Host"
            required
          >
            <u-field-group class="w-full">
              <u-input
                placeholder="Enter host city"
                v-model="state.host.city"
              />

              <u-input-menu
                v-model="state.host.country"
                placeholder="Select host country"
                :items="countries"
                value-key="_id"
                label-key="name"
                :loading="status === 'pending'"
              />
            </u-field-group>
          </u-form-field>
        </u-form>

        <u-form
          v-if="state.dates"
          nested
          :schema="GamesTypeSchema.shape.dates"
          name="dates"
        >
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <u-form-field
              name="opening_ceremony"
              label="Opening Ceremony"
            >
              <form-date-picker v-model="<DateValue>state.dates.opening_ceremony" />
            </u-form-field>

            <u-form-field
              name="closing_ceremony"
              label="Closing Ceremony"
            >
              <form-date-picker v-model="<DateValue>state.dates.closing_ceremony" />
            </u-form-field>

            <u-form-field
              name="dates"
              label="Competition Dates"
              class="col-span-2"
            >
              <form-dates-picker v-model="<{ start: DateValue; end: DateValue }>competitionDates" />
            </u-form-field>
          </div>
        </u-form>

        <u-form-field
          name="not_held"
          label="Not Held?"
        >
          <u-input
            placeholder="Enter reason if games were not held"
            v-model="state.not_held"
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
        form="games-form"
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
