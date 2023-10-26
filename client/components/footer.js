import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import Logo from "@images/logo.png"
import Image from "next/image";
import Link from "next/link";


export default function footer() {
    return (
        <footer className="bg-white z-50 font-ibm shadow-sm border-t-2 border-gray-100">
            <div className="mx-auto w-full max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="md:flex md:justify-between">
                    <div className="mb-6 md:mb-0">
                        <Link href="/" className="flex items-center">
                            <Image src={Logo} className="h-12 w-auto mr-3" alt="Fogo" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">ช่วยเหลือผู้ใช้</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link href="/manual" className="hover:underline">คู่มือการใช้งาน</Link>
                                </li>
                                <li>
                                    <Link href="/contact" className="hover:underline">ติดต่อเรา</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">จองห้องประชุม</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link href="/booking" className="hover:underline ">เลือกจากวันและเวลา</Link>
                                </li>
                                <li>
                                    <Link href="/booking/room" className="hover:underline">เลือกจากห้องที่ต้องการ</Link>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase">รายงาน</h2>
                            <ul className="text-gray-500 font-medium">
                                <li className="mb-4">
                                    <Link href="/booking/list" className="hover:underline">รายงานการจองห้อง</Link>
                                </li>
                                <li>
                                    <Link href="#" className="hover:underline">นโยบายการให้บริการ</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
                <div className="sm:flex sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500 sm:text-center">© 2024 <Link href="https://computing.kku.ac.th/" className="hover:underline">College of Computing, Khon Kaen Univerity</Link>. All Rights Reserved.
                    </span>
                    <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
                        <Link href="/admin/dashboard" className="text-gray-500 hover:text-gray-900">
                            <Cog6ToothIcon className="h-4 w-4 text-gray-500" />
                            <span className="sr-only">Backend</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
