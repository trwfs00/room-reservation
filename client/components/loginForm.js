import { Fragment, useRef, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { data } from 'autoprefixer'
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { signIn } from 'next-auth/react';
import { IBM_Plex_Sans_Thai } from 'next/font/google'
const IBM = IBM_Plex_Sans_Thai({ 
    subsets: ['thai'],
    weight: ['100','200','300','400','500','600','700'],
    variable: '--font-ibm'
   })


export default function loginForm(props) {
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const handleModal = () => {
        if (open || !open) setOpen(!open)
    }
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const [error, setError] = useState('');

    const emailInputRef = useRef();
    const passwordInputRef = useRef();

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace('/');
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (enteredEmail && enteredPassword) {
      await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      }).then(({ ok, error }) => {
        if (ok) {
            router.push("/");
        } else {
            console.log(error)
            setError(error)
        }
    })
    } 
  }

    return (
        <>
            <button type="button"
                className={props.className}
                onClick={handleModal}
            >
                เข้าสู่ระบบ &rarr;
            </button>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className={`relative z-50 ${IBM.className}`} initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-3xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:py-4">
                                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <button
                                                type="button"
                                                className="inline-flex fixed right-4 top-4 rounded-full bg-gray-100 p-1 hover:bg-red-100 transition-all duration-200 hover:scale-110"
                                                onClick={() => setOpen(false)}
                                            >
                                                <XMarkIcon className="h-6 w-6 text-gray-700 hover:text-red-700 transition-all duration-200 hover:rotate-180" />
                                            </button>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0">
                                                <Dialog.Title as="h3" className="font-mtserif text-xl md:text-2xl lg:text-3xl font-semibold leading-6 mb-4 text-gray-900">
                                                    เข้าสู่ระบบ
                                                </Dialog.Title>
                                                <div className="mt-2 text-left">
                                                    <p className="text-sm lg:text-md xl:text-lg text-center p-2 text-gray-500">
                                                        ยินดีต้อนรับกลับ, กรอกอีเมลและรหัสผ่านของคุณเพื่อเข้าสู่ระบบ และดำเนินการจองห้องประชุมได้ทันที
                                                    </p>            
                                                    <div className="relative z-0 w-full my-6 group text-left">
                                                        <input type="email" name="floating_email" id="floating_email"
                                                            className="block py-3.5 px-0 w-full text-md font-light text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                            placeholder=" "
                                                            required
                                                            ref={emailInputRef}
                                                        />
                                                        <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">อีเมล</label>
                                                    </div>
                                                    <div className="relative z-0 w-full mb-6 group text-left">
                                                        <input type="password" name="floating_password" id="floating_password"
                                                            className="block py-3.5 px-0 w-full font-light text-md text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer"
                                                            placeholder=" "
                                                            required
                                                            ref={passwordInputRef}
                                                        />
                                                        <label htmlFor="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-gray-900  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">รหัสผ่าน</label>
                                                    </div>
                                                    <div>{error ? <p className="text-red-500">{error}</p> : null}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-white px-4 py-3 sm:flex sm:flex-col gap-4 sm:gap-2 sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex mb-2 w-full justify-center rounded-md mr-3.5 bg-[#3E99EC] px-2 py-3 text-md font-semibold text-white  hover:bg-[#3e8fec] sm:ml-3 sm:w-auto transition-all duration-200 hover:scale-105"
                                            onClick={handleSubmit}
                                        >
                                            เข้าสู่ระบบ
                                        </button>
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-white px-2 py-3 text-md font-normal text-gray-900 sm:ml-3 sm:w-auto transition-all duration-200 hover:scale-105"
                                            onClick={() => setOpen(false)}
                                        >
                                            ยังไม่บัญชี? <Link href={"/signup"} className='text-md font-semibold ml-2'>สร้างบัญชีใหม่</Link>
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    )
}