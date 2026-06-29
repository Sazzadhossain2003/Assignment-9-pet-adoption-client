import Navbar from '@/components/Navbar';
import React from 'react';

const AllPetsLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className='pt-20'>{children}</main>
    </>
  );
};

export default AllPetsLayout;
