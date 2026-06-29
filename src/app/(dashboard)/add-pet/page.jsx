'use client';
import { authClient } from '@/lib/auth-client';
import {
  FieldError,
  Input,
  Label,
  TextField,
  Select,
  ListBox,
  TextArea,
  Button,
} from '@heroui/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

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

const AddPetPage = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  const user = session?.user;

  if (isAuthLoading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#C084FC] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (!user)
    return (
      <div className="text-center py-20 text-gray-400 font-bold">
        Please login to add a pet.
      </div>
    );

  const onSubmit = async e => {
    e.preventDefault();
    setIsPending(true);
    const formdata = new FormData(e.currentTarget);
    const petData = Object.fromEntries(formdata.entries());

    const completeData = {
      ...petData,
      ownerId: user.id,
      ownerName: user.name,
      ownerEmail: user.email,
      createdAt: new Date(),
      sotck: 'Available',
    };

    const { data: tokenData } = await authClient.token();
    console.log(tokenData);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER}/pets`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${tokenData?.token}`,
        },
        body: JSON.stringify(completeData),
      });
      const data = await res.json();
      if (data.insertedId) {
        toast.success('Pet listed successfully! 🐾');
        router.push('/my-list'); 
      }
    } catch {
      toast.error('Something went wrong!');
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      {' '}
      <div className="w-full max-w-6xl">
        {' '}
        <header className="mb-8 text-center lg:text-left">
          <h2 className="text-3xl sm:text-4xl font-black text-white">
            Add New Pet
          </h2>
          <p className="text-gray-500 mt-2">
            Fill up the information to list a pet for adoption.
          </p>
        </header>
        <form
          onSubmit={onSubmit}
          className="bg-white/5 border border-white/10 rounded-[2.5rem] p-6 sm:p-10 lg:p-12 space-y-6 shadow-2xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Pet Name */}
            <TextField name="PetName" isRequired>
              <Label className="font-bold text-gray-300 text-sm mb-2 block">
                Pet Name
              </Label>
              <Input
                placeholder="Enter pet name"
                className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
              />
              <FieldError className="text-rose-400 text-xs mt-1" />
            </TextField>

            {/* Species */}
            <Select name="species" isRequired placeholder="Select species">
              <Label className="font-bold text-gray-300 text-sm mb-2 block">
                Species
              </Label>
              <Select.Trigger className="rounded-xl h-12 bg-white/5 border-white/10 text-white">
                <Select.Value />
                <Select.Indicator className="mr-2" />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-[#1A0B40] text-white p-2">
                  {speciesOptions.map(item => (
                    <ListBox.Item
                      key={item.id}
                      id={item.id}
                      textValue={item.label}
                      className="rounded-lg hover:bg-[#C084FC]"
                    >
                      {item.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Breed */}
            <TextField name="breed" isRequired>
              <Label className="font-bold text-gray-300 text-sm mb-2 block">
                Breed
              </Label>
              <Input
                placeholder="e.g. Golden Retriever"
                className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
              />
              <FieldError />
            </TextField>

            {/* Age */}
            <TextField name="age" isRequired>
              <Label className="font-bold text-gray-300 text-sm mb-2 block">
                Age
              </Label>
              <Input
                placeholder="e.g. 2 years"
                className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
              />
              <FieldError />
            </TextField>

            {/* Gender */}
            <div className="flex flex-col gap-2">
              <Label className="font-bold text-gray-300 text-sm mb-2">
                Gender
              </Label>
              <div className="flex gap-8 items-center h-12">
                <label className="flex items-center gap-2 cursor-pointer text-gray-300 group">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="w-5 h-5 accent-[#C084FC]"
                    required
                  />
                  <span className="group-hover:text-[#C084FC] transition-colors">
                    Male
                  </span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer text-gray-300 group">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="w-5 h-5 accent-[#C084FC]"
                  />
                  <span className="group-hover:text-[#C084FC] transition-colors">
                    Female
                  </span>
                </label>
              </div>
            </div>

            {/* Image URL */}
            <TextField name="imageUrl" isRequired>
              <Label className="font-bold text-gray-300 text-sm mb-2 block">
                Image URL
              </Label>
              <Input
                type="url"
                placeholder="https://imgbb.com/your-image.jpg"
                className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
              />
              <FieldError />
            </TextField>

            {/* Health Status */}
            <Select name="healthStatus" isRequired placeholder="Health status">
              <Label className="font-bold text-gray-300 text-sm mb-2 block">
                Health Status
              </Label>
              <Select.Trigger className="rounded-xl h-12 bg-white/5 border-white/10 text-white">
                <Select.Value />
                <Select.Indicator className="mr-2" />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-[#1A0B40] text-white p-2">
                  {healthOptions.map(item => (
                    <ListBox.Item
                      key={item.id}
                      id={item.id}
                      textValue={item.label}
                    >
                      {item.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Vaccination Status */}
            <Select
              name="vaccinationStatus"
              isRequired
              placeholder="Vaccination info"
            >
              <Label className="font-bold text-gray-300 text-sm mb-2 block">
                Vaccination Status
              </Label>
              <Select.Trigger className="rounded-xl h-12 bg-white/5 border-white/10 text-white">
                <Select.Value />
                <Select.Indicator className="mr-2" />
              </Select.Trigger>
              <Select.Popover>
                <ListBox className="bg-[#1A0B40] text-white p-2">
                  {vaccineOptions.map(item => (
                    <ListBox.Item
                      key={item.id}
                      id={item.id}
                      textValue={item.label}
                    >
                      {item.label}
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>

            {/* Location */}
            <TextField name="location" isRequired>
              <Label className="font-bold text-gray-300 text-sm mb-2 block">
                Location
              </Label>
              <Input
                placeholder="Enter city, country"
                className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
              />
              <FieldError />
            </TextField>

            {/* Adoption Fee */}
            <TextField name="adoptionFee" isRequired>
              <Label className="font-bold text-gray-300 text-sm mb-2 block">
                Adoption Fee (USD)
              </Label>
              <Input
                type="number"
                placeholder="50"
                className="rounded-xl h-12 bg-white/5 border-white/10 text-white"
              />
              <FieldError />
            </TextField>

            {/* Owner Email - Fixed version */}
            <div className="md:col-span-2">
              <TextField>
                <Label className="font-bold text-gray-500 text-sm mb-2 block">
                  Owner Email (Fixed)
                </Label>
                <Input
                  name="userEmail"
                  value={user?.email || ''} // value ব্যবহার করুন যেহেতু এটি পরিবর্তন হবে না
                  readOnly // isReadOnly এর বদলে readOnly ব্যবহার করুন
                  className="rounded-xl h-12 bg-white/5 border-white/10 text-gray-500 cursor-not-allowed"
                />
              </TextField>
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <TextField name="description" isRequired>
                <Label className="font-bold text-gray-300 text-sm mb-2 block">
                  Description
                </Label>
                <TextArea
                  placeholder="Write about the pet's story and personality..."
                  className="rounded-xl bg-white/5 border-white/10 text-white min-h-[150px] p-4"
                />
                <FieldError />
              </TextField>
            </div>
          </div>

          <Button
            type="submit"
            isLoading={isPending}
            className="w-full bg-gradient-to-r from-[#C084FC] to-[#E879F9] text-white font-black h-14 rounded-2xl shadow-lg shadow-purple-500/20 hover:opacity-90 transition-all text-lg"
          >
            {isPending ? 'Adding Pet...' : '🐾 Add Pet Listing'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddPetPage;
