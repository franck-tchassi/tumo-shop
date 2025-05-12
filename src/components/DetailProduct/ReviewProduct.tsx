
import React from 'react';
import { Star, StarHalf } from 'lucide-react';
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

interface ReviewProductProps {
  averageRating: number;
  reviewCount: number;
  reviews: Review[];
  productId: string; 
  locale: string;
}

const ReviewProduct: React.FC<ReviewProductProps> = ({ averageRating, reviewCount, reviews, productId, locale}) => {


  // Calculer la distribution des notes
  const ratingDistribution = [0, 0, 0, 0, 0];
  reviews.forEach(review => {
    if (review.rating >= 1 && review.rating <= 5) {
      ratingDistribution[5 - review.rating]++;
    }
  });
  
 

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
      <div className='flex items-center gap-8 mb-4'>
        <h3 className="text-lg font-bold text-gray-800">Customer Reviews</h3>
        {/* CommentForm  */}
        <CommentForm productId={productId} locale={locale}/>
      </div>
      
      {/* Résumé des notes */}
      <div className="flex items-start mb-6">
        <div className="text-center mr-6">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center mb-1">
            {[1, 2, 3, 4, 5].map((star) => {
              const starRating = averageRating - star + 1;
              if (starRating >= 1) return <Star key={star} className="w-5 h-5 fill-black text-black" />;
              if (starRating > 0) return <StarHalf key={star} className="w-5 h-5 fill-black text-black" />;
              return <Star key={star} className="w-5 h-5 fill-gray-300 text-gray-300" />;
            })}
          </div>
          <div className="text-sm text-gray-500">
            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
          </div>
        </div>
        
        {/* Distribution des notes */}
        <div className="flex-1">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className="flex items-center mb-2">
              <span className="text-sm font-medium w-8">{rating} star</span>
              <div className="flex-1 mx-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-black" 
                  style={{ 
                    width: `${reviewCount > 0 ? (ratingDistribution[index] / reviewCount) * 100 : 0}%` 
                  }}
                />
              </div>
              <span className="text-xs text-gray-500 w-8 text-right">
                {reviewCount > 0 ? Math.round((ratingDistribution[index] / reviewCount) * 100) : 0}%
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Liste des avis */}
      <div className="space-y-4">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review.id} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
              <div className="flex items-center mb-1">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium text-gray-600 mr-2">
                  {review.user.email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{review.user.email.split('@')[0]}</p>
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-3 h-3 ${i < review.rating ? 'fill-black text-black' : 'fill-gray-300 text-gray-300'}`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
              </div>
              {review.comment && (
                <p className="text-sm text-gray-700 mt-2">{review.comment}</p>
              )}
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
        )}
      </div>
      
    </div>
  );
};

export default ReviewProduct;