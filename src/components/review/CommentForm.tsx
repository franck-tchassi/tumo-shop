'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StarRating } from '../StarRating';

export default function CommentForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId, 
          rating, 
          comment 
        }),
      });

      if (!res.ok) throw new Error('Erreur lors de l\'envoi');

      setComment('');
      setRating(5);
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Une erreur est survenue");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 border-t pt-6">
      <h3 className="text-lg font-semibold mb-4">Donnez votre avis</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Votre note</label>
          <StarRating rating={rating} setRating={setRating} />
        </div>
        
        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Votre commentaire
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border rounded-lg p-3 text-sm"
            rows={4}
            placeholder="Décrivez votre expérience avec ce produit..."
          />
        </div>
        
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 rounded-lg text-white ${
            isSubmitting ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon avis'}
        </button>
      </form>
    </div>
  );
}