import React from 'react'
import { useState, useRef } from 'react'
import './homepage.css'
import homestayphoto from '../../assets/icons/homestayphoto.png'
import lightphoto from '../../assets/icons/lightphoto.png'
import tempphoto from '../../assets/icons/tempphoto.png'
import detectionphoto from '../../assets/icons/detectionphoto.png'
import setting from '../../assets/icons/setting.png'
import leftarrow from '../../assets/icons/leftarrow.png'
import rightarrow from '../../assets/icons/rightarrow.png'
import { Link } from 'react-router-dom'

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};


const Images = () => {
  const elementRef = useRef(null);
  const [arrowDisable, setArrowDisable] = useState(true);

  const handleHorizantalScroll = (element, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      element.scrollLeft += step;
      scrollAmount += Math.abs(step);
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
      }
      if (element.scrollLeft === 0) {
        setArrowDisable(true);
      } else {
        setArrowDisable(false);
      }
    }, speed);
  };

  return (
    <div className='images-small-screen'>
      <div className='items-carousel'>
        <button
          onClick={() => {
            handleHorizantalScroll(elementRef.current, 8, 460, -10);
          }}
          disabled={arrowDisable}
          className={"absolute top-1/2 -left-9 cursor-pointer"}
        >
          <img src={leftarrow} alt="leftarrow" width={40} height={40}/>
        </button>
        <div className='home-lower-wrapper' ref={elementRef}>
      
        <div className="home-lower-content" >
          <div className='bg-white p-5 rounded-2xl shadow-custom-shadow h-full border-5 border-lightgray relative' >
              <img src={tempphoto} alt="temp" className="setting-image"/>
              <div className='home-config'>
                <div className='flex flex-col gap-2'>
                  <p className='text-2xl font-bold'>Temperature</p>
                  <p className='text-lg font-medium'>Write something here</p>
                </div>
                
                <Link to="/Temperature">
                  <img src={setting} alt="setting" className='home-setting-icon'/>
                </Link>
                
              </div>
            </div>

            <div className='bg-whitep-5 rounded-2xl shadow-custom-shadow h-full relative'>
              <img src={lightphoto} alt="light" className="setting-image"/>
              <div className='home-config'>
                <div className='flex flex-col gap-2'>
                  <p className='text-2xl font-bold'>Light Level</p>
                  <p className='text-lg font-medium'>Write something here</p>
                </div>
                <Link to="/LightLevel">
                  <img src={setting} alt="setting" className='home-setting-icon'/>
                </Link>
                
              </div>
            </div>

            <div className='bg-white p-5 rounded-2xl shadow-custom-shadow h-full border-5 border-lightgray relative'>
              <img src={detectionphoto} alt="detect" className="setting-image"/>
              <div className='home-config'>
                <div className='flex flex-col gap-2'>
                  <p className='text-2xl font-bold'>Human Detection</p>
                  <p className='text-lg font-medium'>Write something here</p>
                </div>
                <Link to="/HumanDetection">
                  <img src={setting} alt="setting" className='home-setting-icon'/>
                </Link>
                
              </div>
            </div>
        </div>
      </div>
        <button
          onClick={() => {
            handleHorizantalScroll(elementRef.current, 8, 460, 10);
          }}
          className={"absolute top-1/2 -right-9 cursor-pointer"}
        >
          <img src={rightarrow} alt="rightarr" width={40} height={40}/>
        </button>
      </div>
      
      
    </div>
  );
};

const LargeImages = () => {

  return (
    <div className="home-lower-content images-large-screen" >
      <div className='bg-white p-5 rounded-2xl shadow-custom-shadow h-full border-5 border-lightgray relative' >
        <img src={tempphoto} alt="temp" className="setting-image"/>
        <div className='home-config'>
          <div className='flex flex-col gap-2'>
            <p className='image-title font-bold'>Temperature</p>
            <p className='image-desc font-medium'>Write something here</p>
          </div>
          
          <Link to="/Temperature"  onClick={scrollToTop}>
            <img src={setting} alt="setting" className='home-setting-icon'/>
          </Link>
          
        </div>
      </div>

        <div className='bg-white p-5 rounded-2xl shadow-custom-shadow h-full border-5 border-lightgray relative'>
          <img src={lightphoto} alt="light" className="setting-image"/>
          <div className='home-config'>
            <div className='flex flex-col gap-2'>
              <p className='image-title font-bold'>Light Level</p>
              <p className='image-desc font-medium'>Write something here</p>
            </div>
            <Link to="/LightLevel" onClick={scrollToTop}>
              <img src={setting} alt="setting" className='home-setting-icon'/>
            </Link>
            
          </div>
        </div>

        <div className='bg-white p-5 rounded-2xl shadow-custom-shadow h-full border-5 border-lightgray relative'>
          <img src={detectionphoto} alt="detect" className="setting-image"/>
          <div className='home-config'>
            <div className='flex flex-col gap-2'>
              <p className='image-title font-bold'>Human Detection</p>
              <p className='image-desc font-medium'>Write something here</p>
            </div>
            <Link to="/HumanDetection" onClick={scrollToTop}>
              <img src={setting} alt="setting" className='home-setting-icon'/>
            </Link>
            
          </div>
        </div>
    </div>
  )
}

const Homepage = () => {
  

  return (
    <div className='home'> 
      <div className='flex gap-10'>
        <div className='w-[400px] h-[445px] bg-white rounded-2xl shadow-custom-shadow border-5 border-lightgray flex flex-col'>
          <h1 className="text-[22px] font-bold px-8 pt-12">Welcome to Smart Homestay!</h1>
          <p className="text-[16px] font-semibold px-8 pb-12">Write something here</p>
          <img className="flex-grow" src={homestayphoto} alt="homestay"/>
        </div>

        <div className='w-[400px] h-[445px] bg-white rounded-2xl shadow-custom-shadow border-5 border-lightgray flex flex-col'>
          <h1 className="text-[22px] font-bold px-8 pt-12">Welcome to Smart Homestay!</h1>
          <p className="text-[16px] font-semibold px-8 pb-12">Write something here</p>
          <img className="flex-grow" src={homestayphoto} alt="homestay"/>
        </div>

        <div className="w-full h-[160px] flex flex-row gap-6">
        <div className="w-[400px] h-full rounded-xl border-4 border-lightgray bg-white py-[30px] px-[25px] flex flex-row  justify-between items-center">
          <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
            <h1 className="text-black text-4xl">{temporlightvar.value.text}</h1>
            <h2 className="text-blue-700 text-5xl font-bold">
              {variables === "temperature"
                ? sensorData.temperature
                : sensorData.light}{" "}
              {(sensorData.temperature === "OFF" || sensorData.temperature === "NaN") ? "" : (variables === "temperature" ? "oC" : "%")}
            </h2>
          </div>
          <img
            className="w-auto h-[100px] object-cover"
            src={temporlightvar.value.iconUrl}
            alt=""
          ></img>
        </div>
        <div
          className={`w-[400px] h-full rounded-xl border-4 border-lightgray bg-white py-[30px] px-[25px] flex flex-row  justify-between items-center ${variables === "temperature" ? "block" : "hidden"
            }`}
        >
          <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
            <h1 className="text-black text-4xl">{humidityvar.value.text}</h1>
            <h2 className="text-blue-700 text-5xl font-bold">
              {sensorData.humidity}
              {sensorData.temperature === "OFF" || sensorData.temperature === "NaN" ? "" : "%"}
            </h2>
          </div>
          <img
            className="w-auto h-[100px] object-cover"
            src={humidityvar.value.iconUrl}
            alt=""
          ></img>
        </div>
      </div>

        {/* <div className='home-inner'>
          
        </div> */}
        
      </div>
      {/* <Images />
      <LargeImages/> */}
      
      
    </div>
  )
}

export default Homepage