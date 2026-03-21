<script setup lang="ts">
import type { TableColumn, TableRow } from "@nuxt/ui"
import { kebabCase } from "lodash"

useHead({ title: "Disciplines" })

const router = useRouter()

const { data: disciplines, status, refresh } = await useFetch<Array<DisciplineInterface>>("/api/disciplines", { default: () => [] })

const columns: Array<TableColumn<DisciplineInterface>> = [
  { id: "icon", accessorFn: row => ICONS[row.code as keyof typeof ICONS] },
  { accessorKey: "code", header: "Code" },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "sport.name", header: "Sport" },
  { accessorKey: "season", header: "Season" },
  { accessorKey: "active", header: "Active" }
]

const handleSelectRow = (_e: Event, row: TableRow<DisciplineInterface>) => {
  router.push({
    name: "discipline",
    params: {
      code: row.original.code,
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
          <sport-create @refresh="refresh" />
          <discipline-create @refresh="refresh" />
        </u-dashboard-toolbar>
      </template>

      <template #body>
        <u-table
          :data="disciplines"
          :columns
          :loading="status === 'pending'"
          @select="handleSelectRow"
          :ui="{ tbody: '[&_tr]:cursor-pointer' }"
        >
          <template #icon-cell="{ cell }">
            <u-icon
              :name="cell.getValue<string>()"
              class="size-5"
            />
          </template>
        </u-table>
      </template>
    </u-dashboard-panel>
  </u-dashboard-group>
</template>
