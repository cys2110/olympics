import z, { array, literal, object, string } from "zod"

export const AthleteFormTypeSchema = object({
  _id: string().optional(),
  first_name: string(),
  last_name: string(),
  name_order: literal(["western", "eastern"]),
  sex: literal(["M", "W"]),
  dob: string().optional(),
  dod: string().optional(),
  nocs: array(string()),
  nationalities: array(string()).optional(),
  relations: array(
    object({
      athlete: object({
        _id: string(),
        name: string()
      }).transform(({ _id }) => _id),
      type: string()
    })
  ).optional()
})

export type AthleteFormType = z.infer<typeof AthleteFormTypeSchema>
