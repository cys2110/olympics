export default defineEventHandler(async event => {
  const data = await readValidatedBody(event, body => GamesFormTypeSchema.safeParseAsync(body))

  if (data.success) {
    try {
      await new GamesSchema(data.data).save()

      return { success: true }
    } catch (error) {
      console.error("Error creating games:", error)
      throw new Error("Failed to create games")
    }
  } else {
    console.error("Validation error:", data.error)
    throw new Error("Invalid request data")
  }
})
