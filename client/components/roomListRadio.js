import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { MapPinIcon, UsersIcon } from '@heroicons/react/24/outline'
import { useEffect } from 'react'

const plans = [
    {
        name: 'Startup',
        ram: '12GB',
        cpus: '6 CPUs',
        disk: '160 GB SSD disk',
    },
    {
        name: 'Business',
        ram: '16GB',
        cpus: '8 CPUs',
        disk: '512 GB SSD disk',
    },
    {
        name: 'Enterprise',
        ram: '32GB',
        cpus: '12 CPUs',
        disk: '1024 GB SSD disk',
    },
]

export default function Example(props) {
    const [selected, setSelected] = useState(props.rooms[0])

    useEffect(()=>{
        props.handleSelectRoom(selected || props.rooms[0]);
        console.log(selected)
    },[selected])

    return (
        <div className="w-full py-4">
            <div className="mx-auto w-full max-w-md">
                <RadioGroup value={selected} onChange={setSelected}>
                    <RadioGroup.Label className="sr-only">เลือกวันที่ต้องการจอง</RadioGroup.Label>
                    <div className='space-y-2'>
                        {props.rooms.map((room) => (
                            <RadioGroup.Option
                                key={room._id}
                                value={room}
                                className={({ active, checked }) =>
                                    `${active
                                        ? 'ring-2 ring-white ring-opacity-60 ring-offset-4 ring-offset-gray-100'
                                        : ''
                                    }
                  ${checked ? 'bg-[#3E99EC] bg-opacity-95 text-white' : 'bg-white'
                                    }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                                }
                            >
                                {({ active, checked }) => (
                                    <>
                                        <div className="flex w-full items-center justify-between">
                                            <div className="flex items-center">
                                                <div className="text-md">
                                                    <RadioGroup.Label
                                                        as="p"
                                                        className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'
                                                            }`}
                                                    >
                                                        {room.RoomName}
                                                    </RadioGroup.Label>
                                                    <RadioGroup.Description
                                                        as="span"
                                                        className={`inline ${checked ? 'text-sky-100' : 'text-gray-500'
                                                            }`}
                                                    >
                                                        <div className='mt-2 flex items-baseline'>
                                                            <UsersIcon className={`h-4 w-4 mr-1 translate-y-[0.15em] ${checked ? 'text-sky-100' : 'text-gray-500'}`} /> {room.Capacity}<span aria-hidden="true">&nbsp;&middot;&nbsp;</span> {room.Description}
                                                        </div>
                                                        <span className='inline-flex items-baseline'>
                                                            <MapPinIcon className={`h-4 w-4 mr-1 translate-y-[0.15em] ${checked ? 'text-sky-100' : 'text-gray-500'}`} />{room.Room_No}
                                                        </span>
                                                        <span aria-hidden="true">&nbsp;&middot;</span>{' '}
                                                        <span>{room.Location}</span>
                                                    </RadioGroup.Description>
                                                </div>
                                            </div>
                                            {checked && (
                                                <div className="shrink-0 text-white">
                                                    <CheckIcon className="h-6 w-6" />
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </RadioGroup.Option>
                        ))}
                    </div>
                </RadioGroup>
            </div>
        </div>
    )
}

function CheckIcon(props) {
    return (
        <svg viewBox="0 0 24 24" fill="none" {...props}>
            <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
            <path
                d="M7 13l3 3 7-7"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}
