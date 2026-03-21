export default defineEventHandler(async () => {
  try {
    return await DisciplineSchema.find().populate("sport").sort({ name: 1 }).exec()
  } catch (error) {
    console.error("Error fetching disciplines:", error)

    throw new Error("Failed to fetch disciplines")
  }
})
