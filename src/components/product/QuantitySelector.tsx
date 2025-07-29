interface QuantitySelectorProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

const QuantitySelector = ({ quantity, onIncrease, onDecrease }: QuantitySelectorProps) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
            </label>
            <div className="flex items-center">
                <button
                    onClick={onDecrease}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
                   text-gray-600 hover:bg-gray-200 transition-colors duration-300"
                    disabled={quantity <= 1}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </button>

                <span className="mx-4 text-gray-800 font-medium w-8 text-center">
          {quantity}
        </span>

                <button
                    onClick={onIncrease}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center
                   text-gray-600 hover:bg-gray-200 transition-colors duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default QuantitySelector;