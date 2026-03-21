import { number, object, string, url, z } from "zod"

export const CountryTypeSchema = object({
  _id: string().optional(),
  ioc_code: string().length(3, "IOC code must be 3 characters long"),
  alpha2_code: string().length(2, "Alpha-2 code must be 2 characters long").optional(),
  name: string().min(1, "Country name is required"),
  continent: ContinentEnum,
  noc_title: string().optional(),
  recognition_year: number().int().positive().optional(),
  website: url().optional()
})

export type CountryType = z.infer<typeof CountryTypeSchema>
