// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './screens/HomePage';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import ResetPassword from './screens/ResetPassword';
import { CartScreen } from './screens/CartScreen';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/maincomponent" element={<SignUp />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        <Route path="/cart" element={<CartScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
