'use client';
import { authClient } from '@/lib/auth-client';
import React from 'react';
import MyListPetCard from './MyListPetCard';

const MyListCard = ({ allPets, clientRequests }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const filterData =
    allPets?.filter(item => item.ownerEmail === user?.email) || [];
  const totalListings = filterData.length;
  const adoptedCount = filterData.filter(pet => pet.sotck === 'Adopted').length;
  const availableCount = totalListings - adoptedCount;

  if (isPending)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-8 h-8 border-2 border-[#C084FC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-black text-white mb-6">
        My Listings
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 mb-8">
        <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center">
          <p className="text-[#C084FC] font-bold uppercase text-[10px] sm:text-xs tracking-wider mb-1">
            Total
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {totalListings}
          </h2>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center">
          <p className="text-green-400 font-bold uppercase text-[10px] sm:text-xs tracking-wider mb-1">
            Available
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {availableCount}
          </h2>
        </div>
        <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-center">
          <p className="text-orange-400 font-bold uppercase text-[10px] sm:text-xs tracking-wider mb-1">
            Adopted
          </p>
          <h2 className="text-2xl sm:text-4xl font-black text-white">
            {adoptedCount}
          </h2>
        </div>
      </div>

      {filterData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filterData.map(pet => (
            <MyListPetCard
              key={pet._id}
              pet={pet}
              clientRequests={clientRequests}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-gray-500 text-lg font-medium">
            You haven't listed any pets yet.
          </p>
        </div>
      )}
    </div>
  );
};

export default MyListCard;
