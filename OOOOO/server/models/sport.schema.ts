import { defineMongooseModel } from "#nuxt/mongoose"

export const SportSchema = defineMongooseModel<SportType>({
  name: "Sport",
  schema: {
    name: {
      type: String,
      required: true
    },
    if: {
      type: String,
      required: false
    }
  }
})
