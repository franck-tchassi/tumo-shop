import { defineType, defineField } from "sanity";


export const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "image",
  options: {
    hotspot: true // Permet de définir des zones focus pour le recadrage
  },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative Text",
      type: "string",
      description: "Texte alternatif pour l'accessibilité et le SEO",
      validation: Rule => Rule.required().error('Un texte alternatif est obligatoire')
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      description: "Légende optionnelle sous l'image"
    })
  ]
});