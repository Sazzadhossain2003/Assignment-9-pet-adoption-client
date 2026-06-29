'use client';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

const speciesOptions = [
  { id: 'dog', label: 'Dog' },
  { id: 'cat', label: 'Cat' },
  { id: 'rabbit', label: 'Rabbit' },
  { id: 'bird', label: 'Bird' },
];

const healthOptions = [
  { id: 'healthy', label: 'Healthy' },
  { id: 'under-treatment', label: 'Under Treatment' },
];

const vaccineOptions = [
  { id: 'vaccinated', label: 'Vaccinated' },
  { id: 'not-vaccinated', label: 'Not Vaccinated' },
];

const UpdatePetForm = ({ singlePet }) => {
  const router = useRouter();
  const {
    PetName,
    adoptionFee,
    age,
    breed,
    description,
    gender,
    healthStatus,
    imageUrl,
    location,
    ownerEmail,
    species,
    vaccinationStatus,
    _id,
  } = singlePet;

  const [isPending, setIsPending] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    setIsPending(true);

    const formdata = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formdata.entries());

    const { data: tokenData } = await authClient.token();

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/pets/${_id}`, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(petData),
      });

      if (res.ok) {
        toast.success('Updated successfully! 🐾');
        router.push('/my-list');
        router.refresh();
      } else {
        toast.error('Failed to update');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setIsPending(false);
    }
  };

  // কমন ইনপুট স্টাইল
  const inputStyle =
    'w-full rounded-xl h-12 bg-white/5 border border-white/10 text-white px-4 outline-none focus:border-[#C084FC] transition-all';
  const labelStyle = 'font-bold text-gray-300 text-sm mb-2 block';

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto min-h-screen">
      <header className="mb-8 text-center lg:text-left">
        <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
          Update <span className="text-[#C084FC]">{PetName}</span>
        </h2>
        <p className="text-gray-500 mt-2">Change any field or keep as it is.</p>
      </header>

      <form
        onSubmit={onSubmit}
        className="bg-[#120D26]/60 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 space-y-8 shadow-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pet Name */}
          <div>
            <label className={labelStyle}>Pet Name</label>
            <input
              name="PetName"
              defaultValue={PetName}
              className={inputStyle}
              placeholder="Enter pet name"
              required
            />
          </div>

          {/* Species */}
          <div>
            <label className={labelStyle}>Species</label>
            <select
              name="species"
              defaultValue={species?.toLowerCase()}
              className={`${inputStyle} appearance-none bg-[#1A0B40]`}
              required
            >
              <option value="" disabled>
                Select species
              </option>
              {speciesOptions.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Breed */}
          <div>
            <label className={labelStyle}>Breed</label>
            <input
              name="breed"
              defaultValue={breed}
              className={inputStyle}
              required
            />
          </div>

          {/* Age */}
          <div>
            <label className={labelStyle}>Age</label>
            <input
              name="age"
              defaultValue={age}
              className={inputStyle}
              required
            />
          </div>

          {/* Gender */}
          <div className="flex flex-col gap-2">
            <label className={labelStyle}>Gender</label>
            <div className="flex gap-8 items-center h-12">
              <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  defaultChecked={gender === 'male'}
                  className="w-5 h-5 accent-[#C084FC]"
                />
                <span>Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-gray-300">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  defaultChecked={gender === 'female'}
                />
                <span>Female</span>
              </label>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className={labelStyle}>Image URL</label>
            <input
              name="imageUrl"
              defaultValue={imageUrl}
              className={inputStyle}
              required
            />
          </div>

          {/* Health Status */}
          <div>
            <label className={labelStyle}>Health Status</label>
            <select
              name="healthStatus"
              defaultValue={healthStatus?.toLowerCase()}
              className={`${inputStyle} bg-[#1A0B40]`}
              required
            >
              {healthOptions.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Vaccination Status */}
          <div>
            <label className={labelStyle}>Vaccination Status</label>
            <select
              name="vaccinationStatus"
              defaultValue={vaccinationStatus?.toLowerCase()}
              className={`${inputStyle} bg-[#1A0B40]`}
              required
            >
              {vaccineOptions.map(opt => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Location */}
          <div>
            <label className={labelStyle}>Location</label>
            <input
              name="location"
              defaultValue={location}
              className={inputStyle}
              required
            />
          </div>

          {/* Adoption Fee */}
          <div>
            <label className={labelStyle}>Adoption Fee ($)</label>
            <input
              name="adoptionFee"
              type="number"
              defaultValue={adoptionFee}
              className={inputStyle}
              required
            />
          </div>

          {/* Owner Email - readOnly */}
          <div className="md:col-span-2">
            <label className="font-bold text-gray-500 text-sm mb-2 block">
              Email (Read Only)
            </label>
            <input
              name="ownerEmail"
              defaultValue={ownerEmail}
              readOnly
              className="w-full rounded-xl h-12 bg-white/5 border border-white/10 text-gray-500 px-4 cursor-not-allowed outline-none"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className={labelStyle}>Description</label>
            <textarea
              name="description"
              defaultValue={description}
              className="w-full rounded-xl bg-white/5 border border-white/10 text-white min-h-[120px] p-4 outline-none focus:border-[#C084FC]"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white font-black h-14 rounded-2xl shadow-lg hover:opacity-90 transition-all text-lg disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isPending ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              Updating...
            </>
          ) : (
            '🐾 Save Changes'
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdatePetForm;
