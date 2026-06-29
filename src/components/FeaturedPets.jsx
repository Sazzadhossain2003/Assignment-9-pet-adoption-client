'use client';
import React, { useEffect, useState } from 'react';
import { FaPaw } from 'react-icons/fa';
import Link from 'next/link';
import PetCard from './PetCard';
import { motion } from 'framer-motion';

const FeaturedPets = () => {
  const [displayPets, setDisplayPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/pets`, {
          cache: 'no-store',
        });
        const allPets = await res.json();
        setDisplayPets(allPets.slice(0, 6));
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPets();
  }, []);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 }, 
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="bg-[#050211] py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }} //
          variants={headerVariants}
          className="flex flex-col sm:flex-row justify-between items-center mb-16 gap-6"
        >
          <div className="flex items-center gap-4">
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="bg-[#C084FC]/20 p-3 rounded-2xl"
            >
              <FaPaw className="text-[#C084FC] text-3xl" />
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
              Featured{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
                Pets
              </span>
            </h2>
          </div>

          <Link href={'/all-pets'}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 border border-white/10 text-gray-300 font-bold rounded-2xl hover:bg-white/5 transition-all backdrop-blur-sm"
            >
              View All Pets
            </motion.button>
          </Link>
        </motion.div>

        {/* Pets Grid  */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-[#C084FC] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible" // scroll a animation hobe
            viewport={{ once: true, amount: 0.1 }} // section 10% dekha gelei animation start hobe
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6"
          >
            {displayPets.map(pet => (
              <motion.div key={pet._id} variants={itemVariants}>
                <PetCard pet={pet} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default FeaturedPets;
