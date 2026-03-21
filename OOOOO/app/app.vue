<script setup lang="ts">
import { provideSSRWidth } from "@vueuse/core"

useHead({
  titleTemplate: "%s %separator %category %separator %siteName",
  templateParams: {
    separator: "|",
    siteName: "OlympicsHistory",
    category: null
  },
  htmlAttrs: { class: "scroll-smooth" }
})

provideSSRWidth(1024)
</script>

<template>
  <u-app :tooltip="{ delayDuration: 50 }" :toaster="{ position: 'top-center', expand: false }">
    <nuxt-loading-indicator color="repeating-linear-gradient(to right,#ddd6fe 0%,#7c3aed 50%,#2e1065 100%)" />

    <nuxt-page />
  </u-app>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>