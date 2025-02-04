import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "./ProductCard";
import Filters from "./Filters";
import { ProductDetail } from "./ProductDetails";

const ProductList = () => {
  const [filters, setFilters] = useState({});
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [visibleProductsCount, setVisibleProductsCount] = useState(4); 
  const { products, loading, error } = useProducts(filters);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setVisibleProductsCount(4); 
  };

  const filteredProducts = products.filter(
    (product) => !filters.maxPrice || product.price <= filters.maxPrice
  );

  const handleLoadMore = () => {
    setVisibleProductsCount((prevCount) => prevCount + 4); 
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-purple-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center text-red-600 p-6 bg-red-50 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-2">Error in Loading.</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
        <Filters onFilterChange={handleFilterChange} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.slice(0, visibleProductsCount).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={setSelectedProductId}
          />
        ))}
      </div>
      {filteredProducts.length > visibleProductsCount && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Load More
          </button>
        </div>
      )}
      {selectedProductId && (
        <ProductDetail
          productId={selectedProductId}
          onClose={() => setSelectedProductId(null)}
        />
      )}
    </div>
  );
};

export default ProductList;
