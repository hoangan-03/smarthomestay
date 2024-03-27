import React, {useState} from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Button } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';
const MyCalendar = () => {
  const [date, setDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    console.log(newDate);
    setDate(newDate);
  };

  // const tileContent = ({ date, view }) => {
  //   if (view === 'month' && date.getDate() === 21 && date.getMonth() === 2 && date.getFullYear() === 2024) {
  //     return <span>Event hold</span>;
  //   }
  //   return null;
  // };

  return (
    <Calendar
      onChange={handleDateChange}
      value={date}
      locale="en-US" // Set the locale of the calendar
      calendarType="gregory" // Set the calendar type
      // tileContent={tileContent}
    />
  );
};


const CalendarPage = () => {

  

  const handleAddEvent = () => {

  }

  return (
    <div className='h-full w-full relative p-10 rounded-2xl shadow-custom-shadow bg-white border-5 border-lightgray'>
      <div className='border-b-4 border-lightgray pb-3 flex justify-between'>
        {/* <div className='flex gap-10'>
          <h1 className='font-bold text-2xl'>January 2024</h1>
          <div className='flex gap-2 items-center'>
            <ArrowBackIosNewIcon fontSize='small'/>
            <p className='text-xl'>Current month</p>
            <ArrowForwardIosIcon fontSize='small'/>
          </div>
        </div> */}
        <div className='add-event'>
          <Button onClick={handleAddEvent} sx={{backgroundColor: "#4A00FF", color: "white", fontSize: "0.8em", padding: "10px" , "&:hover" : {backgroundColor: "#6e32ff"}}}>Add new event</Button>
        </div>
        
        
      </div>
      <MyCalendar/>
      
      
    </div>
  )
}

export default CalendarPage