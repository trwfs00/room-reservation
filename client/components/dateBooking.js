import Image from "next/image";
import bg from "@images/background.png"
import Datepicker from "react-tailwindcss-datepicker";
import { useState } from "react";
import RadioBox from '@components/radiobox'
import SelectBox from '@components/selectbox'
import { useEffect } from "react";

export default function DateBooking() {
    const [notify, setNotify] = useState();
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate()+1);

    function convertDateFormat(originalDateString) {
        // Split the original date string using '-'
        const parts = originalDateString.split('-');
      
        // Rearrange the parts into 'YYYY-MM-DD' format
        const reformattedDateString = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
      
        return reformattedDateString;
      }

    const [value, setValue] = useState({
        startDate: convertDateFormat(tomorrow.toLocaleDateString().replaceAll('/','-')),
        endDate: convertDateFormat(tomorrow.toLocaleDateString().replaceAll('/','-'))
    });

    const [search, setSearch] = useState(false);

    const [dataSelect, setDataSelect] = useState(null);
    const receiveDataSelected = (data) => {
        setDataSelect(data);
    };

    const handleValueChange = (newValue) => {
        console.log("newValue:", newValue);
        setValue(newValue);
        setSelectedData({
            date: newValue,
            time: selectedTimeslot
        });
    }

    const [timeslots, setTimeslots] = useState([]);
    
    useEffect(() => {
        fetchData();
    }, []);
    
    const fetchData = async () => {
        try {
            const requestOptions = {
                method: 'GET', // Specify the HTTP method here
                // Additional options can be set here, like headers and body for POST requests
            };
            
            // Send a GET request to the API endpoint with the specified options
            const response = await fetch('http://localhost:8080/api/timeslots', requestOptions); // Replace with your API endpoint
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            // Parse the response JSON data
            const result = await response.json();
            setTimeslots(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    
    const [selectedData, setSelectedData] = useState();
    const [selectedTimeslot, setSelectedTimeslot] = useState();
    const handleSelectedValue = (timeslot) => {
        setSelectedTimeslot(timeslot);
        console.log(timeslot)
        setSelectedData({
            time: timeslot
        });
    };
    
    const handleSearch = () => {
        if(!value || !selectedTimeslot) {
            return null
        } else {
            setSearch(true)
        }
    }
    useEffect(() => {
        const newTimeslot = {date: value, time: selectedTimeslot}
        setSelectedData(newTimeslot);
        console.log(newTimeslot)
        console.log(selectedTimeslot)
        console.log(selectedData)
    },[selectedTimeslot])
    useEffect(() => {
        const newValue = {...selectedData, date: value}
        setSelectedData(newValue);
        console.log(newValue)
        console.log(value)
        console.log(selectedData)
        console.log(convertDateFormat(tomorrow.toLocaleDateString().replaceAll('/','-')))
    },[value])

    useEffect(()=>{
        if(value.startDate === null) setSearch(false);
        if(!setSelectedData.date?.startDate) setSearch(false);
    },[value])
    return (
        <section className="bg-white font-ibm">
            <div className="mx-auto flex max-w-7xl items-center justify-between p-6 py-10 md:py-0 lg:px-8">
                <div className="flex flex-col sm:flex-row flex-wrap justify-between w-full pb-8 py-2">
                    <div className="flex-1 flex items-center justify-center sm:w-3/4">
                        <div className="flex flex-col gap-2 justify-center items-center lg:items-start -translate-y-6">
                            <h1 className="font-bold text-4xl md:text-5xl text-[#3E99EC] text-center lg:text-left">ค้นหาจากวันที่<br />เพื่อจองห้องประชุม</h1>
                            <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
                                เลือกวันที่และช่วงเวลาที่คุณต้องการจองห้องประชุม<br />เพื่อค้นหาห้องประชุมที่ว่างได้ทันที
                            </p>
                            <form className="flex flex-row flex-wrap justify-between w-full mt-6 gap-6">
                                <div className="flex-1">
                                    <Datepicker
                                        placeholder={"เลือกวันที่ต้องการจอง"}
                                        popoverDirection="up"
                                        minDate={convertDateFormat(today.toLocaleDateString().replaceAll('/','-'))}
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
                                    <SelectBox onSelectedValue={handleSelectedValue} timeslots={timeslots} />
                                </div>
                            </form>
                            {value.startDate === null && <p className="text-gray-500 mt-4">กรุณาเลือกจากวันและเวลา</p>}
                            {notify && <p className="text-red-500 mt-4">{notify}</p>}
                            <button
                                onClick={handleSearch}
                                className="text-lg md:text-xl lg:text-2xl text-white font-semibold bg-[#3E99EC] border-4 border-gray-100 p-2 px-6 mt-12 rounded-full hover:scale-105 transition-all duration-200">
                                ค้นหา
                            </button>
                        </div>
                    </div>
                    {search && value.startDate != null ? (
                        <div className="bg-gray-50 rounded-3xl flex flex-col flex-1 -translate-y-10 my-14 pt-8 pb-8">
                            <h1 className="ml-4 md:ml-11 text-xl font-semibold translate-y-2">รายการห้องว่าง</h1>
                            <div className="mt-10 h-[20em] overflow-y-auto overflow-hidden">
                                <RadioBox sendDataToParent={receiveDataSelected} selectedData={selectedData} />
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