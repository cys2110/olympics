import { defineMongooseModel } from "#nuxt/mongoose"
import { Types } from "mongoose"

export const ResultSchema = defineMongooseModel({
  name: "Result",
  schema: {
    event: {
      type: Types.ObjectId,
      required: true,
      ref: "Event"
    },
    round: {
      type: String,
      required: false
    },
    format: {
      type: String,
      required: false
    },
    dates: {
      start: {
        type: Date,
        required: false
      },
      end: {
        type: Date,
        required: false
      }
    },
    scores: [
      {
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
        status: {
          type: String,
          required: false
        },
        points: {
          type: Number,
          required: false
        },
        position: {
          type: Number,
          required: false
        },
        breakdown: {
          type: Map,
          of: Number,
          required: false
        }
      }
    ]
  }
})
