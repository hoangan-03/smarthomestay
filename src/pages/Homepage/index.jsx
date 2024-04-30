import React, { useState, useEffect } from 'react'
import './homepage.css'
import homestayphoto from '../../assets/icons/homestayphoto.png'
import data from "../../components/Constant";
import client from "../../mqtt/mqttclient";
import { Button, ButtonGroup } from '@mui/material'
import { useData } from '../../components/DataProvider'
import tempicon from "../../assets/icons/Temperature icon.png";
import lightbulp from "../../assets/icons/lightbulp.png";
import humidityicon from "../../assets/icons/humidityicon.png";
import lightbulb_dark from "../../assets/icons/lightbulb_dark.png";
import humid_dark from "../../assets/icons/humid_dark.png";
import temperature_dark from "../../assets/icons/temperature_dark.png";
import { useNavigate } from 'react-router-dom';

const AIO_USERNAME = process.env.REACT_APP_AIO_USERNAME;

const Homepage = () => {
  const { hex, fan, autoMode, setAutoMode, handleClick, toggleDarkMode, getCookie } = useData();
  const [sensorData, setSensorData] = useState({
    temperature: "OFF",
    humidity: "OFF",
    light: "OFF",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCookie('cookieUser')
    console.log("User: ", user)
    if (!user) {
      navigate('/auth');
    }
  }, [navigate,getCookie]);

  useEffect(() => {
    client.on("connect", () => {
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
          <h1 className="text-[22px] font-bold px-6 pt-5">Welcome to <span className='text-sky-700'>Smart Homestay!</span> </h1>
          <p className="text-[16px]  font-semibold px-6 pb-20">Our system, revolutionizing hospitality with seamless automation, remote monitoring, and personalized guest experience</p>
          <img className="flex-grow rounded-none" src={homestayphoto} alt="homestay" />
        </div>

        <div className="w-[400px] h-[445px] itemContainer flex flex-col justify-between items-center py-5 pl-10 pr-5 ">
          <div className="w-full flex justify-between">
            <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
              <h1 className="text-4xl text-[var(--text-title)]">{tempervar.value.text}</h1>
              <h2 className=" text-5xl font-bold" style={{ color: 'var(--text-data)' }}>
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
              <h2 className=" text-5xl font-bold" style={{ color: 'var(--text-data)' }}>
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
              <h2 className=" text-5xl font-bold" style={{ color: 'var(--text-data)' }}>
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

        <div className={`home-lower-container w-fit h-fit flex gap-10 flex-col`}>
          <div className='w-[400px] h-[200px] itemContainer flex flex-col items-center'>
            <p className='mt-5 bg-[var(--bg-gray)] w-[320px] h-[80px] flex justify-center items-center rounded-[30px] text-2xl font-semibold '>Fan speed</p>
            <p className=' text-5xl font-bold mt-5' style={{ color: 'var(--text-data)' }}>{parseInt(fan)}</p>
          </div>
          <div className='w-[400px] h-[200px] itemContainer flex flex-col items-center relative'>
            <p className='mt-5 bg-[var(--bg-gray)] w-[320px] h-[80px] flex justify-center items-center rounded-[30px] text-2xl font-semibold '>Light color</p>
            <div className='w-full h-[70px] absolute bottom-0 left-0 rounded-b-xl' style={{ backgroundColor: hex }}></div>
          </div>
        </div>


      </div>
      <ButtonGroup size='large' variant="outlined" aria-label="Basic button group" sx={{ mb: "30px" }}>
        <Button variant={autoMode ? "outlined" : "contained"} onClick={handleTurnOff} >AUTOMODE OFF</Button>
        <Button variant={autoMode ? "contained" : "outlined"} onClick={handleTurnOn}>AUTOMODE ON</Button>
      </ButtonGroup>

    </div>
  )
}

export default Homepage