<script setup lang="ts" generic="S">
defineProps<{
  field: FormField<S>
}>()

const modelValue = defineModel<any>()

const {
  ui: { icons }
} = useAppConfig()
</script>

<template>
  <u-input
    v-if="field.type === 'text'"
    :type="field.subType"
    :placeholder="field.placeholder || `Enter ${field.label.toLowerCase()}`"
    v-model="modelValue[field.key]"
  >
    <template
      #trailing
      v-if="isDefined(modelValue[field.key])"
    >
      <u-button
        color="neutral"
        variant="link"
        :icon="icons.close"
        @click="modelValue[field.key] = undefined"
      />
    </template>
  </u-input>

  <u-textarea
    v-else-if="field.type === 'textarea'"
    v-model="modelValue[field.key]"
    :placeholder="field.placeholder ?? `Enter ${field.label.toLowerCase()}`"
    :rows="2"
  >
    <template
      v-if="isDefined(modelValue[field.key])"
      #trailing
    >
      <u-button
        color="neutral"
        variant="link"
        :icon="icons.close"
        @click="modelValue[field.key] = undefined"
      />
    </template>
  </u-textarea>

  <u-select
    v-else-if="field.type === 'select'"
    v-model="modelValue[field.key]"
    :placeholder="field.placeholder || `Select ${field.label.toLowerCase()}`"
    :items="field.items"
  />

  <u-input-menu
    v-else-if="field.type === 'inputMenu'"
    v-model="modelValue[field.key]"
    :placeholder="field.placeholder || `Select ${field.label.toLowerCase()}`"
    :items="field.items"
    value-key="_id"
    :label-key="field.labelKey || 'name'"
    :loading="field.loading"
    :multiple="field.multiple"
  />

  <u-radio-group
    v-else-if="field.type === 'radio'"
    :items="field.items"
    v-model="modelValue[field.key]"
    orientation="horizontal"
  />

  <form-date-picker
    v-else-if="field.type === 'date'"
    v-model="modelValue[field.key]"
  />
</template>
