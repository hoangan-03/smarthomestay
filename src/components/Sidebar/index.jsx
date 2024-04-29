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
import homeicon_white from "../../assets/icons/homeicon_white.png"
import calendar_white from "../../assets/icons/calendar_white.png"
import analyticiconlight from "../../assets/icons/analyticiconlight.png"
import light_bulb_white from "../../assets/icons/light_bulb_white.png"
import temperatureicon_white from "../../assets/icons/temperatureicon_white.png"
import detectionicon_white from "../../assets/icons/detectionicon_white.png"
import logout from "../../assets/icons/logout.png"
import logoutwhite from "../../assets/icons/logoutwhite.png"
import { useNavigate } from 'react-router-dom';
import { useData } from '../DataProvider';
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};


const Sidebar = ({toggleDarkMode}) => {
  const {deleteCookie, getCookie, setUser} = useData();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/auth');
    sessionStorage.removeItem('user');
    deleteCookie('cookieUser');
    setUser(null)
  };
  const user = getCookie('cookieUser');
  return (
    <div className='sidebar'>
    
      <div className='flex items-center gap-2 py-2 pr-2 -mr-5'>
        <img src={homestayIcon} alt='logo' className='max-w-16 max-h-16'/>
        <h1 className='text-3xl font-medium sidebar-hug'>Smart HomeStay</h1>
      </div>

      <div className='sidebar-item sidebar-hug flex-col'>
        <p>Administrator</p>
      <p className="text-xl font-bold"> {user ? `Hello ${user.username}` : "Haven't logged in"}</p>
      </div>

      <Link to="/" onClick={scrollToTop} className={`${
          location.pathname === "/" && "currentSidebar"
        }`}>
        <div className='sidebar-item items-center'>
          {toggleDarkMode && location.pathname !== "/" ? <img src={homeicon_white} alt="home" className='sidebar-logo'/> : <img src={homeicon} alt="home" className='sidebar-logo'/>}
          <h1 className='sidebar-hug-item' style={{ color: location.pathname === "/" ? "#43474E" : "" }}>Homepage</h1>
        </div>
      </Link>

      <div className='sidebar-item '>
        <div className='sidebar-hidden py-3 items-center w-full'>
          <div className='bg-black' style={{height: "1px"}}></div>
        </div>
        
        <h1 className='sidebar-hug-item'>SmartHome Management</h1>
      </div>

      <Link to="/Calendar" onClick={scrollToTop} className={`${
          location.pathname === "/Calendar" && "currentSidebar"
        }`}>
        <div className='sidebar-item items-center'>
          {/* <img src={calendaricon} alt="calendar" className='sidebar-logo'/> */}
          {toggleDarkMode && location.pathname !== "/Calendar" ? <img src={calendar_white} alt="calendar" className='sidebar-logo'/> : <img src={calendaricon}
          alt="calendar" className='sidebar-logo'/>}
          <h1 className='sidebar-hug-item' style={{ color: location.pathname === "/Calendar" ? "#43474E" : "" }}>Calendar</h1>
        </div>
      </Link>
      
      <Link to="/Analytics" onClick={scrollToTop} className={`${
          location.pathname === "/Analytics" && "currentSidebar"
        }`}>
        <div className='sidebar-item items-center'>
          {toggleDarkMode && location.pathname !== "/Analytics" ? <img src={analyticiconlight} alt="analyz" className='sidebar-logo'/> : <img src={analyticicon} alt="analyz" className='sidebar-logo'/>}
          <h1 className='sidebar-hug-item' style={{ color: location.pathname === "/Analytics" ? "#43474E" : "" }}>Analytics</h1>
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
            {(toggleDarkMode && location.pathname !== "/LightLevel") ? <img src={light_bulb_white} alt="light" className='sidebar-logo'/> : <img src={lighticon} alt="light" className='sidebar-logo'/>}
            <h1 className='sidebar-hug-item' style={{ color: location.pathname === "/LightLevel" ? "#43474E" : "" }}>Light Level</h1>
          </div>
      </Link>

      <Link to="/Temperature" onClick={scrollToTop} className={`${
          location.pathname === "/Temperature" && "currentSidebar"
        }`}>
          <div className='sidebar-item'>
            {toggleDarkMode && location.pathname !== "/Temperature" ? <img src={temperatureicon_white} alt="temp" className='sidebar-logo'/> : <img src={temperatureicon} alt="temp" className='sidebar-logo'/>}
            <h1 className='sidebar-hug-item' style={{ color: location.pathname === "/Temperature" ? "#43474E" : "" }}>Temperature</h1>
          </div>
      </Link>
      
      <Link to="/HumanDetection" onClick={scrollToTop} className={`${
          location.pathname === "/HumanDetection" && "currentSidebar"
        }`}>
          <div className='sidebar-item'>
            {toggleDarkMode && location.pathname !== "/HumanDetection" ? <img src={detectionicon_white} alt="detect" className='sidebar-logo'/> : <img src={detectionicon} alt="detect" className='sidebar-logo'/>}
            <h1 className='sidebar-hug-item' style={{ color: location.pathname === "/HumanDetection" ? "#43474E" : "" }}>Human Detection</h1>
          </div>
      </Link>
      <button onClick={handleLogout} className={`${user ? "block" : "hidden"}`}>
          <div className='sidebar-item hover:bg-lightblue rounded-[10px] '>
          {toggleDarkMode && location.pathname !== "/HumanDetection" ? <img src={logoutwhite} alt="detect" className='sidebar-logo'/> : <img src={logout} alt="detect" className='sidebar-logo'/>}
            <h1 className='sidebar-hug-item'>Log out</h1>
          </div>
      </button>
    </div>
  )
}

export default Sidebar