<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui"
import { kebabCase } from "lodash"

useHead({ title: "Countries" })

const router = useRouter()

const { data: countries, status, refresh } = await useFetch<Array<CountryType>>("/api/countries", { default: () => [] })

const columns: Array<TableColumn<CountryType>> = [
  { accessorKey: "ioc_code", header: "IOC Code" },
  { accessorKey: "alpha2_code", header: "Flag" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "continent", header: "Continent" },
  { accessorKey: "noc_title", header: "NOC" },
  { accessorKey: "recognition_year", header: "Recognition Year" }
]

const handleSelectRow = (_e: Event, row: TableRow<CountryType>) => {
  router.push({
    name: "country",
    params: {
      id: row.original.ioc_code,
      name: kebabCase(row.original.name)
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
          <country-update @refresh="refresh" />
        </u-dashboard-toolbar>
      </template>

      <template #body>
        <u-table
          :data="countries"
          :columns
          :loading="status === 'pending'"
          @select="handleSelectRow"
          :ui="{ tbody: '[&_tr]:cursor-pointer' }"
        ></u-table>
      </template>
    </u-dashboard-panel>
  </u-dashboard-group>
</template>
