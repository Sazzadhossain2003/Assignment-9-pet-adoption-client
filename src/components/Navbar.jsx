'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import { FaPaw } from 'react-icons/fa6';
import MyNavLinks from './MyNavLinks';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'All Pets', href: '/all-pets' },
  { name: 'My Requests', href: '/my-requests' },
  { name: 'Add Pet', href: '/add-pet' },
  { name: 'My List', href: '/my-list' },
];

const Navbar = () => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  const router = useRouter();
  const pathname = usePathname();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // dropdown close function
  const closeMenus = () => {
    setIsMobileOpen(false);
    setIsDropdownOpen(false);
  };

  // jodi
  const handleSignOut = async () => {
    const privateRoutes = ['/add-pet', '/my-list', '/my-requests'];
    const isPrivate = privateRoutes.some(route => pathname.startsWith(route));

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          closeMenus();
          isPrivate ? router.push('/login') : router.refresh();
        },
      },
    });
  };

  return (
    <>
      {/* header */}
      <nav className="fixed top-0 left-0 w-full z-[100] h-20 bg-[#0F0821]/95 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-4 md:px-12 h-full flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            onClick={closeMenus}
            className="flex items-center gap-2 group"
          >
            <div className="bg-gradient-to-br from-[#C084FC] to-[#E879F9] p-2 rounded-xl text-white group-hover:scale-110 transition-transform">
              <FaPaw size={24} />
            </div>
            <span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
              PetNest
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex gap-8 items-center">
            {NAV_LINKS.slice(0, 4).map(link => (
              <li key={link.href}>
                <MyNavLinks href={link.href}>{link.name}</MyNavLinks>
              </li>
            ))}
          </ul>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {isPending ? (
              <div className="h-10 w-24 bg-white/10 animate-pulse rounded-full" />
            ) : user ? (
              <div className="relative">
                {/* profile button hoya kaj korbe*/}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 p-1 pr-3 hover:bg-white/5 rounded-full border border-white/10 transition-all relative z-[130]"
                >
                  <div className="h-9 w-9 rounded-full overflow-hidden ring-2 ring-purple-500/50">
                    {user?.image ? (
                      <Image
                        src={user.image}
                        alt="User"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-purple-600 flex items-center justify-center text-white text-xs">
                        {user?.name?.charAt(0)}
                      </div>
                    )}
                  </div>
                  <span className="hidden sm:block font-bold text-gray-200 text-sm">
                    {user?.name?.split(' ')[0]}
                  </span>
                </button>

                {/* Dropdown Menu Logic */}
                {isDropdownOpen && (
                  <>
                    {/* puro screen jure invisible cadorer moto background jeikhane click */}
                    <div
                      className="fixed inset-0 w-screen h-screen bg-transparent z-[120] cursor-default"
                      onClick={() => setIsDropdownOpen(false)}
                    />

                    {/* dorpdown box */}
                    <div className="absolute right-0 mt-3 w-48 bg-[#1A1038] border border-white/10 rounded-xl shadow-2xl py-2 overflow-hidden animate-in fade-in zoom-in duration-200 z-[140]">
                      <Link
                        href="/my-requests"
                        onClick={closeMenus}
                        className="block px-4 py-2 text-gray-200 font-semibold hover:bg-white/10"
                      >
                        Dashboard
                      </Link>
                      <hr className="border-white/5 my-1" />
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-red-400 font-semibold hover:bg-white/10"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden lg:block px-6 py-2 bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white rounded-full font-bold"
              >
                Login
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden text-3xl text-[#C084FC]"
            >
              <HiOutlineMenu />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile sidebar */}
      {/* overlay - পুরো স্ক্রিন ঝাপসা করার জন্য */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenus}
      />

      {/* main content */}
      <div
        className={`fixed top-0 right-0 h-screen w-72 bg-[#0F0821] border-l border-white/10 z-[160] transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          <button
            onClick={closeMenus}
            className="self-end text-3xl text-gray-400 mb-8"
          >
            <HiX />
          </button>

          {user && (
            // user thakle ei container dekhabe
            <div className="mb-8 p-4 bg-white/5 rounded-2xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-purple-500">
                  {user?.image ? (
                    <Image src={user.image} alt="User" width={48} height={48} />
                  ) : (
                    <div className="h-full w-full bg-purple-600 flex items-center justify-center text-white">
                      {user?.name?.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="overflow-hidden">
                  <p className="text-white font-bold truncate text-sm">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
              <Link
                href="/my-requests"
                onClick={closeMenus}
                className="block text-center py-2 bg-white/10 rounded-lg text-sm font-bold text-white"
              >
                Dashboard
              </Link>
            </div>
          )}

          <ul className="flex flex-col gap-6">
            {NAV_LINKS.map(link => (
              <li key={link.href}>
                <MyNavLinks href={link.href} onClick={closeMenus}>
                  {link.name}
                </MyNavLinks>
              </li>
            ))}
          </ul>

          <div className="mt-auto">
            {user ? (
              <button
                onClick={handleSignOut}
                className="w-full py-3 rounded-xl border border-red-500/50 text-red-400 font-bold"
              >
                Logout
              </button>
            ) : (
              <Link
                href="/login"
                onClick={closeMenus}
                className="block text-center py-3 rounded-xl bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
