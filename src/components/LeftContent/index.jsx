import React from 'react'
import room from  '../../assets/icons/room.png';
const LeftContent = () => {
  return (
    <div className='bg-white px-[15px] py-[15px] rounded-2xl shadow-custom-shadow border-5 border-lightgray'>
      <img className='min-w-[320px] h-[740px]' src={room} alt="room" />
    </div>

  )     
}

export default LeftContent