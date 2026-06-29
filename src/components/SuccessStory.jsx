'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const stories = [
  {
    id: 1,
    userName: 'Ariful Islam',
    petName: 'Max (Cat)',
    image:
      'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop',
    text: 'Milo has brought so much joy to our home. The adoption process was incredibly smooth and transparent!',
    rating: 5,
  },
  {
    id: 2,
    userName: 'Sarah Rahman',
    petName: 'Bolt (Golden Retriever)',
    image:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?q=80&w=1924&auto=format&fit=crop',
    text: "Adopting Bruno was the best decision of my life. He's my best friend now. Thank you PetNest!",
    rating: 5,
  },
  {
    id: 3,
    userName: 'Tanvir Ahmed',
    petName: 'Rex (Rabbit)',
    image:
      'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=1887&auto=format&fit=crop',
    text: 'Finding Luna through this platform was easy. She is healthy and very happy in her new environment.',
    rating: 5,
  },
];

const SuccessStory = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="bg-[#050211] py-20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
            Heartwarming <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
              Success Stories
            </span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-lg">
            Real stories from real families who found their furry companions
            through PetNest.
          </p>
        </motion.div>

        {/* Stories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {stories.map(story => (
            <motion.div
              key={story.id}
              variants={itemVariants}
              whileHover={{ y: -10 }} 
              className="bg-[#120D26]/60 backdrop-blur-xl border border-white/5 p-8 rounded-[32px] relative group"
            >
              {/* quote icon */}
              <div className="absolute top-6 right-8 text-white/5 group-hover:text-[#C084FC]/20 transition-colors duration-500">
                <FaQuoteLeft size={50} />
              </div>

              {/* star rating*/}
              <div className="flex gap-1 mb-6">
                {[...Array(story.rating)].map((_, i) => (
                  <FaStar key={i} className="text-orange-400 text-sm" />
                ))}
              </div>

              {/* text */}
              <p className="text-gray-300 text-lg leading-relaxed italic mb-8 relative z-10">
                &quot;{story.text}&quot;
              </p>

              {/* user info */}
              <div className="flex items-center gap-4 border-t border-white/5 pt-6">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10">
                  <Image
                    src={story.image}
                    alt={story.userName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-white font-bold">{story.userName}</h4>
                  <p className="text-[#C084FC] text-xs font-black uppercase tracking-wider">
                    Adopted {story.petName}
                  </p>
                </div>
              </div>

              {/* card glow effect */}
              <div className="absolute -z-10 inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[32px]"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStory;
