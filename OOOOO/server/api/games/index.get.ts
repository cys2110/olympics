export default defineEventHandler(async () => {
  try {
    return await GamesSchema.find().populate("host.country").sort({ year: 1, season: 1 }).exec()
  } catch (error) {
    console.error("Error fetching games:", error)

    throw new Error("Failed to fetch games")
  }
})
