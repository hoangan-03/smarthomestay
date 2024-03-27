import React from 'react'
import room from  '../../assets/icons/room.png';
const LeftContent = () => {
  return (
    <div className='bg-white p-5 rounded-2xl shadow-custom-shadow h-full border-5 border-lightgray'>
      <img style={{minWidth: "364px", minHeight: "834px"}} src={room} alt="room" />
    </div>

  )     
}

export default LeftContent