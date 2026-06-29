import DashBoardNavbar from '@/components/dashbordComponents/DashBoardNavbar';
import Navbar from '@/components/Navbar';
import React from 'react';

const DashBoardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#0A0618] flex flex-col pt-20">
      {/* main navbar */}
      <Navbar />

      <div className="flex-1 grid grid-cols-12 gap-0 relative">
        {/* left side navbar */}
        <div className="hidden lg:block lg:col-span-2 border-r border-white/5 bg-[#0F0821]">
          <div className="sticky top-20 h-[calc(100vh-80px)]">
            <DashBoardNavbar />
          </div>
        </div>

        {/* main content */}
        <main
          className="
            col-span-12 
            lg:col-span-10
            min-h-[calc(100vh-80px)]
            p-4 sm:p-8 lg:p-12
            flex flex-col
            items-center 
          "
        >
          <div className="w-full max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default DashBoardLayout;
