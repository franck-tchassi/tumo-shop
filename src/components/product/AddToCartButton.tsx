"use client";

import { Product } from '@/sanity.types';
import React, { useState } from 'react';

type AddToCartButtonProps = {
    product: Product;
}

const AddToCartButton = ({ product }: AddToCartButtonProps) => {
    
    const [isLoading, setLoading] = useState(false)
    const handleAddToCart = async () => {
        setLoading(true);

        // Add the item to the cart
        await new Promise(resolve => setTimeout(resolve, 1000))

        setLoading(false);
    }

    if (!product.price) {
        return null;
    }

    return (
        <button
            onClick={handleAddToCart}
            className={`
                w-md mt-6 bg-white border-2 border-black
                text-black py-3 rounded-full font-bold text-xl
                hover:bg-gray-50 hover:shadow-lg
                active:bg-gray-100 active:shadow-md
                transition-all duration-200 ease-in-out
                shadow-md flex items-center justify-center gap-3
                disabled:opacity-60 disabled:cursor-not-allowed
                disabled:hover:bg-white disabled:hover:shadow-md
                cursor-pointer
            `}
        >
            Add to cart
        </button>
    );
};

export default AddToCartButton;