import SalesCampaignBanner from '@/components/layout/SalesCampaignBanner';
import ProductGrid from '@/components/product/ProductGrid';
import { getCategoryBySlug, getProductsCategorySlug } from '@/sanity/lib/client';
import React from 'react'


type categoryPageProps = {
params: Promise<{ slug: string}>
}

const categoryPage = async ({params} : categoryPageProps)  => {
    const { slug } = await params;

    const [category, products] = await Promise.all([
        getCategoryBySlug(slug),
        getProductsCategorySlug(slug)
        
    ])

  return (
    <div>
        <SalesCampaignBanner />

        <div className='bg-red-50 p-4'>
            <div className='container mx-auto'>
                
            </div>
        </div>


        <section className='container mx-auto py-8'>
           

            <ProductGrid products={products} categories={[category]}/>
        </section>
    </div>
  )
}

export default categoryPage