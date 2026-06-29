'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

const DashNavLinks = ({ item, mobile = false }) => {
  const pathname = usePathname();
  const isActive = pathname === item.href;

  // MOBILE NAV
  if (mobile) {
    return (
      <Link
        href={item.href}
        className={`flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-all ${
          isActive ? 'text-[#C084FC]' : 'text-gray-500'
        }`}
      >
        <Image
          src={item.icon}
          alt={item.name}
          width={22}
          height={22}
          className={`${isActive ? 'opacity-100' : 'opacity-50'}`}
        />

        <span className="text-[10px] font-bold uppercase tracking-wider">
          {item.name.split(' ')[0]}
        </span>

        {isActive && (
          <span className="w-1 h-1 rounded-full bg-[#C084FC]"></span>
        )}
      </Link>
    );
  }

  // DESKTOP NAVbar
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden ${
        isActive
          ? 'bg-white/10 text-white'
          : 'hover:bg-white/5 text-gray-400 hover:text-gray-200'
      }`}
    >
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#C084FC] to-[#E879F9] rounded-r-full"></span>
      )}

      <Image
        src={item.icon}
        alt={item.name}
        width={20}
        height={20}
        className={`${isActive ? 'opacity-100' : 'opacity-50 group-hover:opacity-80'} transition-opacity`}
      />

      <span className="font-bold text-sm">{item.name}</span>
    </Link>
  );
};

export default DashNavLinks;
