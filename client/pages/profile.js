import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useState } from "react";

export default function profile() {
    const router = useRouter();
    const { data: session, update } = useSession();
    const [profile, setProfile] = useState(true)
    const [error, setError] = useState('');

    const fullNameInputRef = useRef();
    const telInputRef = useRef();

    const handleUpdateUser = async () => {
        if (fullNameInputRef.current.value == '' ||
            telInputRef.current.value == ''
        ) {
            setError('กรุณากรอกข้อมูลให้ครบถ้วน');
        } else {
            const userId = session.user._id
            const enteredFullName = fullNameInputRef.current.value;
            const enteredTel = telInputRef.current.value;

            try {
                const response = await fetch(`http://localhost:8080/api/users/update/${userId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullName: enteredFullName,
                        tel: enteredTel,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data); // You can handle the response as needed
                setProfile(false);

            } catch (error) {
                console.error('Error updating user information:', error);
            }
        }

    };
    return (
        <div className="bg-white font-ibm">
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
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                                    ตั้งค่าโปรไฟล์
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-14 pb-20 lg:px-8'>
                {profile ? (
                    <>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm z-10">
                            <h2 className="my-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                ตั้งค่าโปรไฟล์
                            </h2>
                            <p className="text-md text-center text-gray-500">
                                ตั้งค่าบัญชีใหม่ กรอกข้อมูลของคุณเพื่ออัปเดตโปรไฟล์
                            </p>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6" action="#" method="POST">
                                <div className="relative z-0 w-full mb-6 group text-left">
                                    <input type="text" name="floating_name" id="floating_name"
                                        className="block py-3.5 px-0 w-full font-light text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                        placeholder=" "
                                        ref={fullNameInputRef}
                                        defaultValue={session?.user?.fullName}
                                        required
                                    />
                                    <label htmlFor="floating_name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">ชื่อ-สกุล *</label>
                                </div>

                                <div className="relative z-0 w-full mb-6 group text-left">
                                    <input type="tel" name="floating_tel" id="floating_tel"
                                        className="block py-3.5 px-0 w-full font-light text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                        placeholder=" "
                                        ref={telInputRef}
                                        defaultValue={session?.user?.tel}
                                        required
                                    />
                                    <label htmlFor="floating_tel" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">เบอร์โทรศัพท์ *</label>
                                </div>
                                {error && <p className='text-red-500'>{error}</p>}
                                <div>
                                    <button
                                        type="button"
                                        onClick={handleUpdateUser}
                                        className="mb-2 w-full justify-center rounded-md mr-3.5 bg-[#3E99EC] px-2 py-3 text-md font-semibold text-white transition-all duration-200 hover:scale-105"

                                    >
                                        อัปเดตโปร์ไฟล์
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm h-[29.65em]">
                            <h2 className="my-4 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                ตั้งค่าบัญชีใหม่สำเร็จ!
                            </h2>
                            <p className="text-md text-center text-gray-500">
                                หากต้องการอัปเดตค่าที่เปลี่ยนแปลงกรุณาเข้าสู่ระบบใหม่อีกครั้ง
                            </p>

                            <button
                                type="button"
                                onClick={() => router.push('/')}
                                className="mt-4 w-full justify-center rounded-md mr-3.5 bg-[#3E99EC] px-2 py-3 text-md font-semibold text-white transition-all duration-200 hover:scale-105"
                            >
                                กลับหน้าหลัก
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
