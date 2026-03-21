import { defineMongooseModel } from "#nuxt/mongoose"
import { Types } from "mongoose"

export const AthleteSchema = defineMongooseModel<AthleteInterface>({
  name: "Athlete",
  schema: {
    first_name: {
      type: String,
      required: true
    },
    last_name: {
      type: String,
      required: true
    },
    name_order: {
      type: String,
      enum: ["western", "eastern"],
      default: "western"
    },
    sex: {
      type: String,
      enum: ["M", "W"],
      required: true
    },
    dob: {
      type: String,
      required: false
    },
    dod: {
      type: String,
      required: false
    },
    nocs: [
      {
        type: Types.ObjectId,
        required: true,
        ref: "Country"
      }
    ],
    nationalities: [
      {
        type: Types.ObjectId,
        required: false,
        ref: "Country"
      }
    ],
    relations: [
      {
        athlete: {
          type: Types.ObjectId,
          required: true,
          ref: "Athlete"
        },
        relationship_type: {
          type: String,
          required: true
        }
      }
    ]
  }
})
