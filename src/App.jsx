import React from "react";
import { CartProvider } from "./context/CartContext";
import ProductList from "./components/ProductList";
import  Cart  from "./components/Cart";

const App = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Products
            </h1>
          </div>
        </header>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
};

export default App;
