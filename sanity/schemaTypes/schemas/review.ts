// schemas/review.js
import { defineType, defineField } from "sanity";

export const review = defineType({
  name: "review",
  title: "Product Review",
  type: "document",
  fields: [
    defineField({
      name: "userId",
      title: "User ID",
      type: "string",
      description: "ID de l'utilisateur dans PostgreSQL",
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "product",
      title: "Product",
      type: "reference",
      to: [{ type: "product" }],
      validation: Rule => Rule.required()
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      options: {
        list: [1, 2, 3, 4, 5].map(num => ({
          title: `${'★'.repeat(num)}${'☆'.repeat(5-num)} (${num})`,
          value: num
        })),
        layout: "dropdown"
      },
      validation: Rule => Rule.required().min(1).max(5)
    }),
    defineField({
      name: "comment",
      title: "Comment",
      type: "text",
      validation: Rule => Rule.required().min(10).max(500)
    }),
    defineField({
      name: "proofImages",
      title: "Proof Images",
      type: "array",
      of: [{ type: "image" }],
      validation: Rule => Rule.max(3)
    }),
    defineField({
      name: "isVerified",
      title: "Verified Purchase",
      type: "boolean",
      description: "La commande a été vérifiée dans PostgreSQL",
      initialValue: false
    })
  ],
  preview: {
    select: {
      rating: 'rating',
      comment: 'comment',
      product: 'product.title'
    },
    prepare({ rating, comment, product }) {
      return {
        title: `${'★'.repeat(rating)} - ${product}`,
        subtitle: comment ? `${comment.substring(0, 50)}...` : 'No comment'
      }
    }
  }
});