import {createClient}  from 'next-sanity'

import { dataset, projectId } from '../env'
import { sanityFetch } from './live'
import { Product, ProductCategory, ProductWithDetails, Slug } from '@/sanity.types'


export const client = createClient({
  apiVersion: "v2021-03-25",
  dataset,
  projectId,
  useCdn: true,
  
})

export const getAllProducts = async (): Promise<ProductWithDetails[]> => {
  const query = `*[_type == "product"] {
    ...,
    categories[]-> {
      _id,
      _type,
      title,
      slug,
      parent-> {
        _id,
        title,
        slug
      }
    }
  }`;
  const result = await client.fetch(query);
  return result;
};

export const getAllCategories = async () =>{
  const query = `*[_type == "productCategory"]`
  const categories = await sanityFetch({query: query})
  return categories.data as ProductCategory[]
}

export const getCategoryBySlug = async (slug: string): Promise<ProductCategory & {
  parent?: {
    _id: string;
    title?: string;
    slug?: Slug;
  };
}> => {
  const query = `*[_type == "productCategory" && slug.current == $slug][0] {
    ...,
    parent-> {
      _id,
      title,
      slug
    }
  }`;
  const category = await sanityFetch({query: query, params: {slug}});
  return category.data;
}

export const getProductsCategorySlug = async (slug: string): Promise<ProductWithDetails[]> => {
  const query = `*[_type == "product" && references(*[_type == "productCategory" && slug.current == $slug][0]._id)] {
    ...,
    categories[]-> {
      _id,
      title,
      slug,
      parent-> {
        _id,
        title,
        slug
      }
    }
  }`;
  const products = await sanityFetch({query: query, params: {slug}});
  return products.data;
}


export const getProductById = async (id: string) => {
  const query = `*[_type == "product" && _id == $id][0]{
    ...,
    "mainImage": mainImage.asset->url,
    "gallery": gallery[] {
      ...,
      "url": asset->url,
      "dimensions": asset->metadata.dimensions,
      alt,
      caption
    },
    "categories": categories[]-> {
      _id,
      title,
      "slug": slug.current,
      "parent": parent-> {
        _id,
        title,
        "slug": slug.current
      }
    },
    "reviews": *[_type == "review" && productId == ^._id]{
      _id,
      rating,
      comment,
      "userEmail": user->email,
      "createdAt": _createdAt
    } | order(_createdAt desc)
  }`;

  const product = await sanityFetch({ query, params: { id } });

  if (!product?.data) {
    return null;
  }

  const reviews = product.data.reviews || [];

  const averageRating = reviews.length
    ? Math.round(
        (reviews.reduce((sum: number, review: {rating: number}) => sum + review.rating, 0) / reviews.length) * 10
      ) / 10
    : 0;

  const reviewCount = reviews.length;
  const latestReviews = reviews.slice(0, 5); // Les 5 plus récents

  return {
    ...product.data,
    averageRating,
    reviewCount,
    reviews: latestReviews,
  } as Product & {
    averageRating: number;
    reviewCount: number;
    reviews: Array<{
      _id: string;
      rating: number;
      comment?: string;
      userEmail: string;
      createdAt: string;
    }>;
  };
};


export const searchProducts = async (searchQuery: string): Promise<ProductWithDetails[]> => {
  const query = `*[_type == "product" && (
    title match "*" + $searchQuery + "*" ||
    description match "*" + $searchQuery + "*" ||
    count(categories[@->title match "*" + $searchQuery + "*"]) > 0 ||
    count(categories[@->slug.current match "*" + $searchQuery + "*"]) > 0
  )] {
    ...,
    categories[]-> {
      _id,
      title,
      "slug": slug.current,
      parent-> {
        _id,
        title,
        "slug": slug.current
      }
    }
  }`;

  const result = await sanityFetch({ query, params: { searchQuery } });
  return result.data;
}