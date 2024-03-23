import React from 'react'
import "./sidebar.css"
import homestayIcon from '../../assets/icons/homestayicon.png';
import homeicon from "../../assets/icons/homeicon.png"
import calendaricon from "../../assets/icons/calendaricon.png"
import analyticicon from "../../assets/icons/analyticicon.png"
import lighticon from "../../assets/icons/lighticon.png"
import temperatureicon from "../../assets/icons/temperatureicon.png"
import detectionicon from "../../assets/icons/detectionicon.png"
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const Sidebar = () => {
  const location = useLocation();
  return (
    <div className='sidebar'>
    
      <div className='sidebar-title '>
        <img src={homestayIcon} alt='logo' className='sidebar-title-logo'/>
        <h1 className='text-3xl font-medium sidebar-hug'>Smart HomeStay</h1>
      </div>

      <div className='sidebar-item sidebar-hug flex-col'>
        <p>Administrator</p>
        <p className="text-xl font-medium">Name - ID</p>
      </div>

      <Link to="/" className={`${
          location.pathname === "/" && "currentSidebar"
        }`}>
        <div className='sidebar-item'>
          <img src={homeicon} alt="home" className='sidebar-logo'/>
          <h1 className='sidebar-hug'>Homepage</h1>
        </div>
      </Link>

      <div className='sidebar-hidden py-4 items-center'>
          <div className='w-full bg-black' style={{height: "1px"}}></div>
      </div>
      <div className='sidebar-item sidebar-hug'>
        <h1>SmartHome Management</h1>
      </div>
      <Link to="/Calendar" className={`${
          location.pathname === "/Calendar" && "currentSidebar"
        }`}>
        <div className='sidebar-item'>
          <img src={calendaricon} alt="calendar" className='sidebar-logo'/>
          <h1 className='sidebar-hug'>Calendar</h1>
        </div>
      </Link>
      
      <Link to="/Analytics" className={`${
          location.pathname === "/Analytics" && "currentSidebar"
        }`}>
        <div className='sidebar-item'>
          <img src={analyticicon} alt="analyz" className='sidebar-logo'/>
          <h1 className='sidebar-hug'>Analytics</h1>
        </div>
      </Link>

      <div className='sidebar-hidden py-4 items-center'>
          <div className='w-full bg-black' style={{height: "1px"}}></div>
      </div>
      
      <div className='sidebar-item sidebar-hug'>
        <h1>Device Management</h1>
      </div>

      <Link to="/LightLevel" className={`${
          location.pathname === "/LightLevel" && "currentSidebar"
        }`}>
          <div className='sidebar-item'>
            <img src={lighticon} alt="light" className='sidebar-logo'/>
            <h1 className='sidebar-hug'>LightLevel</h1>
          </div>
      </Link>

      <Link to="/Temperature" className={`${
          location.pathname === "/Temperature" && "currentSidebar"
        }`}>
          <div className='sidebar-item'>
            <img src={temperatureicon} alt="temp" className='sidebar-logo'/>
            <h1 className='sidebar-hug'>Temperature</h1>
          </div>
      </Link>
      
      <Link to="/HumanDetection" className={`${
          location.pathname === "/HumanDetection" && "currentSidebar"
        }`}>
          <div className='sidebar-item'>
            <img src={detectionicon} alt="detect" className='sidebar-logo'/>
            <h1 className='sidebar-hug'>Human Detection</h1>
          </div>
      </Link>
    </div>
  )
}

export default Sidebar