interface ProductRatingProps {
    rating: number;
    reviewCount?: number;
}

const ProductRating = ({ rating, reviewCount = 24 }: ProductRatingProps) => {
    return (
        <div className="mt-2 flex items-center">
            <div className="flex items-center">
                {/* Звезда рейтинга */}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                {/* Числовое значение рейтинга */}
                <span className="ml-1 text-sm font-medium text-gray-700">
          {rating.toFixed(1)}
        </span>

                {/* Количество отзывов */}
                <span className="ml-2 text-sm text-gray-500">
          ({reviewCount} reviews)
        </span>
            </div>
        </div>
    );
};

export default ProductRating;