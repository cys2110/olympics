import { defineMongooseModel } from "#nuxt/mongoose"

export const CountrySchema = defineMongooseModel<CountryType>({
  name: "Country",
  schema: {
    ioc_code: {
      type: String,
      required: true,
      uppercase: true,
      unique: true
    },
    alpha2_code: {
      type: String,
      lowercase: true
    },
    name: {
      type: String,
      required: true
    },
    continent: {
      type: String,
      required: true,
      enum: CONTINENTS
    },
    noc_title: {
      type: String,
      required: false
    },
    recognition_year: {
      type: Number,
      required: false
    },
    website: {
      type: String,
      required: false
    }
  }
})
