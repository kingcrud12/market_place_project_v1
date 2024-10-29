// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens_evol/HomePage';
import SignIn from './screens_evol/SignIn';
import SignUp from './screens_evol/SignUp';
import ResetPassword from './screens_evol/ResetPassword';
import { CartScreen } from './screens_evol/CartScreen';
import OrderDetails from './screens_evol/OrderDetails';

const Start = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/maincomponent" element={<SignUp />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/order-details/:orderId/:cartId" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
};

export default Start;
