import { defineType, defineField } from "sanity";



export const promotionCode = defineType({
    name: "promotionCode",
    title: "Promotion Code",
    type: "document",
    fields: [
      defineField({
        name: "code",
        title: "Code",
        type: "string",
        validation: (Rule) => Rule.required(), // <-- empêche d'enregistrer sans code
      }),
      defineField({
        name: "discountPercentage",
        title: "Discount Percentage (%)",
        type: "number",
      }),
      defineField({
        name: "expirationDate",
        title: "Expiration Date",
        type: "date",
      }),
    ],
  
    preview: {
      select: {
        title: 'code', // <-- le titre du document
        subtitle: 'discountPercentage', // <-- le sous-titre est basé sur "discountPercentage"
      },
      prepare(selection) {
        const { title, subtitle } = selection
        return {
          title: title || 'New Promotion Code', // Si "code" est vide
          subtitle: subtitle ? `${subtitle}%` : 'No discount available', // Ajoute la remise en pourcentage
        }
      },
    },
  })  