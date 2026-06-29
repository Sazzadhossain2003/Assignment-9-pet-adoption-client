import Navbar from '@/components/Navbar';
import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default AuthLayout;
