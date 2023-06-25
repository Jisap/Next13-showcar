'use client'

import { useState,Fragment } from 'react'
import { Combobox, Transition } from "@headlessui/react";
import { SearchManufacturerProps } from '@/types';
import { manufacturers } from '@/app/constants';
import Image from 'next/image';

const SearchManufacturer = ({manufacturer, setManuFacturer}: SearchManufacturerProps) => {
  
    const [query, setQuery] = useState("");

    const filteredManufacturers =
        query === ""                                                   // Si no hay query se devuelve toda la lista 
            ? manufacturers
            : manufacturers.filter((item) =>                           // Pero si si lo hay filtramos la lista según el query             
                item
                    .toLowerCase()                                     // Se convierte a minúsculas el item de manufacturer
                    .replace(/\s+/g, "")                               // Elimina los espacios en blanco del item de manufacturer
                    .includes(query.toLowerCase().replace(/\s+/g, "")) // Si el item coincide con el query, el elemento item se incluye en la nueva matriz filtrada.
            );

  return (
    <div className='search-manufacturer'>
        <Combobox value={manufacturer} onChange={setManuFacturer}>
            <div className='relative w-full'>
                {/* Button for the combobox. Click on the icon to see the complete dropdown */}
                <Combobox.Button className="absolute top-[14px]">
                    <Image 
                        src="/car-logo.svg"
                        width={20}
                        height={20}
                        className='ml-4'
                        alt="Car Logo"
                    />
                </Combobox.Button>

                {/* Input field for searching */}
                <Combobox.Input 
                    className='search-manufacturer__input'
                    displayValue={(manufacturer:string) => manufacturer}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder='Wolksvagen'
                />

                {/* Transition for displaying the options */}
                <Transition
                    as={Fragment}
                    leave='transition ease-in duration-100'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                    afterLeave={() => setQuery('')}
                >
                      <Combobox.Options
                          className='absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
                          static
                      >
                        {
                           filteredManufacturers.map((item) => ( // Si hay query mostramos las coincidencias en una lista desplegable
                              <Combobox.Option
                                 key={item}
                                 className={({ active }) => `relative search-manufacturer__option ${active ? "bg-primary-blue text-white" : "text-gray-900"}`}
                                 value={item}
                              >
                                 {({ selected, active }) => (
                                 <>
                                    <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                                       {item}
                                    </span>

                                    {/* Show an active blue background color if the option is selected */}
                                    {selected ? (
                                       <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-pribg-primary-purple"}`}
                                       ></span>
                                    ) : null}
                                 </>
                              )}  
                              </Combobox.Option>
                           ))
                        }
                     </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    </div>
  )
}

export default SearchManufacturer