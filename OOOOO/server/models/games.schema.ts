import { defineMongooseModel } from "#nuxt/mongoose"
import { Types } from "mongoose"

export const GamesSchema = defineMongooseModel<GamesFormType>({
  name: "Games",
  schema: {
    year: {
      type: Number,
      required: true
    },
    season: {
      type: String,
      required: true,
      enum: ["Summer", "Winter"]
    },
    number: {
      type: String,
      required: false,
      uppercase: true
    },
    host: {
      city: {
        type: String,
        required: true
      },
      country: {
        type: Types.ObjectId,
        required: true,
        ref: "Country"
      }
    },
    dates: {
      opening_ceremony: {
        type: String,
        required: false
      },
      closing_ceremony: {
        type: String,
        required: false
      },
      start: {
        type: String,
        required: false
      },
      end: {
        type: String,
        required: false
      }
    },
    not_held: {
      type: String,
      required: false
    }
  }
})
