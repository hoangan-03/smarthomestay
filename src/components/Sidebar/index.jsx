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

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};


const Sidebar = () => {
  const location = useLocation();
  return (
    <div className='sidebar'>
    
      <div className='flex items-center gap-1 py-2 pr-2 -mr-5'>
        <img src={homestayIcon} alt='logo' className='max-w-16 max-h-16'/>
        <h1 className='text-xl font-medium sidebar-hug'>Smart HomeStay</h1>
      </div>

      <div className='sidebar-item sidebar-hug flex-col'>
        <p>Administrator</p>
        <p className="text-xl font-medium">Name - ID</p>
      </div>

      <Link to="/" onClick={scrollToTop} className={`${
          location.pathname === "/" && "currentSidebar"
        }`}>
        <div className='sidebar-item'>
          <img src={homeicon} alt="home" className='sidebar-logo'/>
          <h1 className='sidebar-hug-item'>Homepage</h1>
        </div>
      </Link>

      <div className='sidebar-item'>
        <div className='sidebar-hidden py-3 items-center w-full'>
          <div className='bg-black' style={{height: "1px"}}></div>
        </div>
        
        <h1 className='sidebar-hug-item'>SmartHome Management</h1>
      </div>

      <Link to="/Calendar" onClick={scrollToTop} className={`${
          location.pathname === "/Calendar" && "currentSidebar"
        }`}>
        <div className='sidebar-item'>
          <img src={calendaricon} alt="calendar" className='sidebar-logo'/>
          <h1 className='sidebar-hug-item'>Calendar</h1>
        </div>
      </Link>
      
      <Link to="/Analytics" onClick={scrollToTop} className={`${
          location.pathname === "/Analytics" && "currentSidebar"
        }`}>
        <div className='sidebar-item'>
          <img src={analyticicon} alt="analyz" className='sidebar-logo'/>
          <h1 className='sidebar-hug-item'>Analytics</h1>
        </div>
      </Link>
      
      <div className='sidebar-item'>
        <div className='sidebar-hidden py-3 items-center w-full'>
          <div className='bg-black' style={{height: "1px"}}></div>
        </div>
        
        <h1 className='sidebar-hug-item'>Device Management</h1>
      </div>

      <Link to="/LightLevel" onClick={scrollToTop} className={`${
          location.pathname === "/LightLevel" && "currentSidebar"
        }`}>
          <div className='sidebar-item'>
            <img src={lighticon} alt="light" className='sidebar-logo'/>
            <h1 className='sidebar-hug-item'>LightLevel</h1>
          </div>
      </Link>

      <Link to="/Temperature" onClick={scrollToTop} className={`${
          location.pathname === "/Temperature" && "currentSidebar"
        }`}>
          <div className='sidebar-item'>
            <img src={temperatureicon} alt="temp" className='sidebar-logo'/>
            <h1 className='sidebar-hug-item'>Temperature</h1>
          </div>
      </Link>
      
      <Link to="/HumanDetection" onClick={scrollToTop} className={`${
          location.pathname === "/HumanDetection" && "currentSidebar"
        }`}>
          <div className='sidebar-item'>
            <img src={detectionicon} alt="detect" className='sidebar-logo'/>
            <h1 className='sidebar-hug-item'>Human Detection</h1>
          </div>
      </Link>
    </div>
  )
}

export default Sidebar