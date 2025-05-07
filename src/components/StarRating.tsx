'use client';

import { useState } from 'react';

export const StarRating = ({
  rating,
  setRating,
}: {
  rating: number;
  setRating: (value: number) => void;
}) => {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className={`text-2xl ${star <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
          aria-label={`Noter ${star} étoile${star > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
      <span className="ml-2 text-sm text-gray-500">{rating}/5</span>
    </div>
  );
};