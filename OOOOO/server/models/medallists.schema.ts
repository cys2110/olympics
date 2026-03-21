import { defineMongooseModel } from "#nuxt/mongoose"
import { Types } from "mongoose"

export const MedallistSchema = defineMongooseModel({
  name: "Medallist",
  schema: {
    event: {
      type: Types.ObjectId,
      required: true,
      ref: "Event"
    },
    participants: [
      {
        type: Types.ObjectId,
        required: true,
        ref: "Participant"
      }
    ],
    country: {
      type: Types.ObjectId,
      required: true,
      ref: "Country"
    },
    medal_type: {
      type: String,
      enum: ["gold", "silver", "bronze"],
      required: true
    }
  }
})
