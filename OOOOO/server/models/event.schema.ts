import { defineMongooseModel } from "#nuxt/mongoose"
import { Types } from "mongoose"

export const EventSchema = defineMongooseModel({
  name: "Event",
  schema: {
    name: {
      type: String,
      required: true
    },
    sex: {
      type: String,
      enum: ["M", "W", "Mixed"]
    },
    dates: {
      start: {
        type: Date,
        required: true
      },
      end: {
        type: Date,
        required: true
      }
    },
    location: {
      venue: {
        type: String,
        required: true
      },
      city: {
        type: String,
        required: true
      }
    },
    score_breakdowns: [
      {
        type: String,
        required: false
      }
    ],
    discipline: {
      type: Types.ObjectId,
      required: true,
      ref: "Discipline"
    }
  }
})
