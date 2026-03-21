import { defineMongooseModel } from "#nuxt/mongoose"
import { Types } from "mongoose"

export const DisciplineSchema = defineMongooseModel<DisciplineInterface>({
  name: "Discipline",
  schema: {
    name: {
      type: String,
      required: true
    },
    code: {
      type: String,
      required: true,
      uppercase: true,
      unique: true
    },
    sport: {
      type: Types.ObjectId,
      required: true,
      ref: "Sport"
    },
    season: {
      type: String,
      enum: ["Summer", "Winter"]
    },
    active: {
      type: Boolean,
      default: true
    }
  }
})
