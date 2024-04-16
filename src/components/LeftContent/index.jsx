import React, { useEffect } from 'react'
import { useState } from 'react';
import room from  '../../assets/icons/room.png';
import { useLocation } from 'react-router-dom';
import "./LeftContent.css";
const LeftContent = () => {
  const [isHomePage, setIsHomePage] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === '/') {
      setIsHomePage(true);
    }
    else {
      setIsHomePage(false);
    }
  }, [location.pathname])

  if (!isHomePage) {
    return (
      <div className='lc-left-content bg-white px-[15px] py-[15px] rounded-2xl shadow-custom-shadow border-5 border-lightgray'>
          <img className='min-w-[320px] h-[740px]' src={room} alt="room" />
      </div>
    )
  }
  return (
    <></>

  )     
}

export default LeftContent