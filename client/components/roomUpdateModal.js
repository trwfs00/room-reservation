import { Dialog, Transition } from '@headlessui/react'
import { useRef } from 'react'
import { Fragment, useState } from 'react'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
const IBM = IBM_Plex_Sans_Thai({
    subsets: ['thai'],
    weight: ['100', '200', '300', '400', '500', '600', '700'],
    variable: '--font-ibm'
})
import { XMarkIcon } from '@heroicons/react/24/outline'
import Delete from '@components/roomConfirmDeleteModal'

export default function MyModal(props) {
    let [isOpen, setIsOpen] = useState(false)
    const [error, setError] = useState('');

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const roomNoInputRef = useRef();
    const roomNameInputRef = useRef();
    const descriptionInputRef = useRef();
    const capacityInputRef = useRef();
    const locationInputRef = useRef();

    async function handleDeleteRoom(roomId) {
        try {
            const response = await fetch(`http://localhost:8080/api/rooms/${roomId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Room deleted successfully');
            props.changeValue(data)
            setIsOpen(false);
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    }
    const handleUpdateRoom = async () => {
        if (roomNoInputRef.current.value == '' ||
            roomNameInputRef.current.value == '' ||
            descriptionInputRef.current.value == '' ||
            capacityInputRef.current.value == '' ||
            locationInputRef.current.value == ''
        ) {
            setError('กรุณากรอกข้อมูลให้ครบถ้วน');
        } else {
            const enteredRoom_No = roomNoInputRef.current.value;
            const enteredRoomName = roomNameInputRef.current.value;
            const enteredDescription = descriptionInputRef.current.value;
            const enteredCapacity = capacityInputRef.current.value;
            const enteredLocation = locationInputRef.current.value;

            try {
                const response = await fetch(`http://localhost:8080/api/rooms/${props.roomDetail._id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        Room_No: enteredRoom_No,
                        RoomName: enteredRoomName,
                        Description: enteredDescription,
                        Capacity: enteredCapacity,
                        Location: enteredLocation
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data); // You can handle the response as needed
                props.changeValue(data)
                setIsOpen(false);
            } catch (error) {
                console.error('Error updating user information:', error);
            }
        }
    };
    return (
        <>
            <button
                type="button"
                onClick={openModal}
                className="font-medium text-blue-600 hover:underline disabled:text-gray-400 disabled:hover:no-underline"
            >
                แก้ไข
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
                                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        แก้ไข {props.roomDetail.RoomName}
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-row gap-4 flex-wrap">
                                        <div className='flex-1 mb-2'>
                                            <div className="relative z-0 w-full mb-6 group text-left">
                                                <input type="text" name="Room_No" id="Room_No"
                                                    className="block py-3.5 px-0 w-full font-normal text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                    placeholder=" "
                                                    ref={roomNoInputRef}
                                                    defaultValue={props.roomDetail.Room_No}
                                                    required
                                                />
                                                <label htmlFor="Room_No" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">เลขห้อง *</label>
                                            </div>
                                        </div>
                                        <div className='flex-1 mb-2'>
                                            <div className="relative z-0 w-full mb-6 group text-left">
                                                <input type="text" name="RoomName" id="RoomName"
                                                    className="block py-3.5 px-0 w-full font-normal text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                    placeholder=" "
                                                    ref={roomNameInputRef}
                                                    defaultValue={props.roomDetail.RoomName}
                                                    required
                                                />
                                                <label htmlFor="RoomName" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อห้อง *</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-2 flex flex-row gap-4 flex-wrap">
                                        <div className='flex-1 mb-2'>
                                            <div className="relative z-0 w-full mb-6 group text-left">
                                                <input type="text" name="Description" id="Description"
                                                    className="block py-3.5 px-0 w-full font-normal text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                    placeholder=" "
                                                    ref={descriptionInputRef}
                                                    defaultValue={props.roomDetail.Description}
                                                    required
                                                />
                                                <label htmlFor="Description" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รายละเอียดห้อง *</label>
                                            </div>
                                        </div>
                                        <div className='flex-1 mb-2'>
                                            <div className="relative z-0 w-full mb-6 group text-left">
                                                <input type="number" name="Capacity" id="Capacity"
                                                    className="block py-3.5 px-0 w-full font-normal text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                    placeholder=" "
                                                    min="10"
                                                    max="150"
                                                    ref={capacityInputRef}
                                                    defaultValue={props.roomDetail.Capacity}
                                                    required
                                                />
                                                <label htmlFor="Capacity" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ความจุห้อง *</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex-1 mb-2'>
                                        <div className="relative z-0 w-full mb-6 group text-left">
                                            <input type="text" name="Location" id="Location"
                                                className="block py-3.5 px-0 w-full font-normal text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                placeholder=" "
                                                min="10"
                                                max="150"
                                                ref={locationInputRef}
                                                defaultValue={props.roomDetail.Location}
                                                required
                                            />
                                            <label htmlFor="Location" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ที่อยู่ *</label>
                                        </div>
                                    </div>
                                    {error && <p className='text-red-500'>{error}</p>}
                                    <div className="flex justify-between items-center mt-4">
                                        <Delete handleDeleteRoom={handleDeleteRoom} room={props.roomDetail} />
                                        <button
                                            type="button"
                                            className="inline-flex justify-end text-md text-white font-semibold bg-[#3E99EC] border-4 border-gray-100 p-2 px-6 rounded-full hover:scale-105 transition-all duration-200"
                                            onClick={handleUpdateRoom}
                                        >
                                            ยืนยันแก้ไข
                                        </button>
                                    </div>
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
