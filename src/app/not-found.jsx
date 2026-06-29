'use client';
import Link from 'next/link';
import { FaPaw, FaHome, FaSearch } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#050211] px-6 text-center relative overflow-hidden">
      {/* background decoration */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[120px] rounded-full"></div>

      {/* main icon */}
      <div className="relative mb-8 z-10">
        <div className="text-[120px] md:text-[160px] leading-none select-none filter drop-shadow-[0_0_20px_rgba(192,132,252,0.3)]">
          😿
        </div>
        {/* tag bubble */}
        <div className="absolute -top-2 -right-8 md:-top-4 md:-right-12 bg-gradient-to-r from-[#F27121] to-[#E94057] text-white text-[10px] md:text-xs font-black px-4 py-2 rounded-full rotate-12 shadow-lg animate-bounce">
          Woof! I&apos;m lost...
        </div>
      </div>

      {/* 404 text blur */}
      <h1 className="text-[100px] md:text-[200px] font-black text-white/5 absolute pointer-events-none select-none tracking-tighter">
        404
      </h1>

      {/* text content */}
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
          Oops! Page{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
            Not Found
          </span>
        </h2>

        <p className="text-gray-400 text-base md:text-lg mb-10 leading-relaxed opacity-80 px-4">
          The page you are looking for has wandered off like a curious puppy.
          Don&apos;t worry, we can help you find your way back to your furry
          friends!
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4">
          <Link
            href="/"
            className="w-full sm:w-auto bg-gradient-to-r from-[#F27121] via-[#E94057] to-[#8A2387] text-white px-10 py-4 rounded-2xl font-black text-sm md:text-base transition-all transform hover:scale-105 shadow-xl shadow-pink-500/20 flex items-center justify-center gap-3 uppercase tracking-wider"
          >
            <FaHome size={18} /> Back to Home
          </Link>

          <Link
            href="/all-pets"
            className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 text-gray-200 px-10 py-4 rounded-2xl font-black text-sm md:text-base transition-all flex items-center justify-center gap-3 uppercase tracking-wider backdrop-blur-sm"
          >
            <FaSearch size={16} className="text-[#C084FC]" /> Browse Pets
          </Link>
        </div>
      </div>

      {/* background paw print */}
      <div className="absolute bottom-10 left-[-5%] md:left-10 opacity-[0.03] rotate-12 pointer-events-none">
        <FaPaw size={250} className="text-white" />
      </div>
      <div className="absolute top-20 right-[-5%] md:right-10 opacity-[0.03] -rotate-12 pointer-events-none">
        <FaPaw size={180} className="text-white" />
      </div>

      {/* floating heart*/}
      <div className="absolute top-1/4 left-1/4 animate-pulse opacity-20 hidden md:block">
        <span className="text-4xl text-pink-500">❤️</span>
      </div>
    </div>
  );
};

export default NotFoundPage;
