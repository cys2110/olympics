export default defineEventHandler(async () => {
  try {
    return await AthleteSchema.find()
      .populate("nocs")
      .populate("nationalities")
      .populate("relations.athlete")
      .sort({ last_name: 1, first_name: 1 })
      .exec()
  } catch (error) {
    console.error("Error fetching athletes:", error)

    throw new Error("Failed to fetch athletes")
  }
})
