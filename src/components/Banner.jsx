'use client';
import React from 'react';
import Image from 'next/image';
import { FaPaw, FaPlayCircle } from 'react-icons/fa';
import { HiArrowRight } from 'react-icons/hi';
import Link from 'next/link';
import { motion } from 'framer-motion'; 
const Banner = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative w-full bg-[#0F0821] overflow-hidden min-h-[600px] sm:min-h-[700px] lg:min-h-[850px] flex items-center">
      {/*background animation */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f082147] via-[#1a0b4060] to-[#4d1991]"></div>

        {/* glow effects */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 blur-[120px] rounded-full"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-pink-600/10 blur-[100px] rounded-full"
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 py-12 lg:py-0">
          {/* left sid content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full lg:w-1/2 text-center lg:text-left order-2 lg:order-1"
          >
            {/*tag*/}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full mb-6 mx-auto lg:mx-0"
            >
              <FaPaw className="text-[#C084FC] animate-pulse" />
              <span className="text-white/80 text-xs md:text-sm font-bold uppercase tracking-widest">
                Adopt. Love. Repeat.
              </span>
            </motion.div>

            {/* heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] tracking-tight mb-6"
            >
              Find Your Perfect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] via-[#E879F9] to-[#FF4D8D]">
                Companion
              </span>{' '}
              Today
            </motion.h1>

            {/* paragraph */}
            <motion.p
              variants={fadeInUp}
              className="text-gray-300 text-base sm:text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed opacity-80"
            >
              Thousands of adorable pets are waiting for a loving home like
              yours. Start your journey of unconditional love today!
            </motion.p>

            {/* buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link href={'/all-pets'} className="w-full sm:w-auto">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-[#F27121] via-[#E94057] to-[#8A2387] text-white px-10 py-5 rounded-2xl font-bold text-lg shadow-2xl shadow-pink-500/20 flex items-center justify-center gap-3"
                >
                  Adopt Now <HiArrowRight />
                </motion.button>
              </Link>

              {/* How it works */}
              <motion.button
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                className="w-full sm:w-auto group flex items-center justify-center gap-3 text-white font-bold text-lg px-8 py-5 rounded-2xl border border-white/20 transition-all"
              >
                <FaPlayCircle className="text-2xl text-[#C084FC] group-hover:text-white transition-colors" />
                How It Works
              </motion.button>
            </motion.div>
          </motion.div>

          {/* right side pet */}
          <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end relative">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="relative w-[300px] sm:w-[420px] lg:w-[480px] xl:w-[520px]"
            >
              {/* effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-orange-500/10 blur-2xl rounded-3xl scale-110"></div>

              {/* main pet card */}
              <div className="relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl shadow-black/50 leading-[0]">
                {/* pet image */}
                <Image
                  src="/assets/DogAndCatImage-removebg-preview.png"
                  alt="Happy Pets"
                  width={800}
                  height={700}
                  className="relative z-10 w-full h-auto object-contain px-4 pt-6 object-bottom" 
                  priority
                />
                {/* pet card gradient background */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#1A0B40]/60 to-transparent z-20"></div>
              </div>

              {/* floating card */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute -bottom-4 -right-4 sm:-right-6 z-30 bg-black/60 backdrop-blur-xl border border-white/10 p-4 sm:p-5 rounded-3xl flex items-center gap-4 shadow-2xl"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div
                      key={i}
                      className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#C084FC] overflow-hidden bg-gray-800 shadow-lg"
                    >
                      <Image
                        src={`https://i.pravatar.cc/100?img=${i + 15}`}
                        alt="user"
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="text-white font-black text-base sm:text-xl leading-none">
                    1000+
                  </h4>
                  <p className="text-gray-400 text-[10px] sm:text-xs font-bold uppercase tracking-tighter mt-1">
                    Happy Families
                  </p>
                </div>
              </motion.div>

              {/* floatin heart icon for pet card left side  */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-[15%] -left-4 sm:-left-6 z-30 bg-gradient-to-tr from-purple-500 to-pink-500 p-3 sm:p-4 rounded-full shadow-lg shadow-pink-500/30"
              >
                <span className="text-xl sm:text-2xl">❤️</span>
              </motion.div>

              {/* floatin paw for pet card top right  */}
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute top-[-12px] right-[15%] z-30 bg-[#F27121] p-3 sm:p-4 rounded-full shadow-lg shadow-orange-500/30 hidden sm:block"
              >
                <FaPaw className="text-xl sm:text-2xl text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
