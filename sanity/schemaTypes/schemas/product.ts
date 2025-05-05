import { defineType, defineField } from "sanity";
import { galleryImage } from "./galleryImage";

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: Rule => Rule.required()
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text"
    }),

    defineField({
      name: "price",
      title: "Price",
      type: "number",
      validation: Rule => Rule.required().positive()
    }),

    defineField({
      name: "originalPrice",
      title: "Original Price",
      type: "number"
    }),

    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "galleryImage" }],
      validation: Rule => Rule.max(10)
    }),

    defineField({
      name: "productVideo",
      title: "Product Video",
      type: "file",
      options: {
        accept: "video/mp4,video/webm"
      }
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 100
      },
      validation: Rule => Rule.required()
    }),

    defineField({
      name: "inventory",
      title: "Inventory",
      type: "object",
      fields: [
        defineField({
          name: "stock",
          title: "Stock Quantity",
          type: "number",
          initialValue: 0,
          validation: Rule => Rule.required().min(0)
        }),
        defineField({
          name: "sku",
          title: "SKU",
          type: "string"
        }),
        defineField({
          name: "manageStock",
          title: "Manage Stock",
          type: "boolean",
          initialValue: true
        })
      ]
    }),

    // Tailles vêtements
    defineField({
      name: "clothingSizes",
      title: "Available Clothing Sizes",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({
            name: "size",
            title: "Size",
            type: "string",
            options: {
              list: [
                { title: "XXS", value: "xxs" },
                { title: "XS", value: "xs" },
                { title: "S", value: "s" },
                { title: "M", value: "m" },
                { title: "L", value: "l" },
                { title: "XL", value: "xl" },
                { title: "XXL", value: "xxl" },
                { title: "XXXL", value: "xxxl" },
                { title: "Taille Unique", value: "one-size" }
              ]
            },
            validation: Rule => Rule.required()
          }),
          defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            initialValue: 0
          })
        ]
      }]
    }),

    // Tailles chaussures EU + US
    defineField({
      name: "shoeSizes",
      title: "Available Shoe Sizes",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({
            name: "euSize",
            title: "EU Size",
            type: "number",
            options: {
              list: Array.from({ length: 20 }, (_, i) => {
                const size = 35 + i * 0.5;
                return { title: size.toString(), value: size };
              })
            },
            //validation: Rule => Rule.required()
          }),
          defineField({
            name: "usSize",
            title: "US Size",
            type: "number",
            options: {
              list: [4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12]
            }
          }),
          defineField({
            name: "stock",
            title: "Stock",
            type: "number",
            initialValue: 0
          })
        ]
      }]
    }),

    // Couleur personnalisable
    /*
    defineField({
      name: "colorProduct",
      title: "ColorProduct",
      type: "array",
      of: [{
        type: "string",
        options: {
          layout: 'tags' // ✅ Affiche les couleurs comme des tags
        }
      }],
      description: "Ajoutez une ou plusieurs couleurs (ex: Black, Red, Navy, etc.)",
      validation: Rule => Rule.unique().min(1)
    }),  */
    


    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "productCategory" }] }],
      validation: Rule => Rule.required().min(1)
    }),

    defineField({
      name: "reviewStats",
      title: "Review Statistics",
      type: "object",
      fields: [
        defineField({
          name: "averageRating",
          title: "Average Rating",
          type: "number",
          initialValue: 0,
          validation: Rule => Rule.min(0).max(5).precision(1)
        }),
        defineField({
          name: "reviewCount",
          title: "Review Count",
          type: "number",
          initialValue: 0
        })
      ]
    })
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
      stock: 'inventory.stock',
      clothingSizes: 'clothingSizes',
      shoeSizes: 'shoeSizes',
      //colorProduct: 'colorProduct'
    },
    prepare(selection) {
      const { title, media, stock, clothingSizes, shoeSizes} = selection;
      return {
        title,
        subtitle: [
          stock !== undefined ? `Stock: ${stock}` : '',
          clothingSizes?.length ? `${clothingSizes.length} tailles vêtements` : '',
          shoeSizes?.length ? `${shoeSizes.length} tailles chaussures` : ''
        ].filter(Boolean).join(' | '),
        media,
        //colorProduct
      };
    }
  }
});


