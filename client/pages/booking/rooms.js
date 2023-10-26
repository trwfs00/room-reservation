import RoomsBook from '@/components/roomBooking';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Booking() {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(()=>{
    if(!session) {
      router.push('/signup');
    }
  })
  return (
    <div className="bg-white font-ibm py-2">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <nav className="flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#3E99EC]">
                <svg className="w-3 h-3 mr-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                </svg>
                หน้าหลัก
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <Link href="/booking" className="ml-1 text-sm font-medium text-gray-700 hover:text-[#3E99EC] md:ml-2">
                  การจอง
                  </Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  ค้นหาจากห้องประชุม
                </span>
              </div>
            </li>
          </ol>
        </nav>
      </div>
      <RoomsBook/>
    </div>
  )
}
