'use client';
import React from 'react';
import { FaBowlFood, FaDumbbell, FaStethoscope, FaPaw } from 'react-icons/fa6';
import { MdSecurity, MdPets, MdFavorite } from 'react-icons/md';
import { motion } from 'framer-motion'; 

const PetCareTips = () => {
  const careTips = [
    {
      title: 'Good Food',
      desc: 'Provide nutritious food for your pet.',
      icon: <FaBowlFood />,
      color: 'text-orange-400',
      glow: 'shadow-[0_0_15px_rgba(251,146,60,0.3)]',
    },
    {
      title: 'Regular Exercise',
      desc: 'Keep your pet active and healthy.',
      icon: <FaDumbbell />,
      color: 'text-purple-400',
      glow: 'shadow-[0_0_15px_rgba(192,132,252,0.3)]',
    },
    {
      title: 'Health Check',
      desc: 'Regular vet check is important.',
      icon: <FaStethoscope />,
      color: 'text-pink-400',
      glow: 'shadow-[0_0_15px_rgba(244,114,182,0.3)]',
    },
  ];

  const partners = [
    {
      name: 'Happy Paws',
      type: 'Shelter',
      icon: <FaPaw />,
      color: 'text-blue-400',
      bg: 'bg-blue-500/10',
    },
    {
      name: 'Safe Haven',
      type: 'Pet Rescue',
      icon: <MdSecurity />,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10',
    },
    {
      name: 'Paws & Claws',
      type: 'Foundation',
      icon: <MdPets />,
      color: 'text-green-400',
      bg: 'bg-green-500/10',
    },
    {
      name: 'Love Animals',
      type: 'Shelter',
      icon: <MdFavorite />,
      color: 'text-red-400',
      bg: 'bg-red-500/10',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="bg-[#050211] py-16 space-y-12 overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        {/* pet care tips */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#120D26]/60 backdrop-blur-xl rounded-[40px] p-10 md:p-16 border border-white/5 shadow-2xl"
        >
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-black text-white mb-16 text-center md:text-left"
          >
            Pet Care <span className="text-[#C084FC]">Tips</span>
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-10"
          >
            {careTips.map((tip, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center text-center group"
              >
                {/* icon box */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 bg-black/40 border border-white/10 transition-all duration-500 ${tip.glow}`}
                >
                  <span className={`${tip.color} text-3xl`}>{tip.icon}</span>
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#C084FC] transition-colors">
                  {tip.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[220px] opacity-80">
                  {tip.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* shelter partner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 bg-[#120D26]/40 backdrop-blur-md rounded-[40px] p-10 border border-white/5"
        >
          <h2 className="text-xl md:text-3xl font-black text-white mb-12">
            Shelter <span className="text-[#E879F9]">Partners</span>
          </h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* partnar logo */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                  className={`${partner.bg} w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-300 border border-white/5 shadow-lg shadow-black/20`}
                >
                  <span
                    className={`${partner.color} text-4xl opacity-80 group-hover:opacity-100`}
                  >
                    {partner.icon}
                  </span>
                </motion.div>

                <h3 className="text-gray-200 font-bold text-base md:text-lg mb-1 group-hover:text-[#C084FC] transition-colors">
                  {partner.name}
                </h3>
                <p className="text-gray-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                  {partner.type}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PetCareTips;
