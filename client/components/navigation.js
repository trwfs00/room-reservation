import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react'
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  BuildingOfficeIcon,
  IdentificationIcon,
  ClipboardDocumentListIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'
import Logo from '@images/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut, signIn, signUp } from 'next-auth/react';
import UserDrop from '@components/userDropdown'
import LoginForm from '@components/loginForm'

import { IBM_Plex_Sans_Thai } from 'next/font/google'
import { useRouter } from 'next/router'
const IBM = IBM_Plex_Sans_Thai({
  subsets: ['thai'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-ibm'
})


const products = [
  { name: 'ค้นหาจากวันที่ต้องการ', description: 'ค้นหาห้องที่ว่างในช่วงเวลาที่คุณต้องการ', href: '/booking', icon: CalendarDaysIcon },
  { name: 'ค้นหาจากห้องประชุม', description: 'ค้นหาช่วงเวลาจองห้องที่คุณต้องการ', href: '/booking/rooms', icon: BuildingOfficeIcon },
]
const callsToAction = [
  { name: 'คู่มือการใช้งาน', href: '#', icon: BookOpenIcon },
  { name: 'ติดต่อเรา', href: '#', icon: PhoneIcon },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <header className="bg-white sticky top-0 z-40 font-ibm shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-4">
            <span className="sr-only">College of Computing</span>
            <Image className="h-12 w-auto border-r-2 pr-6 border-[#3E99EC]" src={Logo} alt="Logo" />
            {session?.user?.role != 'admin' ? (
              <h1 className='text-[#3E99EC] text-xl font-medium transition-all duration-200 hover:scale-105 hover:mx-2'>ระบบจองห้องประชุม</h1>
            ) : (
              <h1 className='text-[#3E99EC] text-xl font-medium transition-all duration-200 hover:scale-105 hover:mx-2'>ระบบจัดการห้องประชุม</h1>
            )}
          </Link>
        </div>
        <div className='flex lg:gap-x-12 items-center'>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            {session?.user?.role != 'admin' ? (
              <>
                <Popover className="relative">
                  <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 transition duration-200 hover:scale-110">
                    เริ่มต้นจองห้อง
                    <ChevronDownIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
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
                    <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                      <div className="p-4">
                        {products.map((item) => (
                          <div
                            key={item.name}
                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                              <item.icon className="h-6 w-6 text-gray-600 group-hover:text-[#3E99EC]" aria-hidden="true" />
                            </div>
                            <div className="flex-auto">
                              <Link href={item.href} className="block font-semibold text-gray-900">
                                {item.name}
                                <span className="absolute inset-0" />
                              </Link>
                              <p className="mt-1 text-gray-600">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                        {callsToAction.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                          >
                            <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </>
            ) : (
              <>
                <Link href="/admin/rooms" className="text-sm font-semibold leading-6 text-gray-900 transition duration-200 hover:scale-110">
                  จัดการห้องประชุม
                </Link>
              </>
            )}
            <Link href="/booking/list" className="text-sm font-semibold leading-6 text-gray-900 transition duration-200 hover:scale-110">
              รายงานการจองห้อง
            </Link>
            <Link href="/booking/list/date" className="text-sm font-semibold leading-6 text-gray-900 transition duration-200 hover:scale-110">
              รายงานตามวันที่
            </Link>
          </Popover.Group>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {session?.user?.email ? (
              <>
                <UserDrop />
                {/* <button onClick={() => signOut()} className="block bg-red-500 rounded-full py-1.5 px-4 border-4 border-gray-100 text-sm font-semibold leading-7 text-white transition duration-200 hover:scale-110">
                  ออกจากระบบ <span aria-hidden="true">&rarr;</span>
                </button> */}
              </>
            ) : (
              <LoginForm className="block bg-[#3E99EC] rounded-full py-1.5 px-4 border-4 border-gray-100 text-sm font-semibold leading-7 text-white transition duration-200 hover:scale-110">
                เข้าสู่ระบบ <span aria-hidden="true">&rarr;</span>
              </LoginForm>
            )}
          </div>
        </div>
      </nav>

      <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
        <div className="fixed inset-0" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 sm:invisible">
              <span className="sr-only">College of Computing</span>
              <Image
                className="h-12 w-auto"
                src={Logo}
                alt="Logo"
              />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className={`-mx-3 ${IBM.className}`}>
                  {({ open }) => (
                    <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          เริ่มต้นจองห้อง
                          <ChevronDownIcon
                            className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...products, ...callsToAction].map((item) => (
                          <Disclosure.Button
                            key={item.name}
                            as="button"
                            onClick={() => { router.replace(item.href) }}
                            className="block w-full text-left rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </Disclosure.Button>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  href="/booking/list"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  รายงานการจองห้อง
                </Link>
                <Link
                  href="/booking/list/date"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  รายงานตามวันที่
                </Link>
              </div>
              <div className="py-6">
                {session?.user?.email ? (
                  <>
                    {/* <UserDrop /> */}
                    <Disclosure as="div" className={`-mx-3 ${IBM.className}`}>
                      {({ open }) => (
                        <>
                          <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            <div className='flex gap-2 items-center'>
                              <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full mr-2 border-2">
                                <svg className="absolute w-12 h-12 text-gray-400 -left-1.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                              </div>
                              {session?.user?.fullName}
                            </div>
                            <ChevronDownIcon
                              className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')}
                              aria-hidden="true"
                            />
                          </Disclosure.Button>
                          <Disclosure.Panel className="mt-2 space-y-2">
                            <Disclosure.Button
                              as="button"
                              onClick={() => { router.replace('/profile') }}
                              className="flex w-full items-center gap-5 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              <IdentificationIcon className="h-6 w-6 text-gray-500" /> โปรไฟล์
                            </Disclosure.Button>
                                <Disclosure.Button
                                  as="button"
                                  onClick={() => { router.replace('/history') }}
                                  className="flex w-full items-center gap-5 rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                  <ClipboardDocumentListIcon className="h-6 w-6 text-gray-500" /> การจองของฉัน
                                </Disclosure.Button>
                            <Disclosure.Button
                              as="button"
                              onClick={() => signOut()}
                              className="flex items-center gap-5 w-full rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-red-500 hover:bg-gray-50"
                            >
                              <ArrowLeftOnRectangleIcon className="h-6 w-6 text-red-500" /> ออกจากระบบ
                            </Disclosure.Button>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  </>
                ) : (
                  <LoginForm className="block bg-[#3E99EC] rounded-full py-1.5 px-4 border-4 border-gray-100 text-sm font-semibold leading-7 text-white transition duration-200 hover:scale-110">
                    เข้าสู่ระบบ <span aria-hidden="true">&rarr;</span>
                  </LoginForm>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  )
}
