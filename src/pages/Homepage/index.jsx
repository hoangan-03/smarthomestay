import React, {useState, useRef, useEffect} from 'react'
import './homepage.css'
import homestayphoto from '../../assets/icons/homestayphoto.png'
import lightphoto from '../../assets/icons/lightphoto.png'
import tempphoto from '../../assets/icons/tempphoto.png'
import detectionphoto from '../../assets/icons/detectionphoto.png'
import setting from '../../assets/icons/setting.png'
import leftarrow from '../../assets/icons/leftarrow.png'
import rightarrow from '../../assets/icons/rightarrow.png'
import { Link } from 'react-router-dom'
import data from "../../components/Constant";
import client from "../../mqtt/mqttclient";
import { Button , ButtonGroup} from '@mui/material'
import { useData } from '../../components/DataProvider'
import tempicon from "../../assets/icons/Temperature icon.png";
import lightbulp from "../../assets/icons/lightbulp.png";
import humidityicon from "../../assets/icons/humidityicon.png";
import lightbulb_dark from "../../assets/icons/lightbulb_dark.png";
import humid_dark from "../../assets/icons/humid_dark.png";
import temperature_dark from "../../assets/icons/temperature_dark.png";
const AIO_USERNAME = "quoc_huy";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
  });
};


// const Images = () => {
//   const elementRef = useRef(null);
//   const [arrowDisable, setArrowDisable] = useState(true);

//   const handleHorizantalScroll = (element, speed, distance, step) => {
//     let scrollAmount = 0;
//     const slideTimer = setInterval(() => {
//       element.scrollLeft += step;
//       scrollAmount += Math.abs(step);
//       if (scrollAmount >= distance) {
//         clearInterval(slideTimer);
//       }
//       if (element.scrollLeft === 0) {
//         setArrowDisable(true);
//       } else {
//         setArrowDisable(false);
//       }
//     }, speed);
//   };

//   return (
//     <div className='images-small-screen'>
//       <div className='items-carousel'>
//         <button
//           onClick={() => {
//             handleHorizantalScroll(elementRef.current, 8, 440, -10);
//           }}
//           disabled={arrowDisable}
//           className={"absolute top-1/2 -left-9 cursor-pointer"}
//         >
//           <img src={leftarrow} alt="leftarrow" width={40} height={40}/>
//         </button>

//         <div className='home-lower-wrapper' ref={elementRef}>
//           <div className="flex items-center w-full gap-10" >
//             <div className='home-large-image' >
//                 <img src={tempphoto} alt="temp" className="setting-image"/>
//                 <div className='home-config'>
//                   <div className='flex flex-col gap-2'>
//                   <p style={{ color: 'red' }} className="text-2xl font-bold">Temperature</p>

//                     <p className='text-lg font-medium'>Write something here</p>
//                   </div>
                  
//                   <Link to="/Temperature">
//                     <img src={setting} alt="setting" className='home-setting-icon'/>
//                   </Link>
                  
//                 </div>
//               </div>

//               <div className='home-large-image'>
//                 <img src={lightphoto} alt="light" className="setting-image"/>
//                 <div className='home-config'>
//                   <div className='flex flex-col gap-2'>
//                     <p className='text-2xl font-bold'>Light Level</p>
//                     <p className='text-lg font-medium'>Write something here</p>
//                   </div>
//                   <Link to="/LightLevel">
//                     <img src={setting} alt="setting" className='home-setting-icon'/>
//                   </Link>
                  
//                 </div>
//               </div>

//               <div className='home-large-image'>
//                 <img src={detectionphoto} alt="detect" className="setting-image"/>
//                 <div className='home-config'>
//                   <div className='flex flex-col gap-2'>
//                     <p className='text-2xl font-bold'>Human Detection</p>
//                     <p className='text-lg font-medium'>Write something here</p>
//                   </div>
//                   <Link to="/HumanDetection">
//                     <img src={setting} alt="setting" className='home-setting-icon'/>
//                   </Link>
                  
//                 </div>
//               </div>
//           </div>
//         </div>
//         <button
//           onClick={() => {
//             handleHorizantalScroll(elementRef.current, 8, 440, 10);
//           }}
//           className={"absolute top-1/2 -right-9 cursor-pointer"}
//         >
//           <img src={rightarrow} alt="rightarr" width={40} height={40}/>
//         </button>
//       </div>
      
      
//     </div>
//   );
// };

// const LargeImages = () => {

//   return (
//     <div className="flex items-center justify-center w-full gap-10 images-large-screen flex-wrap " >
//       <div className='home-large-image' >
//         <img src={tempphoto} alt="temp" className='max-w-[380px] max-h-[276px]'/>
//         <div className='home-config'>
//           <div className='flex flex-col gap-2'>
//             <p className='text-xl font-bold'>Temperature</p>
//             <p className='text-md font-medium'>Write something here</p>
//           </div>
          
//           <Link to="/Temperature"  onClick={scrollToTop}>
//             <img src={setting} alt="setting" width={60} height={60}/>
//           </Link>
          
//         </div>
//       </div>

//         <div className='home-large-image'>
//           <img src={lightphoto} alt="light" className='max-w-[380px] max-h-[276px]'/>
//           <div className='home-config'>
//             <div className='flex flex-col gap-2'>
//               <p className='text-xl font-bold'>Light Level</p>
//               <p className='text-md font-medium'>Write something here</p>
//             </div>
//             <Link to="/LightLevel" onClick={scrollToTop}>
//               <img src={setting} alt="setting" width={60} height={60}/>
//             </Link>
            
//           </div>
//         </div>

//         <div className='home-large-image'>
//           <img src={detectionphoto} alt="detect" className='max-w-[380px] max-h-[276px] rounded-xl'/>
//           <div className='home-config'>
//             <div className='flex flex-col gap-2'>
//               <p className='text-xl font-bold'>Human Detection</p>
//               <p className='text-md font-medium'>Write something here</p>
//             </div>
//             <Link to="/HumanDetection" onClick={scrollToTop}>
//               <img src={setting} alt="setting" width={60} height={60}/>
//             </Link>
            
//           </div>
//         </div>
//     </div>
//   )
// }

const Homepage = () => {
  const {hex, fan, autoMode, setAutoMode, handleClick, toggleDarkMode } = useData();
  console.log("FAN", fan)
  const [sensorData, setSensorData] = useState({
    temperature: "OFF",
    humidity: "OFF",
    light: "OFF",
  });

  useEffect(() => {
    client.on("connect", () => {
      console.log("Connected to Adafruit MQTT");
      client.subscribe(`${AIO_USERNAME}/feeds/temperature_sensor`);
      client.subscribe(`${AIO_USERNAME}/feeds/humility_sensor`);
      client.subscribe(`${AIO_USERNAME}/feeds/light_sensor`);
    });

    client.on("message", (topic, message) => {
      if (topic === `${AIO_USERNAME}/feeds/temperature_sensor`) {
        setSensorData((prevState) => ({
          ...prevState,
          temperature: parseFloat(message.toString()),
        }));
      } else if (topic === `${AIO_USERNAME}/feeds/humility_sensor`) {
        setSensorData((prevState) => ({
          ...prevState,
          humidity: parseFloat(message.toString()),
        }));
      } else if (topic === `${AIO_USERNAME}/feeds/light_sensor`) {
        setSensorData((prevState) => ({
          ...prevState,
          light: parseFloat(message.toString()),
        }));
      }
    });
  }, []);
  const tempervar = {
    value: data.temperature
  };

  const lightvar = {
    value: data.lightlevel
  }

  const humidityvar = {
    value: data.humidity
  };

  const handleTurnOn = () => {
    if (autoMode)
      return
    setAutoMode(true)
    handleClick("Auto mode is turned on successfully", "success")()
  }

  const handleTurnOff = () => {
    if (!autoMode) return
    setAutoMode(false)
    handleClick("Auto mode is turned off successfully", "success")()
  }

  return (
    <div className='flex flex-col gap-10 w-full relative items-center '> 
      <div className='container flex gap-10 flex-wrap justify-center items-center'>
        <div className='w-[400px] h-[445px] itemContainer flex flex-col'>
          <h1 className="text-[22px] font-bold px-8 pt-12">Welcome to Smart Homestay!</h1>
          <p className="text-[16px]  font-semibold px-8 pb-20">Write something here</p>
          <img className="flex-grow rounded-none" src={homestayphoto} alt="homestay"/>
        </div>

        <div className="w-[400px] h-[445px] itemContainer flex flex-col justify-between items-center py-5 pl-10 pr-5 ">
          <div className="w-full flex justify-between">
            <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
              <h1 className="text-4xl text-[var(--text-title)]">{tempervar.value.text}</h1>
              <h2 className=" text-5xl font-bold" style={{color: 'var(--text-data)'}}>
                {sensorData.temperature}
                {(sensorData.temperature === "OFF" || sensorData.temperature === "NaN") ? "" : ("oC")}
              </h2>
            </div>
            <img
              className="w-[100px] h-[100px] object-cover"
              src={!toggleDarkMode ? tempicon : temperature_dark}
              alt=""
            ></img>
          </div>

          <div className="w-full flex justify-between ">
            <div className="w-auto h-full flex flex-col justify-center items-start gap-3 ">
              <h1 className=" text-4xl text-[var(--text-title)]">{lightvar.value.text}</h1>
              <h2 className=" text-5xl font-bold" style={{color: 'var(--text-data)'}}>
                {sensorData.light}
                {(sensorData.light === "OFF" || sensorData.light === "NaN") ? "" : ("Lux")}
              </h2>
            </div>
            <img
              className="w-auto h-[100px] object-cover"
              src={!toggleDarkMode ? lightbulp : lightbulb_dark}
              alt=""
            ></img>
          </div>

          <div className={`w-full flex justify-between`}
          >
            <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
              <h1 className=" text-4xl text-[var(--text-title)]">{humidityvar.value.text}</h1>
              <h2 className=" text-5xl font-bold" style={{color: 'var(--text-data)'}}>
                {sensorData.humidity}
                {sensorData.humidity === "OFF" || sensorData.humidity === "NaN" ? "" : "%"}
              </h2>
            </div>
            <img
              className="w-auto h-[100px] object-cover"
              src={!toggleDarkMode ? humidityicon : humid_dark}
              alt=""
            ></img>
          </div>
        </div>

        {/* Lower code */}
        <div className={`home-lower-container w-fit h-fit flex gap-10 flex-col`}>
          <div className='w-[400px] h-[200px] itemContainer flex flex-col items-center'>
            <p className='mt-5 bg-[var(--bg-gray)] w-[320px] h-[80px] flex justify-center items-center rounded-[30px] text-2xl font-semibold '>Fan speed</p>
            <p className=' text-5xl font-bold mt-5' style={{color: 'var(--text-data)'}}>{parseInt(fan)}</p>
          </div> 
          <div className='w-[400px] h-[200px] itemContainer flex flex-col items-center relative'>
            <p className='mt-5 bg-[var(--bg-gray)] w-[320px] h-[80px] flex justify-center items-center rounded-[30px] text-2xl font-semibold '>Light color</p>
            <div className='w-full h-[70px] absolute bottom-0 left-0 rounded-b-xl' style={{backgroundColor: hex}}></div>
          </div>
        </div>

        
      </div>
      {/* <Images /> */}
      {/* <LargeImages/> */}
      <ButtonGroup size='large' variant="outlined" aria-label="Basic button group" sx={{mb: "30px"}}>
        <Button  variant={autoMode ? "contained" : "outlined"} onClick={handleTurnOn} >AUTOMODE ON</Button>
        <Button variant={autoMode ? "outlined" : "contained"} onClick={handleTurnOff}>AUTOMODE OFF</Button>
      </ButtonGroup>
      
    </div>
  )
}

export default Homepage