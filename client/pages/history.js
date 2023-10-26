import CancelModal from "@/components/cancelModal";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useState } from "react";

export default function history() {
    const { data: session } = useSession();
    const [history, setHistory] = useState([]);
    async function findHistory() {
        try {
            const response = await fetch('http://localhost:8080/api/search/history', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: session.user._id }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setHistory(data);
            console.log(data)
        } catch (error) {
            console.error('Error fetching available rooms:', error);
        }
    }

    async function handleCancel(bookingId) {
        try {
            const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // If the booking was deleted successfully, remove it from the history state
            setHistory((prevHistory) => prevHistory.filter((booking) => booking._id !== bookingId));
            console.log('Booking deleted successfully');
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    }

    useEffect(() => {
        findHistory();
    }, []);


    function formatTimestamp(timestamp) {
        const dateObj = new Date(timestamp);
        const currentDate = new Date();

        const timeDifference = currentDate - dateObj; // Difference in milliseconds
        const secondsAgo = Math.floor(timeDifference / 1000); // Convert milliseconds to seconds
        const minutesAgo = Math.floor(secondsAgo / 60); // Convert seconds to minutes
        const hoursAgo = Math.floor(minutesAgo / 60); // Convert minutes to hours
        const daysAgo = Math.floor(hoursAgo / 24); // Convert hours to days
        const monthsAgo = Math.floor(daysAgo / 30); // Approximate months
        const yearsAgo = Math.floor(monthsAgo / 12); // Approximate years

        if (yearsAgo > 0) {
            return `${yearsAgo} ปีที่แล้ว`;
        } else if (monthsAgo > 0) {
            return `${monthsAgo} เดือนที่แล้ว`;
        } else if (daysAgo > 0) {
            return `${daysAgo} วันที่แล้ว`;
        } else if (hoursAgo > 0) {
            return `${hoursAgo} ชั่วโมงที่แล้ว`;
        } else if (minutesAgo > 0) {
            return `${minutesAgo} นาทีที่แล้ว`;
        } else {
            return `${secondsAgo} วินาทีที่แล้ว`;
        }
    }

    // Define the number of items to display per page
    const [itemsPerPage, setItemsPerPage] = useState(5);

    // Initialize the current page to 1
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate the index range for the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Slice the data array to display only items for the current page
    const displayedList = history.slice(startIndex, endIndex);

    // Function to handle page navigation
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const handlePageSizeChange = (event) => {
        const newSize = parseInt(event.target.value, 10);
        setItemsPerPage(newSize);
        setCurrentPage(1); // Reset to the first page when changing pagination size
    };

    function formatDateToThaiLocale(inputDate) {
        // Parse the inputDate string into a Date object (assuming inputDate is in 'YYYY-MM-DD' format)
        const date = new Date(inputDate);

        // Define date formatting options for Thai locale
        const options = {
            year: 'numeric',
            month: 'long', // 'long' means full month name (e.g., 'มกราคม' for January)
            day: '2-digit', // '2-digit' means zero-padded day (e.g., '01' for the 1st day)
        };

        // Format the date using Thai locale and specified options
        const formatter = new Intl.DateTimeFormat('th-TH', options);

        // Format the date and return it as a string
        return formatter.format(date);
    }

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
                        <li aria-current="page">
                            <div className="flex items-center">
                                <svg className="w-3 h-3 mx-1 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span className="ml-1 text-sm font-medium text-gray-700 md:ml-2 dark:text-gray-400">
                                    ประวัติการจอง
                                </span>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
            <div className="mx-auto flex flex-col max-w-7xl items-center justify-center p-6 lg:px-8 pb-16">
                <div className="flex flex-col sm:flex-row justify-between items-center w-full max-w-4xl my-4">
                    <h1 className="text-2xl font-semibold">ประวัติการจอง</h1>
                    <div className="flex flex- justify-center items-center">
                        <h1 className="text-md">จองแล้วทั้งหมด {history.length} รายการ</h1>
                        <div className="ml-4">
                            <label className="text-sm font-medium">แสดง:</label>
                            <select
                                className="px-2 py-1 border border-gray-300 rounded-md ml-2"
                                onChange={handlePageSizeChange}
                                value={itemsPerPage}
                            >
                                <option value="5">5 รายการ</option>
                                <option value="10">10 รายการ</option>
                                <option value="20">20 รายการ</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="relative w-full max-w-4xl overflow-x-auto shadow-md rounded-xl">
                    <table className="w-full text-sm text-left text-gray-700">
                        <thead className="text-md text-white uppercase bg-[#3E99EC]">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    วันที่
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ช่วงเวลา
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    รายชื่อห้องประชุม
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    เวลาทำรายการ
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    ยกเลิก
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedList.length >= 1 ? (
                                <>
                                    {
                                        displayedList.map((booking) => (
                                            <tr className="bg-white border-b" key={booking._id}>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    {formatDateToThaiLocale(booking.BookingDate)}
                                                </th>
                                                <td className="px-6 py-4 font-medium">
                                                    {booking.TimeslotID.StartTime} - {booking.TimeslotID.EndTime} น.
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    {booking.RoomID.RoomName}
                                                    <MapPinIcon class='h-4 w-4 ml-4 mx-1 text-gray-500 inline' />{booking.RoomID.Location}
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    {formatTimestamp(booking.createdAt)}
                                                </td>
                                                <td className="px-6 py-4 font-medium">
                                                    <CancelModal handleCancel={handleCancel} booking={booking} />
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </>
                            ) : (
                                <>
                                    <tr>
                                        <th scope="row" rowSpan='5' className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            ไม่พบรายการจองห้องประชุม
                                        </th>
                                    </tr>
                                </>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-4 flex justify-center">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 mx-2 rounded-md ` + (currentPage != 1 ? `bg-[#3E99EC] text-white` : `bg-gray-200 text-gray-900`)}
                    >
                        ย้อนกลับ
                    </button>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={endIndex >= history.length}
                        className={`px-4 py-2 mx-2 rounded-md ` + (endIndex <= history.length ? `bg-[#3E99EC] text-white` : `bg-gray-200 text-gray-900`)}
                    >
                        ต่อไป
                    </button>
                </div>
            </div>
        </div>
    );
}