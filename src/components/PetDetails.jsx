import Image from 'next/image';
import React from 'react';
import { IoLocationOutline } from 'react-icons/io5';
import {
  FaDog,
  FaCalendarAlt,
  FaVenusMars,
  FaShieldAlt,
  FaBriefcaseMedical,
} from 'react-icons/fa';

const PetDetails = ({ singlePet }) => {
  return (
    <div className="bg-[#120D26]/60 backdrop-blur-xl border border-white/5 rounded-[40px] p-6 md:p-10 h-full shadow-2xl flex flex-col">
      <div className="flex flex-col md:flex-row gap-10">
        {/* pet image */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square w-full rounded-[32px] overflow-hidden border border-white/10 shadow-lg">
            <Image
              src={singlePet?.imageUrl}
              alt={singlePet?.PetName}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* pet icon */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <div className="inline-flex items-center gap-2 bg-[#C084FC]/10 text-[#C084FC] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 w-fit">
            <FaDog /> {singlePet.species}
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            {singlePet.PetName}
          </h1>

          <div className="flex items-center gap-2 text-gray-400 font-bold text-base mb-6">
            <IoLocationOutline className="text-[#E879F9]" size={20} />
            {singlePet.location}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 text-gray-300 font-semibold mb-1">
                <FaCalendarAlt className="text-[#C084FC]" />
                <span className="text-sm">Age</span>
              </div>
              <p className="text-white font-bold">{singlePet.age} Years</p>
            </div>
            <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-3 text-gray-300 font-semibold mb-1">
                <FaVenusMars className="text-[#E879F9]" />
                <span className="text-sm">Gender</span>
              </div>
              <p className="text-white font-bold capitalize">
                {singlePet.gender}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-1">
              Adoption Fee
            </p>
            <p className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C084FC] to-[#E879F9]">
              ${singlePet.adoptionFee}
            </p>
          </div>
        </div>
      </div>

      {/* description  */}
      <div className="mt-12 pt-10 border-t border-white/5 flex-grow">
        <h3 className="text-2xl font-black text-white mb-4">
          About {singlePet.PetName}
        </h3>
        <p className="text-gray-400 leading-relaxed text-lg font-medium opacity-90">
          {singlePet.description}
        </p>

        {/* health status */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400">
              <FaBriefcaseMedical size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">
                Health Status
              </p>
              <p className="font-bold text-gray-200 capitalize">
                {singlePet.healthStatus || 'Healthy'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 p-5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
              <FaShieldAlt size={24} />
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">
                Vaccination
              </p>
              <p className="font-bold text-gray-200 capitalize">
                {singlePet.vaccinationStatus || 'Yes'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetails;
