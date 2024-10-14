import React from 'react';
import NavBar from '../../src/components/Navbar';
import AdminHeroSection from '../components/AdminHeroSection';

const AdminHome: React.FC = () => {
  return (
    <div>
      <NavBar />
      <AdminHeroSection />
    </div>
  );
};

export default AdminHome;
