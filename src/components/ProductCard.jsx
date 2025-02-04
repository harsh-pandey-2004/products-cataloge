import React from 'react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, onProductClick }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleViewDetails = (e) => {
    e.stopPropagation();
    onProductClick(product.id);
  };

  return (
    <div 
      onClick={handleViewDetails}
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
    >
      <div className="relative">
        <img 
          src={product.thumbnail} 
          alt={product.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 right-2 flex items-center space-x-2">
          {product.discountPercentage && (
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm">
              {Math.round(product.discountPercentage)}% off
            </span>
          )}
          <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
            ${product.price}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center 
              ${product.stock > 0 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-gray-300 cursor-not-allowed text-gray-500'}`}
          >
            {product.stock > 0 ? (
              <>
                <span>Add to Cart</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
              </>
            ) : (
              'Out of Stock'
            )}
          </button>
          <button
            onClick={handleViewDetails}
            className="w-full py-2 px-4 rounded-lg font-medium text-blue-600 hover:text-blue-700 border border-blue-600 hover:border-blue-700 transition-colors duration-200"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;