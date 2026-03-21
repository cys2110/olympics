<script setup lang="ts">
definePageMeta({ name: "country" })
</script>

<template>
  <u-dashboard-group>
    <sidebar />

    <u-dashboard-panel>
      <template #header>
        <u-dashboard-navbar>
          <template #right>
            <u-color-mode-button />
          </template>
        </u-dashboard-navbar>

        <u-dashboard-toolbar></u-dashboard-toolbar>
      </template>

      <template #body>
        <div> Page: countries/[name]/[id] </div>
      </template>
    </u-dashboard-panel>
  </u-dashboard-group>
</template>
