import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { MapPinIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
const IBM = IBM_Plex_Sans_Thai({
    subsets: ['thai'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-ibm'
})

export default function MyModal(props) {
    const router = useRouter();
    let [isOpen, setIsOpen] = useState(false)
    const [bookingResult, setBookingResult] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [bodyAPI, setBodyAPI] = useState({});

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
        setErrorMessage('')
        setBodyAPI({
            RoomID: props.bookingDetail.Room._id,
            UserID: props.bookingDetail.User._id,
            BookingDate: props.bookingDetail.Date,
            TimeslotID: props.bookingDetail.Timeslot._id
        })
        console.log({...bodyAPI})
    }

    const handleLoading = (status) => {
        props.handleLoading(status);
    }

    const handleStatus = (data) => {
        props.handleStatus(data)
    }
    const handleSubmit = async () => {
        try {
            
            let response = await fetch('http://localhost:8080/api/bookings/create', {
                method: "POST",
                body: JSON.stringify({
                    ...bodyAPI
                }),
                headers: {
                    Accept: "application/json , text/plain, */*",
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const data = await response.json();
                setBookingResult(data);
                handleLoading(true)
                handleStatus(props.bookingDetail);
                setIsOpen(false);
          } else {
                throw new Error(`HTTP Error: ${response.status}`);
            }

        } catch (error) {
            setErrorMessage(error)
            console.log(error)
        }

    }

    useEffect(() => {
        console.log(props.bookingDetail)
    }, [isOpen])
    useEffect(() => {
        setBodyAPI({
            RoomID: props.bookingDetail.Room._id,
            UserID: props.bookingDetail.User._id,
            BookingDate: props.bookingDetail.Date,
            TimeslotID: props.bookingDetail.Timeslot._id
        })
    }, [props.bookingDetail])


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
        <>
            <button
                type="button"
                onClick={openModal}
                className="absolute -top-6 right-6 md:right-12 text-lg md:text-xl lg:text-2xl text-white font-semibold bg-[#3E99EC] border-4 border-gray-100 p-2 px-6 mt-12 rounded-full hover:scale-105 transition-all duration-200"
            >
                จองห้อง
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className={`relative z-10 ${IBM.className}`} onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-xl font-medium leading-6 text-gray-900"
                                    >
                                        {props.bookingDetail.Room?.RoomName}
                                    </Dialog.Title>
                                    <div className='mt-2 flex items-baseline'>
                                        <UsersIcon class='h-4 w-4 mr-1 translate-y-[0.15em] text-gray-500' /> {props.bookingDetail.Room?.Capacity}<span aria-hidden="true">&nbsp;&middot;&nbsp;</span> {props.bookingDetail.Room?.Description}
                                    </div>
                                    <span className='inline-flex items-baseline'>
                                        <MapPinIcon class='h-4 w-4 mr-1 translate-y-[0.15em] text-gray-500' />{props.bookingDetail.Room?.Room_No}
                                    </span>
                                    <span aria-hidden="true">&nbsp;&middot;</span>{' '}
                                    <span>{props.bookingDetail.Room?.Location}</span>
                                    <div className="flex justify-between mt-4">
                                        <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                            {`วันที่ ${formatDateToThaiLocale(props.bookingDetail.Date)} เวลา ${props.bookingDetail.Timeslot?.StartTime} - ${props.bookingDetail.Timeslot?.EndTime} น.`}
                                        </span>
                                        <button
                                            type="button"
                                            className="inline-flex justify-end text-md text-white font-semibold bg-[#3E99EC] border-4 border-gray-100 p-2 px-6 rounded-full hover:scale-105 transition-all duration-200"
                                            onClick={handleSubmit}
                                        >
                                            ยืนยันจองห้อง
                                        </button>
                                    </div>
                                    {errorMessage && <p className='text-red-500 mt-4'>Error: {errorMessage}</p>}
                                    <button
                                        type="button"
                                        className="inline-flex fixed right-4 top-4 rounded-full bg-gray-100 p-1 hover:bg-red-100 transition-all duration-200 hover:scale-110"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <XMarkIcon className="h-6 w-6 text-gray-700 hover:text-red-700 transition-all duration-200 hover:rotate-90" />
                                    </button>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
