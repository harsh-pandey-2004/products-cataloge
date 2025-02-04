import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

export const ProductDetail = ({ productId, onClose }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/${productId}`
        );
        const data = await response.json();
        setProduct(data);
        setSelectedImage(0);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading)
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading product details...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-xl text-red-500">
          {error}
        </div>
      </div>
    );

  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full flex items-center justify-center px-4 py-8">
      <div className="animate-slideIn relative max-w-4xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-6">
            <div className="relative aspect-w-1 aspect-h-1">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full h-[400px] object-cover rounded-lg shadow-lg"
              />
              {product.discountPercentage > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {Math.round(product.discountPercentage)}% OFF
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all
                      ${
                        selectedImage === index
                          ? "border-blue-500 shadow-md"
                          : "border-transparent"
                      }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="w-full md:w-1/2 p-6">
            <div className="flex flex-col h-full">
              <div className="flex items-center space-x-2 mb-2">
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {product.brand}
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                  {product.category}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {product.title}
              </h2>

              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < Math.round(product.rating)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-gray-600">({product.rating})</span>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold text-gray-900">
                    ${product.price}
                  </span>
                  {product.discountPercentage > 0 && (
                    <span className="text-lg text-gray-400 line-through">
                      $
                      {Math.round(
                        (product.price * (100 + product.discountPercentage)) /
                          100
                      )}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <div
                  className={`flex items-center space-x-2 ${
                    product.stock > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>
                    {product.stock > 0
                      ? `${product.stock} units in stock`
                      : "Out of stock"}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  addToCart(product);
                  onClose();
                }}
                disabled={product.stock === 0}
                className={`mt-auto w-full py-4 rounded-lg font-medium transition-all duration-200 
                  ${
                    product.stock > 0
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-300 cursor-not-allowed text-gray-500"
                  }`}
              >
                {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
