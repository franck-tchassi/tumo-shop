
import { getReviewsForProduct, getReviewStats } from '@/actions/review';
import ProductGallery from '@/components/DetailProduct/ProductGallery';
import { getProductById } from '@/sanity/lib/client';
import { ChevronRight, Home } from 'lucide-react'
import Link from 'next/link';
import React from 'react';

type productPageProps = {
    params: Promise<{ id: string, locale: string}>
}
const ProductPage = async ({ params }: productPageProps) => {

    const { id, locale } = await params
    const product = await getProductById(id);
    const { averageRating, reviewCount } = await getReviewStats(id)
    const reviews = await getReviewsForProduct(id)

    const getFullCategoryPath = (category: any) => {
        const path = [];
        
        if (category.parent) {
            path.push({
                _id: category.parent._id,
                title: category.parent.title,
                slug: category.parent.slug.current
            });
        }
        
        path.push({
            _id: category._id,
            title: category.title,
            slug: category.slug.current
        });

        return path;
    };

    const categoryPath = product?.categories?.[0] 
        ? getFullCategoryPath(product?.categories[0])
        : [];

    return (
        <div className='bg-gray-50 px-6 md:px-32'>

                {/* Breadcrumb Navigation */}
            
                <div className='container mx-auto py-3 '>
                    <div className='flex items-center gap-2 text-sm flex-wrap'>
                        <Link
                            href={`/${locale}`}
                            className='hover:text-gray-600 text-gray-400 transition-colors flex items-center gap-1'
                        >
                            <Home className='w-4 h-4' />
                            <span>Home</span>
                        </Link>
                        
                        {categoryPath.map((category) => (
                            <React.Fragment key={category._id}>
                                <ChevronRight className='w-4 h-4 text-gray-400' />
                                <Link
                                    href={`/${locale}/categories/${category.slug}`}
                                    className='hover:text-gray-600 text-gray-400 transition-colors'
                                >
                                    {category.title}
                                </Link>
                            </React.Fragment>
                        ))}
                        
                        <ChevronRight className='w-4 h-4 text-gray-400' />
                        <span className='text-gray-600 truncate'>
                            {product?.title}
                        </span>
                    </div>
                
                </div>

            
                <ProductGallery 
                    product={{ 
                        ...product, 
                        averageRating, 
                        reviewCount,
                        reviews // seulement si vous voulez les inclure dans product
                    }}
                    reviews={reviews}
                    averageRating={averageRating}
                    reviewCount={reviewCount}
                    locale={locale}
                />
        </div>
    );
};

export default ProductPage;