import Image from "next/image";
import bg from "@images/background.png"
import Link from "next/link";

export default function heroAdmin() {
    return (
        <section className="bg-white font-ibm py-16 lg:py-2">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex flex-row flex-wrap justify-between w-full">
                    <div className="flex-1 flex items-center justify-center w-3/4">
                        <div className="flex flex-col gap-2 justify-center items-center lg:items-start -translate-y-6">
                            <h1 className="font-bold text-4xl md:text-5xl text-[#3E99EC] text-center lg:text-left">ระบบจัดการห้องประชุม<br/>วิทยาลัยการคอมพิวเตอร์</h1>
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-600">เริ่มต้นจัดการห้องประชุมของคุณได้แล้ววันนี้</p>
                            <Link
                                href="/admin/rooms"
                             className="text-lg md:text-xl lg:text-2xl text-white font-semibold bg-[#3E99EC] border-4 border-gray-100 p-2 px-6 mt-12 rounded-full hover:scale-105 transition-all duration-200">
                                จัดการห้อง
                             </Link>
                        </div>
                    </div>
                    <div className="hidden lg:flex flex-1">
                        <Image src={bg} className="h-full w-auto object-cover" alt="bg"/>
                    </div>
                </div>
            </div>
        </section>
    );
}
