<script setup lang="ts">
definePageMeta({ name: "discipline" })
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
        <div> Page: disciplines/[name]/[code] </div>
      </template>
    </u-dashboard-panel>
  </u-dashboard-group>
</template>
