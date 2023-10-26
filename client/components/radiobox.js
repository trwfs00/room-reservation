import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckBadgeIcon, MagnifyingGlassIcon, MapPinIcon, TagIcon, UsersIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import RoomModal from '@components/roomModal'
import { useEffect } from 'react';
import { Suspense } from 'react';
import Link from 'next/link';



export default function radioBox(props) {
  const [selected, setSelected] = useState();
  const [rooms, setRooms] = useState();
  const [booking, setBooking] = useState();
  const { data: session } = useSession();
  const [status, setStatus] = useState(false);
  const handleStatus = (data) => {
    setStatus(data);
  }
  const [isLoading, setIsLoading] = useState(false);
  const handleLoading = (status) => {
    setIsLoading(status);
  }

  async function fetchAvailableRooms() {
    try {
      const response = await fetch('http://localhost:8080/api/search/available-rooms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: props.selectedData.date.startDate,
          timeslotId: props.selectedData.time._id,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setRooms(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching available rooms:', error);
    }
  }
  useEffect(() => {
    fetchAvailableRooms();
    console.log(props.selectedData)
  }, []);

  useEffect(() => {
    fetchAvailableRooms();
    setIsLoading(false);
  }, [props.selectedData])

  const defaultRoom = {
    _id: "6516f8df568c73c03528448d",
    Room_No: "CP9127",
    RoomName: "ห้องสัมนา ก",
    Description: "ห้องสัมนาขนาดใหญ่พิเศษ",
    Capacity: 150,
    Location: "วิทยาลัยการคอมพิวเตอร์, ชั้น 1",
  }

  useEffect(() => {
    setBooking({
      Room: selected || defaultRoom,
      User: session.user,
      Date: props.selectedData.date.startDate || new Date().toLocaleDateString().replaceAll('/','-'),
      Timeslot: props.selectedData.time
    });
    console.log(booking)
    console.log(rooms)
  }, [selected])

  function formatDateToThaiLocale(inputDate) {
    // Parse the inputDate string into a Date object (assuming inputDate is in 'YYYY-MM-DD' format)
    const date = new Date(inputDate);
  
    // Define date formatting options for Thai locale
    const options = {
      year: 'numeric',
      month: 'long', // 'long' means full month name (e.g., 'มกราคม' for January)
      day: '2-digit', // '2-digit' means zero-padded day (e.g., '01' for the 1st day)
    };
  
    // Format the date using Thai locale and specified options
    const formatter = new Intl.DateTimeFormat('th-TH', options);
  
    // Format the date and return it as a string
    return formatter.format(date);
  }
  return (
    <div className="w-full px-4 pb-2">
      <div className="mx-auto w-full max-w-lg">
        {!isLoading ? (
          <>
            {rooms &&
              <Suspense fallback={<>Loading...</>}>
                <RadioGroup value={selected} onChange={setSelected}>
                  <RadioGroup.Label className="sr-only">รายการห้องว่าง</RadioGroup.Label>
                  <div className="space-y-2">
                    {rooms.map((room) => (
                      <RadioGroup.Option
                        key={room.RoomName}
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
              </Suspense>
            }
          </>
        ) : (
          <div className='flex flex-col items-center justify-center gap-4 h-[18em]'>
            <CheckBadgeIcon className="h-28 w-28 text-green-500" />
            <h1 className='text-xl font-medium'>จองห้องสำเร็จ!</h1>
            <span className="inline-flex flex-col text-center items-center rounded-md bg-gray-50 px-4 py-2 text-md font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
              <p className='flex'>{`${status.Room.RoomName} `}<MapPinIcon className='h-4 w-4 mx-1 translate-y-[0.15em] text-gray-500 inline' />{`${status.Room.Room_No} `}</p>
              <p className='flex'>{`วันที่ ${formatDateToThaiLocale(status.Date)} เวลา ${status.Timeslot.StartTime} — ${status.Timeslot.EndTime} น.`}</p>
            </span>
            <Link href={'/history'} className={'mb-2 w-full justify-center rounded-md mr-3.5 text-center px-2 py-3 text-md font-semibold text-gray-800 transition-all duration-200 hover:scale-105'}>
              <MagnifyingGlassIcon className="inline h-6 w-6" /> ดูประวัติการจอง
            </Link>
          </div>
        )}
      </div>
      {selected && !isLoading &&
        <RoomModal bookingDetail={booking} handleLoading={handleLoading} handleStatus={handleStatus} />
        // <button
        //   // onClick={sendDataToParent}
        //   className='absolute -top-6 right-6 md:right-12 text-lg md:text-xl lg:text-2xl text-white font-semibold bg-[#3E99EC] border-4 border-gray-100 p-2 px-6 mt-12 rounded-full hover:scale-105 transition-all duration-200'>
        //   จองห้อง
        // </button>
      }
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
