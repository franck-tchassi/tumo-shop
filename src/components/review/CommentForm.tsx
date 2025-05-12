'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Star, StarHalf } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { toast } from 'sonner'; // Changement ici

export function StarRating({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) {
  return (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((star) => {
        const starRating = star;
        return (
          <button
            key={star}
            type="button"
            onClick={() => setRating(starRating)}
            className="focus:outline-none cursor-pointer"
          >
            {rating >= starRating ? (
              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ) : rating >= starRating - 0.5 ? (
              <StarHalf className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ) : (
              <Star className="w-6 h-6 fill-gray-300 text-gray-300" />
            )}
          </button>
        );
      })}
    </div>
  );
}

export default function CommentForm({ productId, locale }: { productId: string, locale: string }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/${locale}/api/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          productId, 
          rating, 
          comment 
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to submit review');
      }

      setComment('');
      setRating(5);
      setIsDialogOpen(false);
      router.refresh();

      toast.success('Votre avis a été publié avec succès !'); // Changement ici
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Une erreur est survenue"); // Changement ici
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="  cursor-pointer">
        Give your feedback
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Share your experience</DialogTitle>
          <DialogDescription>
           Your review helps other customers make their choice.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="rating">Your rating</Label>
            <StarRating rating={rating} setRating={setRating}  />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="comment">Your comment</Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Describe your experience with this product..."
              className="min-h-[120px]"
              required
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              className='cursor-pointer'
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className='cursor-pointer'
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : 'Post my review'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}