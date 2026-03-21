export default defineEventHandler(async event => {
  const data = await readValidatedBody(event, body => AthleteFormTypeSchema.safeParseAsync(body))

  if (data.success) {
    try {
      if (data.data.relations?.length) {
        for (const relation of data.data.relations) {
          const splitType = relation.type.split("-")

          await AthleteSchema.findByIdAndUpdate(relation.athlete, {
            $addToSet: { relations: { athlete: relation.athlete, type: splitType[1]?.trim() ?? "" } }
          })

          const relationship = {
            ...relation,
            type: splitType[0]?.trim() ?? ""
          }

          // Replace the relation in data.data.relations with the updated relationship
          const index = data.data.relations.findIndex(r => r.athlete === relation.athlete && r.type === relation.type)
          if (index !== -1) {
            data.data.relations[index] = relationship
          }
        }
      }

      await new AthleteSchema(data.data).save()

      return { success: true }
    } catch (error) {
      console.error("Error creating athlete:", error)
      throw new Error("Failed to create athlete")
    }
  } else {
    console.error("Validation error:", data.error)
    throw new Error("Invalid request data")
  }
})
