"use client"

import { Product } from '@/sanity.types'
import { urlForImage } from '@/sanity/lib/image'
import Image from 'next/image'
import Link from 'next/link'
import { BiCartAdd } from "react-icons/bi";

type ProductItemProps = {
  product: Product
}

const ProductItem = ({ product }: ProductItemProps) => {
  // Calcul des valeurs dynamiques
  const originalPrice = (product.price || 0) * 1.3
  const soldCount = 100 + Math.abs(product._id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) % 100)
  
  return (
    <Link href={`/product/${product._id}`} className="group block">
      <div className="relative bg-white rounded-md overflow-hidden p-2 hover:shadow-md transition-all">
        {/* Image produit */}
        <div className="relative w-full aspect-square bg-gray-50">
          {product.mainImage && (
            <Image
              src={urlForImage(product.mainImage as any)}
              alt={product.title || 'Product Image'}
              fill
              className="object-contain p-1 group-hover:scale-105 transition-transform"
              loading="lazy"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            />
          )}
        </div>

        {/* Contenu texte sous l'image */}
        <div className="space-y-1 p-1">
          {/* Titre produit */}
          <h3 className="text-sm text-gray-800 truncate  mx-auto px-1">
            {product.title}
          </h3>

          {/* Prix et actions */}
          <div className="flex items-center justify-between mt-2">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-black/">${(product.price || 0).toFixed(2)}</span>
                <span className="text-xs text-gray-400 line-through">${originalPrice.toFixed(2)}</span>
              </div>
              <div className="text-xs text-gray-500">{soldCount}+ sold</div>
            </div>

            {/* Bouton panier */}
            
            <button
              className="absolute bottom-2 right-2 h-8 w-12 cursor-pointer rounded-full border border-black flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              
              }}
            >
              <BiCartAdd  className='w-6 h-6'/>
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem