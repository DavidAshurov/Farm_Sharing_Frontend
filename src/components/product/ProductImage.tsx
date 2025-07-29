interface ProductImageProps {
    src: string;
    title: string;
    isFavorite: boolean;
    onFavoriteToggle: () => void;
}

const ProductImage = ({ src, title, isFavorite, onFavoriteToggle }: ProductImageProps) => {
    return (
        <div className="relative rounded-xl overflow-hidden group">
            <img
                src={src}
                alt={title}
                className="w-full h-64 object-cover transition-all duration-300 group-hover:scale-105"
            />

            {/* Кнопка избранного */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onFavoriteToggle();
                }}
                className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2
                 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
                {isFavorite ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                )}
            </button>

            {/* Категория товара - опциональный бейдж */}
            <div className="absolute top-3 left-3 bg-primary/80 text-white text-xs px-2 py-1
                    rounded-full backdrop-blur-sm">
                {title}
            </div>
        </div>
    );
};

export default ProductImage;