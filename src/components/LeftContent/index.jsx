import React from 'react'
import "./leftcontent.css"
import room from  '../../assets/icons/room.png';
const LeftContent = () => {
  return (
    <div className='bordered-content'>
      <img src={room} alt="room" className='room-img'/>
    </div>

  )     
}

export default LeftContent