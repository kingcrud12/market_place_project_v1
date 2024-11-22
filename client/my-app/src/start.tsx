// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './screens_2/pages/Homepage';
import SignIn from './screens_2/Ancientsx/SignIn';
import SignUp from './screens_2/Ancientsx/SignUp';
import ResetPassword from './screens_2/Ancientsx/ResetPassword';
import './App.css'
import OrderDetails from './screens_2/Ancientsx/OrderDetails';


const Start  =() => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/maincomponent" element={<SignUp />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        
        <Route path="/order-details/:orderId/:cartId" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
};

export default Start;
