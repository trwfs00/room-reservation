import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  ChartPieIcon,
  ChevronUpDownIcon,
  ClipboardDocumentListIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  IdentificationIcon,
  SquaresPlusIcon,
} from '@heroicons/react/24/outline'
import UserPic from '@images/user-default.jpg'
import Image from 'next/image'
import { useSession, signOut, signIn, signUp } from 'next-auth/react';
import Link from 'next/link'

const solutions = [
  { name: 'โปรไฟล์', description: 'แก้ไขข้อมูลส่วนตัว', href: '/profile', icon: IdentificationIcon },
  { name: 'การจองของฉัน', description: 'ประวัติการจองห้อง', href: '/history', icon: ClipboardDocumentListIcon },
  // { name: 'ประวัติการจอง', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
]

export default function userDropdown() {
  const { data: session } = useSession();
  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        {/* <img src={UserPic.src} className='h-12 w-12 object-cover rounded-full mr-2' alt="test" priority /> */}
        <div className="relative w-12 h-12 overflow-hidden bg-gray-100 rounded-full mr-2 border-2">
          <svg className="absolute w-14 h-14 text-gray-400 -left-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
        </div>
        <div className='flex flex-col justify-center items-start mr-4'>
          <span className='text-xs text-gray-600'>สวัสดี, ยินดีต้อนรับ</span>
          <span className='text-md text-gray-900'>{session?.user?.fullName || "Unknown"}</span>
        </div>
        <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-[42.5%] translate-y-[-1.25em] px-4">
          <div className="w-screen max-w-[calc(18em+20px)] flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {session.user.role === 'user' ?
                (
                  <>
                    {solutions.map((item) => (
                      <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-50">
                        <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200">
                          <item.icon className="h-6 w-6 text-gray-600 group-hover:text-[#3E99EC]" aria-hidden="true" />
                        </div>
                        <div>
                          <Link href={item.href} className="font-semibold text-gray-900">
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                          <p className="mt-1 text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <>
                    <div className="group relative flex gap-x-6 rounded-lg p-2 hover:bg-gray-50">
                      <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200">
                        <IdentificationIcon className="h-6 w-6 text-gray-600 group-hover:text-[#3E99EC]" aria-hidden="true" />
                      </div>
                      <div>
                        <Link href='/profile' className="font-semibold text-gray-900">
                          โปรไฟล์
                          <span className="absolute inset-0" />
                        </Link>
                        <p className="mt-1 text-gray-600">แก้ไขข้อมูลส่วนตัว</p>
                      </div>
                    </div>
                  </>
                )
              }


              <div className="group relative flex justify-start gap-x-6 rounded-lg p-2 hover:bg-gray-50">
                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-gray-200">
                  <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-500 group-hover:text-red-500" />
                </div>
                <button onClick={() => signOut()} className="font-semibold text-gray-900 group-hover:text-red-500">
                  ออกจากระบบ
                </button>
              </div>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  )
}
