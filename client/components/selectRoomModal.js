import { Dialog, Transition } from '@headlessui/react'
import { useEffect } from 'react'
import { Fragment, useState } from 'react'
import { IBM_Plex_Sans_Thai } from 'next/font/google'
const IBM = IBM_Plex_Sans_Thai({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm'
})
import RoomList from '@components/roomListRadio'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function MyModal(props) {
  let [isOpen, setIsOpen] = useState(false)
  const [room, setRoom] = useState();

  const handleSelectRoom = (newRoom) => {
    setRoom(newRoom);
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const [list, setList] = useState([]);
  async function findList() {
    try {
      const response = await fetch('http://localhost:8080/api/rooms', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setList(data);
      console.log(data)
    } catch (error) {
      console.error('Error fetching available rooms:', error);
    }
  }

  const handleSend = (params) => {
    props.handleSelectRoom(params)
    closeModal();
  }

  useEffect(() => {
    findList();
  }, [isOpen]);

  useEffect(() => {
    console.log(room)
  }, [room])

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="w-full -top-6 right-6 md:right-12 text-lg md:text-xl lg:text-2xl text-white font-semibold bg-[#3E99EC] border-4 border-gray-100 p-2 px-6 rounded-2xl hover:scale-105 transition-all duration-200"
      >
        เลือกห้อง
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
                    เลือกห้องที่คุณต้องการ ({list.length})
                  </Dialog.Title>
                  <div className="mt-6 h-[16em] overflow-y-auto overflow-hidden rounded-2xl">
                    <RoomList handleSelectRoom={handleSelectRoom} rooms={list} />
                  </div>

                  <div className="flex justify-end mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-end text-md text-white font-semibold bg-[#3E99EC] border-4 border-gray-100 p-2 px-6 rounded-full hover:scale-105 transition-all duration-200"
                      onClick={() => handleSend(room)}
                    >
                      ยืนยันเลือกห้อง
                    </button>
                  </div>
                  <button
                    type="button"
                    className="inline-flex fixed right-4 top-4 rounded-full bg-gray-100 p-1 hover:bg-red-100 transition-all duration-200 hover:scale-110"
                    onClick={closeModal}
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
