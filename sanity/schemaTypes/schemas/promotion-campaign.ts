import { defineType, defineField } from "sanity";



export const promotionCampaign = defineType({
    name: "promotionCampaign",
    title: "Promotion Campaign",
    type: "document",
    fields: [
      defineField({
        name: "title",
        title: "Title",
        type: "string",
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
      }),
      defineField({
        name: "code",
        title: "Code",
        type: "reference",
        to: [{ type: "promotionCode" }],
      }),
    ],
  
    preview: {
      select: {
        title: 'title',
      },
      prepare(selection) {
        const { title } = selection
        return {
          title: title || 'New Promotion Campaign',
        }
      },
    },
  })
  