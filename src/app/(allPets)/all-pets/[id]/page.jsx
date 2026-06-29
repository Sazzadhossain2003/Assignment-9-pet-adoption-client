import AdoptionForm from '@/components/AdoptionForm';
import PetDetails from '@/components/PetDetails';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import Link from 'next/link';
import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6'; 

const PetDetailsById = async ({ params }) => {
  const { id } = await params;
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/pets/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  const singlePet = await res.json();

  return (
    <div className="min-h-screen bg-[#050211] py-10 md:py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* back button */}
        <div className="mb-8">
          <Link
            href="/all-pets"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 group"
          >
            <div className="p-2 rounded-full border border-gray-800 group-hover:border-gray-600 group-hover:bg-gray-900">
              <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            </div>
            <span className="font-medium">Back to All Pets</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* pet information */}
          <div className="lg:col-span-8 h-full">
            <PetDetails singlePet={singlePet} />
          </div>

          {/* adoption form */}
          <div className="lg:col-span-4 h-full">
            <div className="sticky top-24">
              <AdoptionForm singlePet={singlePet} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetDetailsById;
