'use client';
import { authClient } from '@/lib/auth-client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const AdoptionForm = ({ singlePet }) => {
  const { PetName, _id, ownerEmail, imageUrl, sotck } = singlePet;
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async formData => {
    setIsSubmitting(true);
    const completeData = {
      petName: PetName,
      petImage: imageUrl,
      clientName: user?.name,
      email: user?.email,
      image: user?.image || '',
      pickupDate: formData.pickupDate,
      message: formData.message,
      petId: _id,
      ownerEmail: ownerEmail,
      status: 'pending',
      requestDate: new Date(),
    };

    const { data: tokenData } = await authClient.token();
    console.log(tokenData);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/request`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(completeData),
      });
      const result = await res.json();
      if (result.insertedId) {
        toast.success('Adoption request sent successfully! 🐾');
        reset();
      }
    } catch {
      toast.error('Something went wrong!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const statusStyles =
    'text-center font-bold p-10 rounded-[40px] border backdrop-blur-xl h-full flex flex-col items-center justify-center gap-4';

  if (user?.email === singlePet.ownerEmail) {
    return (
      <div
        className={`${statusStyles} bg-rose-500/5 border-rose-500/20 text-rose-400`}
      >
        <span className="text-4xl">🚫</span>
        <p>You cannot adopt your own pet</p>
      </div>
    );
  }

  if (sotck !== 'Available') {
    return (
      <div
        className={`${statusStyles} bg-orange-500/5 border-orange-500/20 text-orange-400`}
      >
        <span className="text-4xl">🏠</span>
        <p>Already adopted by someone else</p>
      </div>
    );
  }

  return (
    <div className="bg-[#120D26] p-8 rounded-[40px] border border-white/5 shadow-2xl">
      <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-3">
        Adopt <span className="text-[#C084FC]">{PetName}</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Input Fields */}
        {[
          { label: 'Your Name', value: user?.name, name: 'clientName' },
          { label: 'Your Email', value: user?.email, name: 'email' },
        ].map(field => (
          <div key={field.name} className="space-y-1.5">
            <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
              {field.label}
            </label>
            <input
              type="text"
              defaultValue={field.value}
              readOnly
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-gray-400 font-bold outline-none cursor-not-allowed"
            />
          </div>
        ))}

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
            Pickup Date
          </label>
          <input
            type="date"
            className={`w-full bg-white/5 border rounded-2xl px-4 py-3 text-white outline-none focus:border-[#C084FC] transition-all ${errors.pickupDate ? 'border-rose-500' : 'border-white/10'}`}
            {...register('pickupDate', { required: 'Date is required' })}
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">
            Message
          </label>
          <textarea
            placeholder="Tell us why you want to adopt..."
            className={`w-full bg-white/5 border rounded-2xl px-4 py-3 text-white outline-none focus:border-[#C084FC] transition-all min-h-[120px] resize-none ${errors.message ? 'border-rose-500' : 'border-white/10'}`}
            {...register('message', { required: 'Message is required' })}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-2xl text-white font-black text-lg bg-gradient-to-r from-[#C084FC] to-[#E879F9] shadow-lg shadow-purple-500/20 hover:opacity-90 transition-all active:scale-95 disabled:opacity-50"
        >
          {isSubmitting ? '🐾 Sending...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default AdoptionForm;
