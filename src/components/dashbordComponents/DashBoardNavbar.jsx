'use client';
import React from 'react';
import Image from 'next/image';
import DashNavLinks from './DashNavLinks';
import { FaPaw } from 'react-icons/fa';

const menuItems = [
  {
    name: 'My Requests',
    href: '/my-requests',
    icon: '/assets/businessman.png',
  },
  { name: 'Add Pet', href: '/add-pet', icon: '/assets/paw-print.png' },
  { name: 'My Listings', href: '/my-list', icon: '/assets/candidate.png' },
];

const DashBoardNavbar = () => {
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-full min-h-screen bg-[#0F0821] text-white flex-col p-6 border-r border-white/5">
        <div className="flex items-center gap-2 mb-10 px-2">
          <div className="bg-gradient-to-br from-[#C084FC] to-[#E879F9] p-2 rounded-xl">
            <FaPaw size={18} className="text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
            Dashboard
          </span>
        </div>

        <nav>
          <ul className="space-y-2">
            {menuItems.map(item => (
              <li key={item.name}>
                <DashNavLinks item={item} />
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Mobile top navbar */}
      <div className="lg:hidden fixed top-16 left-0 right-0 z-40 h-16 bg-[#0F0821] border-b border-white/10 flex justify-around items-center px-4">
        {menuItems.map(item => (
          <DashNavLinks key={item.name} item={item} mobile />
        ))}
      </div>
    </>
  );
};

export default DashBoardNavbar;
