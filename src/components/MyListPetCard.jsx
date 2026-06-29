'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import {
  FaEdit,
  FaRegEye,
  FaUsers,
  FaTimes,
  FaUserCircle,
} from 'react-icons/fa';
import { RemovePet } from './RemovePet';
import { authClient } from '@/lib/auth-client';

const MyListPetCard = ({ pet, clientRequests }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const specificRequests = clientRequests?.filter(
    req => String(req.petId) === String(pet._id),
  );

  const handleStatusUpdate = async (requestId, newStatus) => {
    const { data: tokenData } = await authClient.token();
    console.log(tokenData);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER}/request/${requestId}`,
        {
          method: 'PATCH',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${tokenData?.token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      if (res.ok) {
        if (newStatus === 'approved') {
          await fetch(`${process.env.NEXT_PUBLIC_SERVER}/pets/${pet._id}`, {
            method: 'PATCH',
            headers: {
              'content-type': 'application/json',
              authorization: `Bearer ${tokenData?.token}`,
            },
            body: JSON.stringify({ sotck: 'Adopted' }),
          });
        }
        toast.success(`Request ${newStatus} successfully!`);
        setIsOpen(false);
        router.refresh();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-300 group flex flex-col h-full">
      {/* Image */}
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Image
          src={pet.imageUrl}
          alt={pet.PetName}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border backdrop-blur-sm ${
              pet.sotck === 'Available'
                ? 'bg-green-500/20 border-green-500/40 text-green-400'
                : 'bg-red-500/20 border-red-500/40 text-red-400'
            }`}
          >
            {pet.sotck === 'Available' ? 'Available' : 'Adopted'}
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-black text-white mb-1 truncate">
          {pet.PetName}
        </h3>
        <p className="text-gray-500 text-sm mb-1">
          {pet.species} • {pet.breed}
        </p>
        <span className="text-[#C084FC] font-black text-lg mb-4">
          ${pet.adoptionFee}
        </span>

        <div className="grid grid-cols-2 gap-2 mt-auto">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-[#C084FC]/20 hover:border-[#C084FC]/40 hover:text-[#C084FC] transition-all font-bold text-xs"
          >
            <FaUsers size={13} /> Requests
          </button>
          <Link
            href={`/update-pet/${pet._id}`}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-emerald-500/20 hover:border-emerald-500/40 hover:text-emerald-400 transition-all font-bold text-xs"
          >
            <FaEdit size={13} /> Edit
          </Link>
          <Link
            href={`/all-pets/${pet._id}`}
            className="flex items-center justify-center gap-2 px-3 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-blue-500/20 hover:border-blue-500/40 hover:text-blue-400 transition-all font-bold text-xs"
          >
            <FaRegEye size={13} /> View
          </Link>
          <RemovePet petId={pet._id} />
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-[#0F0821] border border-white/10 w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <h2 className="text-xl font-black text-white">
                Requests for {pet.PetName}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <FaTimes className="text-gray-400" size={18} />
              </button>
            </div>
            <div className="p-6 max-h-[65vh] overflow-y-auto space-y-4">
              {specificRequests.length > 0 ? (
                specificRequests.map((req, index) => (
                  <div
                    key={index}
                    className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div className="shrink-0">
                      {req.image ? (
                        <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-white/10">
                          <Image
                            src={req.image}
                            alt={req.clientName}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                          <FaUserCircle className="text-gray-500 w-10 h-10" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex justify-between items-start mb-3 gap-2">
                        <div>
                          <h4 className="font-black text-white">
                            {req.clientName || 'Anonymous'}
                          </h4>
                          <p className="text-gray-500 text-xs">{req.email}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shrink-0 ${
                            req.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : req.status === 'rejected'
                                ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                                : 'bg-orange-500/20 text-orange-400 border-orange-500/30'
                          }`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <div className="bg-white/5 p-4 rounded-xl border border-white/5 mb-3">
                        <p className="text-gray-300 text-sm font-bold">
                          Pickup: {req.pickupDate}
                        </p>
                        <p className="text-gray-500 text-sm italic mt-1">
                          {req.message}
                        </p>
                      </div>
                      {req.status === 'pending' && (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(req._id, 'approved')
                            }
                            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl px-6 py-2 transition-all text-sm active:scale-95"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(req._id, 'rejected')
                            }
                            className="bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-xl px-6 py-2 transition-all text-sm active:scale-95"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-16 text-center text-gray-600 italic">
                  No requests yet.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListPetCard;
