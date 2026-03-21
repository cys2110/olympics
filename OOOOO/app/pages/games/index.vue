<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui"
import { kebabCase } from "lodash"

useHead({ title: "Games" })

const router = useRouter()

const { data: games, status, refresh } = await useFetch<Array<GamesInterface>>("/api/games", { default: () => [] })

const columns: Array<TableColumn<GamesInterface>> = [
  { accessorKey: "season", header: "Season" },
  { accessorKey: "number", header: "#" },
  { accessorKey: "year", header: "Year" },
  { accessorKey: "host.city", header: "City" },
  { accessorKey: "host.country.name", header: "Country" },
  { accessorKey: "dates.opening_ceremony", header: "Opening Ceremony" },
  { accessorKey: "dates.closing_ceremony", header: "Closing Ceremony" },
  { accessorKey: "dates", header: "Competition Dates" },
  { accessorKey: "not_held", header: "" }
]

const handleSelectRow = (_e: Event, row: TableRow<GamesInterface>) => {
  router.push({
    name: "games-details",
    params: {
      year: row.original.year,
      city: kebabCase(row.original.host.city)
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
          <games-update @refresh="refresh" />
        </u-dashboard-toolbar>
      </template>

      <template #body>
        <u-table
          :data="games"
          :columns
          :loading="status === 'pending'"
          @select="handleSelectRow"
          :ui="{ tbody: '[&_tr]:cursor-pointer' }"
        >
          <template #season-cell="{ row }">
            <u-icon
              :name="row.original.season === 'Summer' ? 'material-symbols-light:sunny-outline-rounded' : 'material-symbols-light:snowing'"
              class="size-5"
            />
          </template>

          <template #host_country_name-cell="{ row }">
            <u-icon :name="getFlagCode(row.original.host.country)" />
          </template>

          <template #dates-cell="{ row }">
            <div v-if="row.original.dates?.start && row.original.dates?.end">{{
              dateTimeFormat.formatRange(new Date(row.original.dates.start), new Date(row.original.dates.end))
            }}</div>
          </template>
        </u-table>
      </template>
    </u-dashboard-panel>
  </u-dashboard-group>
</template>
