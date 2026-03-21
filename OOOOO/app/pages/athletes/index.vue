<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui"
import { kebabCase } from "lodash"

useHead({ title: "Athletes" })

const router = useRouter()

const { data: athletes, status, refresh } = await useFetch<Array<AthleteInterface>>("/api/athletes", { default: () => [] })

const columns: Array<TableColumn<AthleteInterface>> = [
  { accessorKey: "first_name", header: "First Name" },
  { accessorKey: "last_name", header: "Last Name" },
  { accessorKey: "dob", header: "Date of Birth" },
  { accessorKey: "dod", header: "Date of Death" },
  { accessorKey: "nocs", header: "NOCs" },
  { accessorKey: "nationalities", header: "Nationalities" }
]

const handleSelectRow = (_e: Event, row: TableRow<AthleteInterface>) => {
  router.push({
    name: "athlete",
    params: {
      id: row.original._id,
      name: kebabCase(`${row.original.first_name} ${row.original.last_name}`)
    }
  })
}
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

        <u-dashboard-toolbar>
          <athlete-update @refresh="refresh" />
        </u-dashboard-toolbar>
      </template>

      <template #body>
        <u-table
          :data="athletes"
          :columns
          :loading="status === 'pending'"
          @select="handleSelectRow"
          :ui="{ tbody: '[&_tr]:cursor-pointer' }"
        >
          <template #nocs-cell="{ row }">
            <div
              v-for="country in row.original.nocs"
              :key="country._id"
              class="flex items-center gap-1"
            >
              <u-icon :name="getFlagCode(country)" />
              <div>{{ country.name }}</div>
            </div>
          </template>
        </u-table>
      </template>
    </u-dashboard-panel>
  </u-dashboard-group>
</template>
