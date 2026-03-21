<script setup lang="ts">
const modelValue = defineModel<any>()

const { data: athletes, status: athletesStatus } = await useFetch("/api/athletes", {
  default: () => [],
  transform: (data: Array<AthleteType>) =>
    data.map(athlete => ({
      ...athlete,
      name: `${athlete.first_name} ${athlete.last_name}`,
      icon: getFlagCode(athlete.nocs?.[0] as CountryType)
    }))
})
</script>

<template>
  <u-input-menu
    v-model="modelValue"
    placeholder="Search athletes..."
    :items="athletes"
    :loading="athletesStatus === 'pending'"
    clearable
  />
</template>
