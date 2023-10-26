import { Dialog, Transition } from '@headlessui/react'
import { MapPinIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
const IBM = IBM_Plex_Sans_Thai({
    subsets: ['thai'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-ibm'
})

export default function MyModal(props) {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="inline-flex justify-end text-md text-gray-900 font-semibold bg-gray-200 border-4 border-gray-100 p-2 px-6 rounded-full hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200"
            >
                ลบห้อง
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
                                        คุณแน่ใจ ที่จะลบห้องนี้หรือไม่ ?
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <span class="inline-flex flex-col w-full items-center justify-start rounded-md bg-gray-50 px-2 py-1 text-md font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                            <p>{`${props.room.Room_No} - ${props.room.RoomName}`}</p>
                                            <p>{props.room.Location}</p>
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center mt-4">
                                        <button
                                            type="button"
                                            className="inline-flex justify-end text-md text-white font-semibold bg-[#3E99EC] border-4 border-gray-100 p-2 px-6 rounded-full hover:scale-105 transition-all duration-200"
                                            onClick={closeModal}
                                        >
                                            ย้อนกลับ
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex justify-end text-md text-gray-900 font-semibold bg-gray-200 border-4 border-gray-100 p-2 px-6 rounded-full hover:bg-red-500 hover:text-white hover:scale-105 transition-all duration-200"
                                            onClick={() => props.handleDeleteRoom(props.room._id)}
                                        >
                                            ยืนยันลบห้อง
                                        </button>
                                    </div>
                                    {/* <button
                                        type="button"
                                        className="inline-flex fixed right-4 top-4 rounded-full bg-gray-100 p-1 hover:bg-red-100 transition-all duration-200 hover:scale-110"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <XMarkIcon className="h-6 w-6 text-gray-700 hover:text-red-700 transition-all duration-200 hover:rotate-90" />
                                    </button> */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
