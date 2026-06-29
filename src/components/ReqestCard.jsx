'use client';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaRegEye } from 'react-icons/fa';
import { CancleModal } from './CancleModal';

const RequestCard = ({ clientRequest }) => {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  if (isPending)
    return (
      <div className="p-10 text-center text-gray-400 animate-pulse font-bold">
        Loading...
      </div>
    );
  if (!user)
    return (
      <div className="p-10 text-center text-white">
        Please login to see requests.
      </div>
    );

  const myRequests =
    clientRequest?.filter(req => req.email === user?.email) || [];

  return (
    <div className="w-full space-y-6">
      <h1 className="text-2xl md:text-3xl font-black text-white">
        My Adoption Requests
      </h1>

      {/* desktop */}
      <div className="hidden md:grid grid-cols-12 px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5">
        <div className="col-span-5">Pet Information</div>
        <div className="col-span-2">Dates</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-3 text-right">Actions</div>
      </div>

      {/* Main List */}
      <div className="space-y-4">
        {myRequests.length > 0 ? (
          myRequests.map(req => (
            <div
              key={req._id}
              className="grid grid-cols-1 md:grid-cols-12 items-center gap-4 md:gap-0 bg-white/[0.03] border border-white/10 p-4 md:px-6 md:py-4 rounded-[24px] md:rounded-[32px] hover:bg-white/[0.05] transition-all"
            >
              {/* Pet Info Section */}
              <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                <div className="relative w-14 h-14 md:w-12 md:h-12 rounded-2xl overflow-hidden border border-white/10 shrink-0 shadow-xl">
                  <Image
                    src={req.petImage || '/placeholder-pet.png'}
                    alt={req.petName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-white text-base md:text-sm truncate">
                    {req.petName}
                  </h3>
                  <p className="text-xs text-gray-500 font-medium md:hidden">
                    ID: {req.petId?.slice(-6)}
                  </p>
                </div>
              </div>

              {/* Date Section */}
              <div className="col-span-1 md:col-span-2 space-y-1">
                <p className="text-[10px] md:text-xs text-gray-400 font-bold flex">
                  <span className="md:block text-gray-600">Pickup: </span>
                  {new Date(req.pickupDate).toLocaleDateString('en-GB')}
                </p>
                <p className="text-[10px] text-gray-500 font-medium hidden md:block">
                  Req: {new Date(req.requestDate).toLocaleDateString('en-GB')}
                </p>
              </div>

              {/* Status Section */}
              <div className="col-span-1 md:col-span-2 md:text-center">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                    req.status === 'approved'
                      ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
                      : req.status === 'pending'
                        ? 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                        : 'bg-rose-500/10 text-rose-500 border-rose-500/20'
                  }`}
                >
                  {req.status}
                </span>
              </div>

              {/* Actions Section */}
              <div className="col-span-1 md:col-span-3 flex items-center justify-start md:justify-end gap-2 mt-2 md:mt-0 pt-3 md:pt-0 border-t border-white/5 md:border-0">
                <Link
                  href={`/all-pets/${req.petId}`}
                  className="flex-1 md:flex-none"
                >
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-[11px] uppercase hover:bg-white/10 transition-all active:scale-95">
                    <FaRegEye size={14} className="text-purple-400" /> View
                  </button>
                </Link>
                <div className="flex-1 md:flex-none">
                  <CancleModal myRequests={req._id} status={req.status} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-500 italic bg-white/[0.02] border border-dashed border-white/10 rounded-[32px]">
            No adoption requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestCard;
