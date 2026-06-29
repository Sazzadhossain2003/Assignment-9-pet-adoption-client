import PetCard from '@/components/PetCard';
import SearchFilterSort from '@/components/SearchFilterSort';
import React from 'react';

const AllPetsPage = async ({ searchParams }) => {
  const params = await searchParams;
  // searchParams er maddhome SearchFilterSort er dara toiri kora route detect kore params a rakha hoyase tar pro search and species er maddhome distructuring kora hoyase 
  const search = params?.search || '';
  const species = params?.species || 'all';

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER}/pets?search=${search}&species=${species}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    },
  );

  const allPets = await res.json();

  return (
    <div className="min-h-screen bg-[#050211] pb-20">
      <div className="container mx-auto px-2 sm:px-4 md:px-12">
        {/* search filter section*/}
        <div className="py-6 sm:py-10 flex justify-center">
          <SearchFilterSort />
        </div>

        {allPets.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 sm:gap-6">
            {allPets.map(pet => (
              <PetCard key={pet._id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500 text-lg sm:text-xl font-bold">
            No pets found matching your criteria 🐾
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPetsPage;
