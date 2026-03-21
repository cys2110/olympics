import { ObjectId } from "mongoose"

declare global {
  interface FormField<S> {
    label: string
    key: keyof S
    type: string
    subType?: string
    items?: any
    class?: string
    placeholder?: string
    labelKey?: string

    required?: boolean
    multiple?: boolean
    loading?: boolean
  }

  interface GamesInterface {
    _id: string
    not_held?: string
    year: number
    season: "Summer" | "Winter"
    number: string
    host: {
      city: string
      country: CountryType
    }
    dates: {
      opening_ceremony: string
      closing_ceremony: string
      start: string
      end: string
    }
    createdAt: string
    updatedAt: string
  }

  interface DisciplineInterface {
    _id: string
    code: string
    name: string
    sport: SportType
    season: "Summer" | "Winter"
    active: boolean
  }

  interface EventInterface {
    _id: string
    name: string
    games: GamesInterface
    sex: "M" | "W" | "Mixed"
    dates: {
      start: string
      end: string
    }
    location: {
      venue: string
      city: string
    }
    format?: string
    discipline: DisciplineInterface
    score_breakdowns?: Array<string>
    medallists: {
      gold: Array<{
        athletes: Array<AthleteInterface>
        country: CountryType
      }>
      silver: Array<{
        athletes: Array<AthleteInterface>
        country: CountryType
      }>
      bronze: Array<{
        athletes: Array<AthleteInterface>
        country: CountryType
      }>
    }
    results: Array<{
      round?: string
      format?: string
      dates?: {
        start: string
        end?: string
      }
      scores?: Array<{
        athletes: Array<AthleteInterface>
        country: CountryType
        status?: string
        points?: number
        breakdown?: {
          [key: string]: number
        }
        position?: number
      }>
    }>
  }

  interface AthleteInterface {
    _id: string
    first_name: string
    last_name: string
    name_order: "western" | "eastern"
    sex: "M" | "W"
    dob?: string
    dod?: string
    nocs: Array<CountryType>
    nationalities?: Array<CountryType>
    relations?: Array<{
      type: string
      athlete: AthleteInterface
    }>
  }
}

export {}
