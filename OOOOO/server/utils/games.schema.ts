import { literal, number, object, string, z } from "zod"

export const GamesFormTypeSchema = object({
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
    opening_ceremony: string().optional(),
    closing_ceremony: string().optional(),
    start: string().optional(),
    end: string().optional()
  })
})

export type GamesFormType = z.infer<typeof GamesFormTypeSchema>
