// app/(landing)/product/[id]/ProductGallery.tsx
'use client';

import { urlForImage } from '@/sanity/lib/image';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { useGalleryStore } from '@/stores/useGalleryStore';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProductGallery({ product }: { product: any }) {
  const { mainImage, setMainImage, hoveredImage, setHoveredImage } = useGalleryStore();
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Initialisation
  useEffect(() => {
    setMainImage(product.gallery?.[0] || null);
    setCurrentIndex(0);
  }, [product.gallery, setMainImage]);

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
          <div className='bg-white p-6 rounded-lg border border-gray-200'>
            <h1 className='text-lg text-gray-600  mb-2'>{product.description}</h1>

            <div className='text-xl font-bold text-black mb-4'>
              ${product.price?.toFixed(2)}
            </div>

            <div className='font-semibold mb-4 bg-green-100  flex items-center justify-start gap-1 p-2'>
                <Check  className='text-green-900 w-5 h-5' />
                <p>Free shipping</p>
            </div>

            <div>
                <span>Size:</span>
            </div>

            <button className='w-full py-3 font-semibold cursor-pointer  border-black border transition-colors'>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}