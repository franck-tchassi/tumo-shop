import {createClient}  from 'next-sanity'

import { dataset, projectId } from '../env'
import { sanityFetch } from './live'
import { Product, ProductCategory } from '@/sanity.types'


export const client = createClient({
  apiVersion: "v2021-03-25",
  dataset,
  projectId,
  useCdn: true,
  
})

export const getAllProducts = async () =>{
  const query = `*[_type == "product"]`
  const products = await sanityFetch({query: query})
  return products.data as Product[]
}

export const getAllCategories = async () =>{
  const query = `*[_type == "productCategory"]`
  const categories = await sanityFetch({query: query})
  return categories.data as ProductCategory[]
}

export const getCategoryBySlug = async (slug: string) =>{
  const query = `*[_type == "productCategory" && slug.current == $slug][0]`
  const category = await sanityFetch({query: query, params: {slug}});
  return category.data as ProductCategory;
}

export const getProductsCategorySlug = async (slug: string) =>{
  const query = `*[_type == "product" && references(*[_type == "productCategory" && slug.current == $slug][0]._id)]`
  const products = await sanityFetch({query: query, params: {slug}});
  return products.data as Product[];

}


export const getProductById = async (id: string) => {
  const query = `*[_type == "product" && _id == $id][0]{
    ...,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[]{
      ...,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions,
      alt,
      caption
    },
    "categories": categories[]->{
      _id,
      title,
      "slug": slug.current,
      "parent": parent->{
        _id,
        title,
        "slug": slug.current
      }
    }
  }`;
  const product = await sanityFetch({ query: query, params: { id }});
  return product.data as Product;
};

export const searchProducts = async (searchQuery: string) => {
  const query = `*[_type == "product" && (
    title match "*" + $searchQuery + "*" ||
    description match "*" + $searchQuery + "*" ||
    category-> title match "*" + $searchQuery + "*" ||
    category-> slug.current match "*" + $searchQuery + "*"
  )]`;

  const products = await sanityFetch({query: query, params: { searchQuery }})
  return products.data as Product[];
}