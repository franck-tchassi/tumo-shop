"use client"

import { ProductCategory, ProductWithDetails } from '@/sanity.types'
import React, { useState } from 'react'
import ProductItem from './ProductItem';

type ProductGridProps = {
    products: ProductWithDetails[];
    categories: ProductCategory[];
}

const ProductGrid = ({products, categories}: ProductGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts = selectedCategory 
    ? products.filter(product => 
        product.categories?.some(cat => 
          cat._id === selectedCategory || 
          (cat.parent && cat.parent._id === selectedCategory)
        )
      )
    : products;

  // Trouver les catégories parentes (sans parent)
  const parentCategories = categories.filter(cat => !cat.parent);

  return (
    <>
      <div className='flex flex-col items-center mb-8'>
        <h1 className='font-extrabold text-xl mb-4'>EXPLORE OUR CATEGORIES</h1>
        <div className='flex flex-wrap justify-center gap-2'>
          {/* Bouton "Tous" */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full ${!selectedCategory ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'} hover:bg-gray-200 transition-colors`}
          >
            All
          </button>
          
          {/* Boutons des catégories */}
          {parentCategories.map((category) => (
            <button
              key={category._id}
              onClick={() => setSelectedCategory(category._id)}
              className={`px-4 py-2 rounded-full ${selectedCategory === category._id ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'} hover:bg-gray-200 transition-colors`}
            >
              {category.title}
            </button>
          ))}
        </div>
      </div>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-4 sm:px-6 md:px-20'>
          {filteredProducts.map((product) => (
              <ProductItem 
                key={product._id}
                product={product}
              />
          ))}
      </div>
    </>
  )
}

export default ProductGrid