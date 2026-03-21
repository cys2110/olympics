export default defineEventHandler(async event => {
  const data = await readValidatedBody(event, body => DisciplineTypeSchema.safeParseAsync(body))

  if (data.success) {
    try {
      await new DisciplineSchema(data.data).save()

      return { success: true }
    } catch (error) {
      console.error("Error creating discipline:", error)
      throw new Error("Failed to create discipline")
    }
  } else {
    console.error("Validation error:", data.error)
    throw new Error("Invalid request data")
  }
})
