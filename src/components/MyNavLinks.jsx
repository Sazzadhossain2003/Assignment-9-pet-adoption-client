'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MyNavLinks = ({ href, children, onClick }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`font-semibold pb-1 transition-all duration-300 ${
        isActive
          ? 'bg-gradient-to-r from-[#C084FC] to-[#E879F9] bg-clip-text text-transparent border-b-2 border-[#C084FC]'
          : 'text-gray-300 hover:text-white'
      }`}
    >
      {children}
    </Link>
  );
};

export default MyNavLinks;
