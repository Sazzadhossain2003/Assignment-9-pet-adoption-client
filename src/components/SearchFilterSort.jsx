'use client';
import React from 'react';
import { Label, ListBox, SearchField, Select } from '@heroui/react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const SearchFilterSort = () => {
  //1. prothome bortoman url pabo useSearchParams er maddhome.
  // 2. jehetu useSerachParams shudhu data porte pare tai amader URLSearchParams lagbe jar moddhe useSerachPars er value pathy dibo karon URLSearchParams er maddhome url update kora jay.
  // 3. update er jonno data ashbe input theke.
  // 4. r input theke data ashsr por ta condition onujai update kore URLSearchaParams a pathabo.
  // 5. ebar usePathname er maddhome pawa path er sathe URLSearchParams er maddhome banano query diya notun query te useRouter er maddhome push korbo.
  // 6.ei url AllPetsPage a searchParams er maddhome recive korbo.
  // 7. Ebar oi search and species ta apia set korbo.
  // 8. then sei api er maddhome server a request kora hobe tokhon server abar oi serach and species er value onujai mongodb theke data query kore ane client k response pathabe

  const router = useRouter();
  const pathname = usePathname();
  console.log(pathname);
  // useSearchParams holo readonly change kora jay na er maddhome bortoman search query url dey jehetu eita change kora jay na tai URLSearchParmas er moddhe pathano hoyase jeno change kora jay
  const searchParams = useSearchParams();
  console.log(searchParams.get('search'));
  console.log(searchParams.get('species'));

  const handleFilter = (name, value) => {
    // URLSearchParams change kora jay
    const params = new URLSearchParams(searchParams);
    console.log(params.toString());
    if (value && value !== 'all') {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const speciesOptions = [
    { id: 'all', label: 'All Species' },
    { id: 'Dog', label: 'Dog' },
    { id: 'Cat', label: 'Cat' },
    { id: 'Rabbit', label: 'Rabbit' },
    { id: 'Bird', label: 'Bird' },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center w-full max-w-3xl justify-center">
      {/* Search Input */}
      <SearchField
        name="search"
        defaultValue={searchParams.get('search') || ''}
        onChange={val => handleFilter('search', val)}
        className="w-full sm:w-auto"
      >
        <Label className="font-bold text-gray-300 text-sm mb-1 ml-1 block">
          Search
        </Label>
        <SearchField.Group className="bg-white/5 border-white/10 rounded-2xl h-11">
          <SearchField.SearchIcon className="ml-3 text-purple-400" />
          <SearchField.Input
            className="w-full sm:w-[250px] text-white text-sm"
            placeholder="Search pets..."
          />
          <SearchField.ClearButton className="mr-2" />
        </SearchField.Group>
      </SearchField>

      {/* Species Select */}
      <div className="w-full sm:w-[180px]">
        <Label className="font-bold text-gray-300 text-sm mb-1 ml-1 block">
          Species
        </Label>
        <Select
          name="species"
          placeholder="All Species"
          selectedKey={searchParams.get('species') || 'all'}
          onSelectionChange={key => handleFilter('species', key)}
          className="w-full"
        >
          <Select.Trigger className="rounded-2xl h-11 bg-white/5 border-white/10 text-white text-sm">
            <Select.Value />
            <Select.Indicator className="mr-2" />
          </Select.Trigger>
          <Select.Popover>
            <ListBox className="bg-[#1A0B40] text-gray-200 border border-white/10 rounded-xl p-1">
              {speciesOptions.map(item => (
                <ListBox.Item
                  key={item.id}
                  id={item.id}
                  textValue={item.label}
                  className="rounded-lg hover:bg-purple-600 hover:text-white transition-colors p-2 text-sm"
                >
                  {item.label}
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
};

export default SearchFilterSort;
