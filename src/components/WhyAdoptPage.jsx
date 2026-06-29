'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const WhyAdoptPage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-[#050211] py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* main container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative overflow-hidden bg-[#120D26]/60 backdrop-blur-xl rounded-[40px] md:rounded-[60px] border border-white/5 flex flex-col md:flex-row items-center justify-between shadow-2xl"
        >
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full"></div>

          {/* left side content */}
          <div className="relative z-20 w-full md:w-1/2 px-8 md:pl-20 py-16 text-center md:text-left">
            <motion.h2
              variants={itemVariants}
              className="text-4xl md:text-6xl font-black text-white leading-tight mb-8"
            >
              Why Adopt <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
                Pets?
              </span>
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="space-y-6 mb-12 max-w-md mx-auto md:mx-0"
            >
              <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed opacity-90">
                Every year, thousands of pets are left homeless. By adopting,
                you aren&apos;t just giving them a home—you&apos;re giving them
                a second chance at life.
              </p>

              {/* check list */}
              <div className="flex flex-col gap-3 items-center md:items-start text-gray-300">
                {[
                  'Save a life and find a best friend',
                  'Unconditional love guaranteed',
                ].map((text, i) => (
                  <motion.div
                    key={i}
                    variants={itemVariants}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[#FF4D8D]">✦</span>
                    <span className="text-sm font-semibold">{text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#FF4D8D] to-[#F27121] hover:opacity-90 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-xl shadow-pink-500/20 transition-all uppercase tracking-wide"
            >
              Learn More
            </motion.button>
          </div>

          {/* right side image */}
          <div className="relative z-10 w-full md:w-1/2 h-full flex items-end justify-center md:justify-end mt-10 md:mt-0 px-4 md:px-0 self-end">
            <div className="absolute bottom-0 right-0 w-[100%] h-[80%] bg-orange-500/10 blur-[100px] rounded-full"></div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative w-[400px] sm:w-[400px] md:w-[500px] lg:w-[600px] aspect-square flex items-end leading-[0]"
            >
              <Image
                src="/assets/dogAndCat-removebg-preview.png"
                alt="Cute Dog"
                width={800}
                height={800}
                className="object-contain object-bottom drop-shadow-[0_10px_50px_rgba(0,0,0,0.3)]"
                priority
              />

              {/* floating star */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [-15, -10, -15] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute top-[20%] left-[-10%] hidden lg:block"
              >
                <span className="text-4xl opacity-30 inline-block">✨</span>
              </motion.div>

              {/* floating paw */}
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-20 left-0 hidden lg:block"
              >
                <span className="text-3xl rotate-[20deg] inline-block text-pink-400">
                  🐾
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyAdoptPage;
