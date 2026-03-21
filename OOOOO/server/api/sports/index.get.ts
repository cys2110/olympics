export default defineEventHandler(async () => {
  try {
    return await SportSchema.find().sort({ name: 1 }).exec()
  } catch (error) {
    console.error("Error fetching sports:", error)

    throw new Error("Failed to fetch sports")
  }
})
