import React from 'react';
import CartPage from './Cart';
import Navbar from '../components/Navbar';
import './CartScreen.css'
export const CartScreen = () => {
  return (
    <div className="cart-screen">
      <div className="cart-screen-navbar">
        <Navbar />
      </div>
      <div className="cart-content">
        <h1 className="cart-title">Your Shopping Cart</h1>
        <CartPage />
      </div>
    </div>
  );
};
