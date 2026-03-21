import { literal, number, object, string, z } from "zod"
import { CalendarDate } from "@internationalized/date"

export const GamesTypeSchema = object({
  _id: string().optional(),
  not_held: string().optional(),
  year: number().int().positive(),
  season: literal(["Summer", "Winter"]),
  number: string().optional(),
  host: object({
    city: string().min(1, "Host city is required"),
    country: string().min(3, "Host country is required")
  }),
  dates: object({
    opening_ceremony: z
      .instanceof(CalendarDate)
      .transform(date => date.toString())
      .optional(),
    closing_ceremony: z
      .instanceof(CalendarDate)
      .transform(date => date.toString())
      .optional(),
    start: z
      .instanceof(CalendarDate)
      .transform(date => date.toString())
      .optional(),
    end: z
      .instanceof(CalendarDate)
      .transform(date => date.toString())
      .optional()
  })
})

export type GamesInputType = z.input<typeof GamesTypeSchema>
export type GamesType = z.infer<typeof GamesTypeSchema>
