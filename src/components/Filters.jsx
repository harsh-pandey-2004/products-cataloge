import React, { useState } from "react";

const Filters = ({ onFilterChange }) => {
  const [priceRange, setPriceRange] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterChange({
      search: searchTerm,
      maxPrice: priceRange,
    });
  };

  return (
    <div className="p-6 rounded-xl mb-8 ">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Filters</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search Products
          </label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pl-10"
              />
              <svg
                className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
            >
              Search
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Price: ${priceRange}
          </label>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange}
              onChange={(e) => setPriceRange(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer transition-all"
              style={{
                background: `linear-gradient(to right, #3b82f6 ${priceRange}%, #d1d5db ${priceRange}%)`,
              }}
            />
           
           
          </div>
          <div className="flex justify-between text-sm text-gray-500 mt-1">
            <span>$0</span>
            <span>$100</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default Filters;
