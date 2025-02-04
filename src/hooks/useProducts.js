import { useState, useEffect } from 'react';

export const useProducts = (filters = {}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let url = `${import.meta.env.VITE_API_URL}`;
        
        if (filters.search) {
          url = `${import.meta.env.VITE_API_URL}/search?q=${filters.search}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        let filteredProducts = data.products;
        if (filters.maxPrice) {
          filteredProducts = filteredProducts.filter(product => 
            product.price <= filters.maxPrice
          );
        }
        
        setProducts(filteredProducts);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters.search]);

  return { products, loading, error };
};