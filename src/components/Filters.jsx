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
    <div className="p-4 rounded-xl mb-4 bg-white shadow-md">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">Filters</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-2">Search Products</label>
          <div className="relative flex items-center space-x-2 justify-center">
            <div className="w-full relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm outline-none"
            />
            <svg
              className="absolute right-2 top-2.5 h-4 w-4 text-gray-400"
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
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm "
          >
            Search
          </button>
          </div>
       
        </div>

        <div className="flex flex-col">
          <label className="text-sm text-gray-700 mb-2">Max Price: ${priceRange}</label>
          <input
            type="range"
            min="0"
            max="100"
            value={priceRange}
            onChange={(e) => setPriceRange(parseInt(e.target.value))}
            className="w-full h-1 bg-gray-200 rounded-full appearance-none cursor-pointer transition-all"
            style={{
              background: `linear-gradient(to right, #3b82f6 ${priceRange}%, #d1d5db ${priceRange}%)`,
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 text-sm mt-2"
        >
          Apply Filters
        </button>
      </form>
    </div>
  );
};

export default Filters;
