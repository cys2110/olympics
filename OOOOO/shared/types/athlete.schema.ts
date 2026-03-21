import z, { array, literal, object, string } from "zod"
import { CalendarDate } from "@internationalized/date"

export const AthleteTypeSchema = object({
  _id: string().optional(),
  first_name: string("First name is required"),
  last_name: string("Last name is required"),
  name_order: literal(["western", "eastern"]),
  sex: literal(["M", "W"]),
  dob: z
    .instanceof(CalendarDate)
    .transform(date => date.toString())
    .optional(),
  dod: z
    .instanceof(CalendarDate)
    .transform(date => date.toString())
    .optional(),
  nocs: array(string()),
  nationalities: array(string()).optional(),
  relations: array(
    object({
      athlete: object({
        _id: string("Related athlete ID is required"),
        name: string("Related athlete name is required")
      }),
      type: string("Relationship type is required")
    })
  ).optional()
})

export type AthleteInputType = z.input<typeof AthleteTypeSchema>
export type AthleteType = z.infer<typeof AthleteTypeSchema>
