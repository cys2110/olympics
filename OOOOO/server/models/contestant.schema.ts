import { defineMongooseModel } from "#nuxt/mongoose"
import { Types } from "mongoose"

export const ContestantSchema = defineMongooseModel({
  name: "Contestant",
  schema: {
    athlete: {
      type: Types.ObjectId,
      required: true,
      ref: "Athlete"
    },
    games: {
      type: Types.ObjectId,
      required: true,
      ref: "Games"
    },
    noc: {
      type: Types.ObjectId,
      required: true,
      ref: "Country"
    },
    nationality: {
      type: Types.ObjectId,
      required: false,
      ref: "Country"
    },
    used_name: {
      type: String,
      required: false
    }
  }
})
