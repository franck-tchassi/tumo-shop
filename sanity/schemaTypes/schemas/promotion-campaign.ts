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
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "codes",
      title: "Promotion Codes",
      type: "array", // Permet plusieurs codes par campagne
      of: [{ type: "reference", to: [{ type: "promotionCode" }] }],
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "datetime",
    }),
    defineField({
      name: "products", // Lien direct aux produits concernés
      title: "Target Products",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
      description: "Produits spécifiques (prioritaire sur les catégories)",
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
  