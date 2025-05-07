import SalesCampaignBanner from '@/components/layout/SalesCampaignBanner';
import ProductGrid from '@/components/product/ProductGrid';
import { searchProducts } from '@/sanity/lib/client';
import React from 'react'


type SearchPageProps = {
  searchParams: Promise<{ query: string}>
}

const categoryPage = async ({searchParams} : SearchPageProps)  => {
    const { query } = await searchParams;

    const products = await searchProducts(query);

  return (
    <div>

        <section className='container mx-auto py-8'>
            <div className='text-center mb-8'>
                <p className='text-sm '>Learn more about this selection</p>
            </div>

            <ProductGrid products={products} categories={[]}/>
        </section>
    </div>
  )
}

export default categoryPage