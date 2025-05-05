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
      validation: Rule => [
        Rule.required().error("Un code promo est obligatoire"),
        Rule.regex(/^[A-Z0-9]+$/i).error("Utilisez seulement des lettres et chiffres")
      ],
    }),
    defineField({
      name: "discountType",
      title: "Discount Type",
      type: "string",
      options: {
        list: [
          { title: "Percentage", value: "percentage" },
          { title: "Fixed Amount", value: "fixed" },
        ],
        layout: "radio", // Ou "dropdown"
      },
      initialValue: "percentage",
    }),
    defineField({
      name: "discountValue",
      title: "Discount Value",
      type: "number",
      validation: Rule => Rule.min(0),
      description: "Pourcentage ou montant fixe selon le type choisi",
    }),
    defineField({
      name: "applicableTo", // Nouveau champ
      title: "Applicable To",
      type: "array",
      of: [{ type: "reference", to: [{ type: "productCategory" }] }],
      description: "Lier à des catégories spécifiques (laisser vide pour toutes)",
    }),
    defineField({
      name: "expirationDate",
      title: "Expiration Date",
      type: "datetime", // Plus précis que 'date'
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
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