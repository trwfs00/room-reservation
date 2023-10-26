import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import { useEffect } from 'react';

export default function Selectbox({ onSelectedValue, timeslots }) {
  const [selected, setSelected] = useState(timeslots[0])
  const handleChange = (timeslot) => {
    setSelected(timeslot);
    onSelectedValue(timeslot);
    console.log(timeslot)
  };

  useEffect(()=>{
    console.log(selected)
  })

  return (
    <div className="fixed w-1/2">
      <Listbox value={selected} onChange={handleChange}>
      {({ open }) => (
        <>
        <div className="relative">
          <Listbox.Button className="relative py-3.5 px-0 w-full text-left text-md font-normal text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer">
            <span className="block truncate">{selected?._id ? `${selected?.StartTime} น. — ${selected?.EndTime} น.`:'เลือกช่วงเวลาที่คุณต้องการ'}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          {/* <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          > */}
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options static className="absolute -translate-y-[calc(100%+5em)] mt-1 max-h-60 w-full overflow-auto rounded-lg shadow-sm bg-white text-base ring-1 ring-black ring-opacity-10 focus:outline-none sm:text-sm cursor-pointer">
              {timeslots.map((timeslot, index) => (
                <Listbox.Option
                  key={index}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2.5 pl-10 pr-4 ${
                      active ? 'bg-gray-50 text-[#3E99EC]' : 'text-gray-900'
                    }`
                  }
                  value={timeslot}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {`${timeslot.StartTime} น. — ${timeslot?.EndTime} น.`}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#3E99EC]">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
        </>
      )}
      </Listbox>
    </div>
  )
}
