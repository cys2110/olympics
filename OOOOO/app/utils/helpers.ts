import { kebabCase } from "lodash"

export const dateTimeFormat = new Intl.DateTimeFormat("en-GB", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC"
})

/** Function to get flag icon for country */
export const getFlagCode = (country: CountryType) => {
  const circleFlagsMapping: Record<typeof country.ioc_code, string> = {
    URS: "soviet-union",
    YUG: "yu",
    TCH: "cs",
    NMI: "mp"
  }

  if (country.ioc_code in circleFlagsMapping) {
    return `circle-flags:${circleFlagsMapping[country.ioc_code]}`
  } else if (!country.alpha2_code) {
    if (country.ioc_code === "POC") {
      return "flag:pc-4x3"
    }
    return `twemoji:flag-${kebabCase(country.name)}`
  } else if (["ch", "np"].includes(country.alpha2_code)) {
    return `flag:${country.alpha2_code}-1x1`
  }
  return `flag:${country.alpha2_code}-4x3`
}
