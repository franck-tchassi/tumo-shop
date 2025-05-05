import { defineType, defineField } from "sanity";

export const productCategory = defineType({
  name: "productCategory",
  title: "Product Category",
  type: "document",
  fields: [
    // Champ titre (obligatoire)
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required().error("Un titre est obligatoire"),
    }),

    // Description
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),

    // Slug (généré automatiquement depuis le titre)
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 50,
      },
      validation: Rule => Rule.required(),
    }),

    // Image de la catégorie
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),

    // ► Nouveau champ : Catégorie parente (pour les sous-catégories)
    defineField({
      name: "parent",
      title: "Parent Category",
      type: "reference",
      to: [{ type: "productCategory" }],
      description: "Lier à une catégorie parente pour créer une hiérarchie.",
      options: {
        // Bloque l'auto-référence (une catégorie ne peut pas être son propre parent)
        filter: ({ document }) => ({
          filter: "_id != $id",
          params: { id: document._id },
        }),
      },
    }),
  ],

  // Aperçu amélioré dans Sanity Studio
  preview: {
    select: {
      title: 'title',
      parentTitle: 'parent.title',
      media: 'image',
    },
    prepare({ title, parentTitle, media }) {
      return {
        title: title || "Sans nom",
        subtitle: parentTitle ? `Sous-catégorie de ${parentTitle}` : "Catégorie principale",
        media,
      };
    },
  },
});