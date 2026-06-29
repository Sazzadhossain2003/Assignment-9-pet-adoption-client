'use client';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaHeart } from 'react-icons/fa';
import { IoLocationOutline } from 'react-icons/io5';

const PetCard = ({ pet }) => {
  return (
    <div className="bg-[#120D26] rounded-2xl sm:rounded-[24px] border border-white/5 overflow-hidden hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 group flex flex-col h-full">
      {/* Image Section */}
      <div className="relative aspect-square w-full overflow-hidden p-1 sm:p-2">
        <div className="relative h-full w-full overflow-hidden rounded-xl sm:rounded-[20px]">
          <Image
            src={pet.imageUrl}
            alt={pet.PetName}
            fill
            sizes="(max-width: 768px) 50vw, 16vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute top-2 right-2 z-10">
            <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-white/10 text-white">
              <FaHeart className="text-[10px] sm:text-xs" />
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-1 mb-1 sm:mb-2">
          <h3 className="text-sm sm:text-lg font-bold text-white truncate group-hover:text-purple-400 transition-colors">
            {pet.PetName}
          </h3>
          <span
            className={`
        text-[8px] sm:text-[10px] px-1.5 py-0.5 rounded-full font-black uppercase 
         shrink-0 border 
         ${
           pet.sotck === 'Available'
             ? 'border-green-500/50 text-green-400 bg-green-500/10'
             : 'border-red-500/50 text-red-400 bg-red-500/10'
         }
  `}
          >
            {pet.sotck}
          </span>
        </div>

        <p className="text-[10px] sm:text-xs font-medium text-gray-400 mb-2 flex items-center gap-1">
          <span className="text-purple-400">{pet.species}</span>
          <span className="text-gray-700">•</span>
          <span>{pet.age}Y</span>
        </p>

        <div className="flex items-center gap-1 text-gray-500 text-[9px] sm:text-[11px] mb-3 mt-auto">
          <IoLocationOutline size={12} className="text-purple-400 shrink-0" />
          <span className="truncate">{pet.location}</span>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
          <span className="text-[8px] sm:text-[10px] text-gray-500 font-bold uppercase">
            Fee
          </span>
          <div className="text-[#FF4D8D] font-black text-sm sm:text-xl">
            ${pet.adoptionFee}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="p-2 sm:p-4 pt-0 grid grid-cols-2 gap-1.5">
        <Link href={`/all-pets/${pet._id}`}>
          <Button
            fullWidth
            size="sm"
            className="font-bold text-[10px] sm:text-xs text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg sm:rounded-xl h-8 sm:h-10"
          >
            Details
          </Button>
        </Link>
        <Link href={`/all-pets/${pet._id}`}>
          <Button
            fullWidth
            size="sm"
            className="font-bold text-[10px] sm:text-xs text-white bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg sm:rounded-xl h-8 sm:h-10 shadow-lg shadow-purple-500/20"
          >
            Adopt
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PetCard;
