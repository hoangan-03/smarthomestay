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
      <div className='bg-white p-5 rounded-2xl shadow-custom-shadow h-full border-5 border-lightgray home-upper-content'>
        <h1 className="home-title" >We are Smart Homestay!</h1>
        <div className='home-inner'>
          <img src={homestayphoto} alt="homestay"/>
          <p className='home-desc'>Welcome to Smart Homestay, where cutting-edge technology meets unparalleled comfort in the heart of modern living.<br/>Our website is dedicated to providing you with the latest advancements and insights to transform your living space into a haven of comfort and convenience.</p>
        </div>
        
      </div>
      <Images />
      <LargeImages/>
      
      
    </div>
  )
}

export default Homepage