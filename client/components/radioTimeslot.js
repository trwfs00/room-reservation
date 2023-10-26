import { useEffect, useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { CheckBadgeIcon, MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

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

export default function RadioTimeslot(props) {
  const { data: session } = useSession();
  const [selected, setSelected] = useState(plans[0])
  const [created, setCreated] = useState();

  const [list, setList] = useState([]);
  const fetchTimeslots = async () => {
    const date = props.date.startDate
    const roomId = props.room._id

    try {
      const response = await fetch('http://localhost:8080/api/search/available-timeslots', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: date,
          roomId: roomId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setList(data);
      setSelected(data[0])
    } catch (error) {
      console.error('Error finding available timeslots information:', error);
    }
  };

  useEffect(() => {
    fetchTimeslots();
    setCreated();
    console.log(props.date.startDate)
    console.log(props.room._id)
  }, [props])

  const createBooking = async () => {
    const userId = session.user._id
    const date = props.date.startDate
    const roomId = props.room._id
    const timeslotId = selected._id

    try {
      const response = await fetch('http://localhost:8080/api/bookings/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          RoomID: roomId,
          UserID: userId,
          BookingDate: date,
          TimeslotID: timeslotId,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data);
      setCreated(data);
    } catch (error) {
      console.error('Error creating booking information:', error);
    }
  };

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
    <div className="w-full px-4 py-2">
      <div className="mx-auto w-full max-w-lg">
        {!created ? (
          <>
            <RadioGroup value={selected} onChange={setSelected}>
              <RadioGroup.Label className="sr-only">เลือกช่วงเวลา</RadioGroup.Label>
              <div className="space-y-2">
                {list.map((item) => (
                  <RadioGroup.Option
                    key={item._id}
                    value={item}
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
                            <div className="text-sm">
                              <RadioGroup.Label
                                as="p"
                                className={`font-medium flex w-full justify-center  ${checked ? 'text-white' : 'text-gray-900'
                                  }`}
                              >
                                เวลา {item.StartTime} - {item.EndTime} น.
                              </RadioGroup.Label>
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
          </>
        ) : (
          <>
            <div className='flex flex-col items-center justify-center gap-4 h-[18em]'>
              <CheckBadgeIcon className="h-28 w-28 text-green-500" />
              <h1 className='text-xl font-medium'>จองห้องสำเร็จ!</h1>
              <span className="inline-flex flex-col text-center items-center rounded-md bg-gray-50 px-4 py-2 text-md font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                <p className='flex'>{`${props.room.RoomName} `}<MapPinIcon className='h-4 w-4 mx-1 translate-y-[0.15em] text-gray-500 inline' />{`${props.room.Room_No} `}</p>
                <p className='flex'>{`วันที่ ${formatDateToThaiLocale(props.date.startDate)} เวลา ${selected.StartTime} — ${selected.EndTime} น.`}</p>
              </span>
              <Link href={'/history'} className={'mb-2 w-full justify-center rounded-md mr-3.5 text-center px-2 py-3 text-md font-semibold text-gray-800 transition-all duration-200 hover:scale-105'}>
                <MagnifyingGlassIcon className="inline h-6 w-6" /> ดูประวัติการจอง
              </Link>
            </div>
          </>
        )}
      </div>
      {selected && !created &&
        <button
          onClick={createBooking}
          className='absolute -top-6 right-6 md:right-12 text-lg md:text-xl lg:text-2xl text-white font-semibold bg-[#3E99EC] border-4 border-gray-100 p-2 px-6 mt-12 rounded-full hover:scale-105 transition-all duration-200'>
          จองห้อง
        </button>
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
