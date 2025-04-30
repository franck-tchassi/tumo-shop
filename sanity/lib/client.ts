import {createClient}  from 'next-sanity'

import { dataset, projectId } from '../env'
import { sanityFetch } from './live'
import { Product } from '@/sanity.types'

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