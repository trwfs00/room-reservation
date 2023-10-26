import { Dialog, Transition } from '@headlessui/react'
import { MapPinIcon, UsersIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
const IBM = IBM_Plex_Sans_Thai({
    subsets: ['thai'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-ibm'
})


export default function CancelModal(props) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const handleCancel = (bookingId) => {
        props.handleCancel(bookingId)
    }

    const isDateInPast = (dateStr) => {
        const today = new Date();
        const bookingDate = new Date(dateStr);
        return bookingDate < today;
    };
    return (
        <>
            <button
                type="button"
                onClick={openModal}
                disabled={isDateInPast(props.booking.BookingDate)}
                className="font-medium text-red-600 hover:underline disabled:text-gray-400 disabled:hover:no-underline"
            >
                ยกเลิก
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
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        ต้องการยกเลิก {props.booking.RoomID.RoomName} ?
                                    </Dialog.Title>
                                    <div className='mt-2 flex items-baseline'>
                                        <UsersIcon class='h-4 w-4 mr-1 translate-y-[0.15em] text-gray-500' /> {props.booking.RoomID?.Capacity}<span aria-hidden="true">&nbsp;&middot;&nbsp;</span> {props.booking.RoomID?.Description}
                                    </div>
                                    <span className='inline-flex items-baseline'>
                                        <MapPinIcon class='h-4 w-4 mr-1 translate-y-[0.15em] text-gray-500' />{props.booking.RoomID?.Room_No}
                                    </span>
                                    <span aria-hidden="true">&nbsp;&middot;</span>{' '}
                                    <span>{props.booking.RoomID?.Location}</span>
                                    <div className="flex justify-between mt-4">
                                        <span class="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                            {`วันที่ ${props.booking.BookingDate} เวลา ${props.booking.TimeslotID?.StartTime} - ${props.booking.TimeslotID?.EndTime} น.`}
                                        </span>
                                        <button
                                            type="button"
                                            className="inline-flex justify-end text-md text-white font-semibold bg-red-500 border-4 border-gray-100 p-2 px-6 rounded-full hover:scale-105 transition-all duration-200"
                                            onClick={() => handleCancel(props.booking._id)}
                                        >
                                            ยกเลิกจอง
                                        </button>
                                        <button
                                        type="button"
                                        className="inline-flex fixed right-4 top-4 rounded-full bg-gray-100 p-1 hover:bg-red-100 transition-all duration-200 hover:scale-110"
                                        onClick={closeModal}
                                    >
                                        <XMarkIcon className="h-6 w-6 text-gray-700 hover:text-red-700 transition-all duration-200 hover:rotate-90" />
                                    </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
