export default defineEventHandler(async () => {
  try {
    return await CountrySchema.find().sort({ name: 1 }).exec()
  } catch (error) {
    console.error("Error fetching countries:", error)

    throw new Error("Failed to fetch countries")
  }
})
