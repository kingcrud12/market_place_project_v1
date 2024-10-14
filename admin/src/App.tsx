import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import SignIn from './components/Signin';
import SignUp from './components/SignUp';
import ResetPassword from './components/ResetPassword';
import AdminHome from './screens/AdminHome';
import AdminUsers from './components/AdminUsers';
import AdminOrders from './components/AdminOrders';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/products" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/products/add" element={<AddProduct />} />
        <Route path="/admin/products/edit/:id" element={<EditProduct />} />
        <Route path="/reset-password/:id" element={<ResetPassword />} />
        {/* Ajoutez d'autres routes ici */}
      </Routes>
    </Router>
  );
};

export default App;
