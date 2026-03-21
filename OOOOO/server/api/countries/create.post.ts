export default defineEventHandler(async event => {
  const data = await readValidatedBody(event, body => CountryTypeSchema.safeParseAsync(body))

  if (data.success) {
    try {
      await new CountrySchema(data.data).save()

      return { success: true }
    } catch (error) {
      console.error("Error creating country:", error)
      throw new Error("Failed to create country")
    }
  } else {
    console.error("Validation error:", data.error)
    throw new Error("Invalid request data")
  }
})
