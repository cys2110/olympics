export default defineAppConfig({
  ui: {
    colors: {
      primary: "violet",
      secondary: "orange",
      success: "green",
      info: "blue",
      warning: "yellow",
      error: "red",
      neutral: "slate"
    },
    icons: {
      close: "material-symbols-light:cancel-outline-rounded",
      plus: "material-symbols-light:add-2-rounded",
      reload: "material-symbols-light:sync-rounded",
      success: "material-symbols-light:check-circle-outline-rounded",
      upload: "material-symbols-light:arrow-upload-progress-rounded"
    },
    button: {
      slots: { base: "cursor-pointer" },
      defaultVariants: {
        variant: "outline"
      }
    },
    dashboardSidebar: {
      slots: { header: "font-cursive font-semibold text-lg justify-center" }
    },
    formField: {
      slots: { label: "font-medium" }
    },
    input: {
      slots: { root: "w-full" }
    },
    inputDate: {
      slots: { base: "w-full" }
    },
    inputMenu: {
      slots: { root: "w-full" }
    },
    select: {
      slots: { base: "w-full" }
    },
    textarea: {
      slots: { root: "w-full" }
    }
  }
})
