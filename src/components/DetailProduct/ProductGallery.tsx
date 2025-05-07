// app/(landing)/product/[id]/ProductGallery.tsx
'use client';

import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useGalleryStore } from '@/stores/useGalleryStore';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import CommentForm from '../review/CommentForm';

interface Review {
    id: number;
    productId: string;
    userId: number;
    rating: number;
    comment: string | null;
    createdAt: Date;
    updatedAt: Date;
    user: {
      email: string;
    };
}
  
interface ProductGalleryProps {
    product: any; // Vous pouvez remplacer 'any' par un type plus spécifique si disponible
    reviews?: Review[];
    averageRating?: number;
    reviewCount?: number;
}

export default function ProductGallery({ product, reviews = [], averageRating = 0, reviewCount = 0 }: ProductGalleryProps) {
  const { mainImage, setMainImage, hoveredImage, setHoveredImage, resetGallery } = useGalleryStore();
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);


  // Initialisation
  useEffect(() => {
    // Réinitialisation complète
    resetGallery();
    // Chargement de la nouvelle image
    setMainImage(product.gallery?.[0] || null);
    setCurrentIndex(0);
    setZoomPos({ x: 50, y: 50 });
    setIsHovering(false);
    setHoveredImage(null);
  }, [product.gallery, resetGallery, setMainImage, setHoveredImage]);  
  

  // Navigation entre images
  const navigateImage = (direction: 'left' | 'right') => {
    if (!product.gallery) return;
    
    const newIndex = direction === 'left' 
      ? (currentIndex - 1 + product.gallery.length) % product.gallery.length
      : (currentIndex + 1) % product.gallery.length;
    
    setCurrentIndex(newIndex);
    setMainImage(product.gallery[newIndex]);
    setZoomPos({ x: 50, y: 50 });
  };

  // Gestion des touches clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') navigateImage('left');
      if (e.key === 'ArrowRight') navigateImage('right');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, product.gallery]);

  // Gestion du survol
  useEffect(() => {
    if (hoveredImage) {
      const timer = setTimeout(() => {
        const newIndex = product.gallery.findIndex((img: any) => img === hoveredImage);
        setCurrentIndex(newIndex);
        setMainImage(hoveredImage);
        setZoomPos({ x: 50, y: 50 });
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [hoveredImage, setMainImage, product.gallery]);

  // Gestion du zoom
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setZoomPos({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100
    });
  };

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col md:flex-row gap-2'>
        {/* Miniatures à gauche */}
        <div className='flex md:flex-col gap-2 order-2 md:order-1 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0'>
          {product.gallery?.map((item: any, index: number) => (
            <div 
              key={index} 
              className={`relative w-16 h-16 md:w-20 md:h-20 rounded-md overflow-hidden border-2 flex-shrink-0 cursor-pointer transition-all
                ${mainImage === item ? 'border-blue-500' : 'border-gray-200 hover:border-gray-400'}`}
              onMouseEnter={() => setHoveredImage(item)}
              onClick={() => {
                setCurrentIndex(index);
                setMainImage(item);
                setZoomPos({ x: 50, y: 50 });
              }}
            >
              <Image
                src={urlForImage(item)}
                alt={item.alt || product.title || `Gallery image ${index + 1}`}
                fill
                className='object-cover'
              />
            </div>
          ))}
        </div>
        
        {/* Image principale avec chevrons horizontaux */}
        <div 
          ref={containerRef}
          className='order-1 md:order-2 w-full md:w-[600px] relative overflow-hidden bg-white rounded-lg border border-gray-200'
          style={{ 
            aspectRatio: '1/1',
            cursor: isHovering ? 'zoom-in' : 'default'
          }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => {
            setIsHovering(false);
            setZoomPos({ x: 50, y: 50 });
          }}
          onMouseMove={handleMouseMove}
        >
          {mainImage && (
            <div className='relative w-full h-full'>
              {/* Image normale */}
              <Image
                src={urlForImage(mainImage)}
                alt={mainImage.alt || product.title || 'Main product image'}
                fill
                className={`object-contain p-4 transition-opacity duration-200 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
                priority
              />
              
              {/* Image zoomée (125%) */}
              <div 
                className={`absolute inset-0 transition-opacity duration-200 ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                style={{ 
                  backgroundImage: `url(${urlForImage(mainImage)})`,
                  backgroundSize: '125%',
                  backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                  backgroundRepeat: 'no-repeat',
                  cursor: 'zoom-out'
                }}
              />
            </div>
          )}
          
          {/* Chevrons de navigation horizontaux */}
          {product.gallery?.length > 1 && (
            <>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('left');
                }}
                className='absolute left-2 cursor-pointer top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 transition-all hover:scale-110'
                aria-label='Image précédente'
              >
                <ChevronLeft className='w-8 h-8 text-gray-700' />
              </button>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage('right');
                }}
                className='absolute right-2 cursor-pointer top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md z-10 transition-all hover:scale-110'
                aria-label='Image suivante'
              >
                <ChevronRight className='w-8 h-8 text-gray-700' />
              </button>
            </>
          )}
        </div>
        
        {/* Détails produit */}
        <div className='order-3 md:flex-1'>
            <div className='font-semibold mb-4 bg-green-100  flex items-center justify-start gap-1 p-2'>
                <Check  className='text-green-900 w-5 h-5' />
                <p>Free shipping</p>
            </div>
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h1 className='text-lg text-gray-600  mb-2'>{product.description}</h1>

            <div className="flex items-center gap-2 justify-end">
              {/* Note numérique */}
              <span className="text-sm font-bold text-gray-900">
                {averageRating.toFixed(1)}
              </span>
              
              {/* Étoiles agrandies - version simplifiée */}
              <div className="flex  items-center justify-center ">
              {[1, 2, 3, 4, 5].map((star) => {
                const filled = Math.max(0, Math.min(1, averageRating - star + 1));
                
                return (
                  <span 
                    key={star} 
                    className="relative flex items-center justify-center" 
                    style={{ width: '1.2em', height: '1.2em' }}
                  >
                    {/* Étoile grise (fond) */}
                    <span className="text-gray-300 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      ★
                    </span>
                    
                    {/* Partie jaune remplie */}
                    {filled > 0 && (
                      <span 
                        className="text-yellow-500 text-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                        style={{ width: `${filled * 100}%` }}
                      >
                        ★
                      </span>
                    )}
                  </span>
                );
              })}
            </div>
            </div>

            <div className='text-xl font-bold text-black mb-4'>
              ${product.price?.toFixed(2)}
            </div>

            <div className='border-2 border-green-100 mb-4'>

                <div className='flex items-center justify-between bg-green-100 p-2'>
                    <span>Top picks</span>
                    <ChevronRight className='w-5 h-5' />
                </div>
                <div className='p-2 flex flex-col gap-3'>
                    {/* Affiche les tailles de vêtements si disponibles */}

                    <div className='flex flex-col gap-2'>
                        <span>Size:</span>
                        <div className='flex gap-2'>
                            {product.clothingSizes?.length > 0 && (
                                product.clothingSizes.map((size: any, index: number) => (
                                    <button
                                        key={`clothing-${index}`}
                                        className="px-3 py-1 border border-dashed rounded-md hover:border-black transition-colors cursor-pointer"
                                    >
                                        {size.size.toUpperCase()}
                                    </button>
                                ))
                            )}
                            
                            {/* Affiche les tailles de chaussures si disponibles */}
                            {product.shoeSizes?.length > 0 && (
                                product.shoeSizes.map((size: any, index: number) => (
                                    <button
                                        key={`shoe-${index}`}
                                        className="px-3 py-1 border border-dashed rounded-md hover:border-black transition-colors cursor-pointer"
                                    >
                                        EU {size.euSize}
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    <div>
                        <span>Qty</span>
                    </div>
                </div>
            </div>

            <button className='w-full py-3 font-semibold cursor-pointer  border-black border transition-colors'>
              Add to cart
            </button>

            {/*  Section avis */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Avis clients</h3>
                <div className="flex items-center mb-2">
                {/* Note numérique */}
                <span className="text-lg font-bold text-gray-900 mr-2">
                    {averageRating.toFixed(1)}
                </span>
                
                {/* Étoiles avec précision décimale */}
                <div className="flex relative mr-2">
                    {[1, 2, 3, 4, 5].map((star) => {
                    const filled = Math.max(0, Math.min(1, averageRating - star + 1));
                    
                    return (
                        <span key={star} className="relative" style={{ width: '1em', height: '1em' }}>
                        {/* Fond gris */}
                        <span className="text-gray-300 absolute">★</span>
                        
                        {/* Partie jaune (pleine ou partielle) */}
                        {filled > 0 && (
                            <span 
                            className="text-yellow-500 absolute top-0 left-0 overflow-hidden"
                            style={{ width: `${filled * 100}%` }}
                            >
                            ★
                            </span>
                        )}
                        </span>
                    );
                    })}
                </div>
                
                {/* Nombre d'avis */}
                <span className="text-sm text-gray-500">
                    ({reviewCount} reviews)
                </span>
                </div>

                {reviews.map((review) => (
                <div key={review.id} className="border-b py-4">
                    <div className="flex items-center mb-1">
                    <span className="font-medium">{review.user.email}</span>
                    <div className="flex ml-2">
                        {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                            ★
                        </span>
                        ))}
                    </div>
                    </div>
                    {review.comment && <p className="text-gray-600 text-sm">{review.comment}</p>}
                    <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.createdAt).toLocaleDateString()}
                    </p>
                </div>
                ))}

                
                <CommentForm productId={product._id} />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}