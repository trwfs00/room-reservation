import Image from "next/image";
import bg from "@images/background.png"
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";
import RadioBox from '@components/radiobox'
import SelectBox from '@components/selectbox'
import { useEffect } from "react";
import SelectRoom from '@components/selectRoomModal';
import RadioTimeslot from '@/components/radioTimeslot';
import { CheckBadgeIcon, CheckCircleIcon, MapPinIcon, UsersIcon } from "@heroicons/react/24/outline";

export default function DateBooking() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    function convertDateFormat(originalDateString) {
        // Split the original date string using '-'
        const parts = originalDateString.split('-');

        // Rearrange the parts into 'YYYY-MM-DD' format
        const reformattedDateString = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;

        return reformattedDateString;
    }

    const [value, setValue] = useState({
        startDate: convertDateFormat(tomorrow.toLocaleDateString().replaceAll('/', '-')),
        endDate: convertDateFormat(tomorrow.toLocaleDateString().replaceAll('/', '-'))
    });
    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
    }

    const [search, setSearch] = useState(false);
    const [room, setRoom] = useState();

    const handleSelectRoom = (room) => {
        setRoom(room);
    }


    return (
        <section className="bg-white font-ibm">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-6 py-10 md:py-0 lg:px-8">
                <div className="flex flex-col sm:flex-row flex-wrap justify-between w-full pb-8 py-2">
                    <div className="flex-1 flex items-center justify-center sm:w-3/4">
                        <div className="flex flex-col gap-2 justify-center items-center lg:items-start -translate-y-6">
                            <h1 className="font-bold text-4xl md:text-5xl text-[#3E99EC] text-center lg:text-left">ค้นหาห้องประชุม<br />เพื่อหาช่วงเวลาที่ห้องว่าง</h1>
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
                                เลือกวันที่และห้องประชุมที่คุณต้องการจอง<br />เพื่อค้นหาช่วงเวลาที่ว่างได้ทันที
                            </p>
                            <form className="flex flex-row flex-wrap justify-between w-full mt-6 gap-6">
                                <div className="w-3/5">
                                    <Datepicker
                                        placeholder={"เลือกวันที่ต้องการจอง"}
                                        popoverDirection="up"
                                        minDate={convertDateFormat(today.toLocaleDateString().replaceAll('/', '-'))}
                                        useRange={false}
                                        asSingle={true}
                                        value={value}
                                        onChange={handleValueChange}
                                        displayFormat={"DD-MM-YYYY"}
                                        readOnly={true}
                                        inputClassName={'py-3.5 px-0 w-full text-md font-normal text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-gray-400 peer'}
                                    />
                                </div>
                                <div className="flex-1">
                                    <SelectRoom handleSelectRoom={handleSelectRoom} />
                                </div>
                            </form>
                            {room &&
                                <div className="bg-white w-full mt-5 border relative rounded-lg px-5 py-4 shadow-md focus:outline-none">
                                    <h1 className="text-md font-medium text-gray-900">
                                        {room.RoomName}
                                    </h1>
                                    <span className="inline text-gray-500">
                                        <div className='mt-2 flex items-baseline'>
                                            <UsersIcon className={`h-4 w-4 mr-1 translate-y-[0.15em] text-gray-500`} /> {room.Capacity}<span aria-hidden="true">&nbsp;&middot;&nbsp;</span> {room.Description}
                                        </div>
                                        <span className='inline-flex items-baseline'>
                                            <MapPinIcon className={`h-4 w-4 mr-1 translate-y-[0.15em] text-gray-500`} />{room.Room_No}
                                        </span>
                                        <span aria-hidden="true">&nbsp;&middot;</span>{' '}
                                        <span>{room.Location}</span>
                                    </span>
                                    <div className="bg-[#3E99EC] rounded-full absolute -translate-y-[150%] w-10 h-10 right-8">
                                        <CheckCircleIcon class="h-14 w-14 text-white -translate-x-2 -translate-y-2" />
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    {room && value.startDate != null ? (
                        <div className="bg-gray-50 rounded-3xl flex flex-col flex-1 -translate-y-10 my-14 pt-8 pb-8">
                            <h1 className="ml-4 md:ml-11 text-xl font-semibold translate-y-2">ช่วงเวลาที่ว่าง</h1>
                            <div className="mt-10 h-[20em] overflow-y-auto overflow-hidden">
                            <RadioTimeslot room={room} date={value}/>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1">
                            <Image src={bg} className="h-full w-auto object-cover" alt="bg" />
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}