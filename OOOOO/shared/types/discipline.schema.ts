import z, { boolean, literal, object, string } from "zod"

export const SportTypeSchema = object({
  _id: string().optional(),
  name: string(),
  if: string().optional()
})

export type SportType = z.infer<typeof SportTypeSchema>

export const DisciplineTypeSchema = object({
  _id: string().optional(),
  code: string().length(3, "Code must be exactly 3 characters").uppercase(),
  name: string().min(1, "Name is required"),
  sport: string().min(1, "Sport is required"),
  season: literal(["Summer", "Winter"]),
  active: boolean().default(true)
})

export type DisciplineType = z.infer<typeof DisciplineTypeSchema>
