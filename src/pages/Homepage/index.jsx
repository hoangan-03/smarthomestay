import React, { useState, useEffect } from 'react'
import './homepage.css'
import homestayphoto from '../../assets/icons/homestayphoto.png'
import data from "../../components/Constant";
import client from "../../mqtt/mqttclient";
import { Button, ButtonGroup, IconButton, Box, Slider} from '@mui/material'
import { useData } from '../../components/DataProvider'
import tempicon from "../../assets/icons/Temperature icon.png";
import lightbulp from "../../assets/icons/lightbulp.png";
import humidityicon from "../../assets/icons/humidityicon.png";
import lightbulb_dark from "../../assets/icons/lightbulb_dark.png";
import humid_dark from "../../assets/icons/humid_dark.png";
import temperature_dark from "../../assets/icons/temperature_dark.png";
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';
const AIO_USERNAME = process.env.REACT_APP_AIO_USERNAME;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  borderRadius: 5,
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  p: 4,
};

function BasicModal({handleClose, handleSetting, open, autoMode, handleClick}) {
  
  const [minTemp, setMinTemp] = useState(50);
  const [maxTemp, setMaxTemp] = useState(50);
  const [minLight, setMinLight] = useState(50);
  const [maxLight, setMaxLight] = useState(50);
  useEffect(() => {
    client.on("connect", () => {
      client.subscribe(`${AIO_USERNAME}/feeds/maxLight`);
      client.subscribe(`${AIO_USERNAME}/feeds/maxTemp`);
      client.subscribe(`${AIO_USERNAME}/feeds/minLight`);
      client.subscribe(`${AIO_USERNAME}/feeds/minTemp`);
    });

    client.on("message", (topic, message) => {
      console.log("topic", topic)
      if (topic === `${AIO_USERNAME}/feeds/maxLight`) {
        setMaxLight(parseInt(message.toString()));
      } else if (topic === `${AIO_USERNAME}/feeds/maxTemp`) {
        setMaxTemp(parseInt(message.toString()));
      } else if (topic === `${AIO_USERNAME}/feeds/minTemp`) {
        setMinLight(parseInt(message.toString()));
      } else if (topic === `${AIO_USERNAME}/feeds/minTemp`) {
        setMinTemp(parseInt(message.toString()));
      }
    });
  }, []);

  const handleSubmit = () => {
    // Handle submit button click
    client.publish(`${AIO_USERNAME}/feeds/maxLight`, maxLight);
    client.publish(`${AIO_USERNAME}/feeds/maxTemp`, maxTemp);
    client.publish(`${AIO_USERNAME}/feeds/minLight`, minLight);
    client.publish(`${AIO_USERNAME}/feeds/minTemp`, minTemp);
    handleClose();
    handleClick("Setting is saved successfully", "success")()
    const control = {
      Dev_id: "setting_set_device_1",
      Room_id: 1,
      Action: "Setting is saved successfully",
      Ctrl_mode: "Manual",
      Timestamp: new Date().toISOString(),
      Isviewed: false,
    };
    axios
      .post("http://localhost:8000/controlling", control)
      .then((res) => {
        console.log("Log added successfully");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.log(err.response.data.error);
          } else if (err.response.status === 500) {
            console.error("Internal Server Response");
          }
        } else {
          console.error(err);
        }
      });
  };

  const handleCancel = () => {
    // Handle cancel button click
    handleClose();
  };

  return (
    <div>
      <IconButton size='large' onClick={handleSetting} disabled={autoMode ? false : true}><SettingsIcon/></IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h1 className='text-center text-3xl font-bold'>SETTING</h1>
          <div className='flex'>
            <p className='w-[220px] text-lg'>Min temperature</p>
            <Slider value={minTemp} onChange={(event, newValue) => setMinTemp(newValue)} aria-label="Min temperature" valueLabelDisplay="auto" />
          </div>
          <div className='flex'>
            <p className='w-[220px] text-lg'>Max temperature</p>
            <Slider value={maxTemp} onChange={(event, newValue) => setMaxTemp(newValue)} aria-label="Max temperature" valueLabelDisplay="auto"  />
          </div>
          <div className='flex'>
            <p className='w-[220px] text-lg'>Min lightlevel</p>
            <Slider value={minLight} onChange={(event, newValue) => setMinLight(newValue)} aria-label="Min lightlevel" valueLabelDisplay="auto" />
          </div>
          <div className='flex'>
            <p className='w-[220px] text-lg'>Max lightlevel</p>
            <Slider value={maxLight} onChange={(event, newValue) => setMaxLight(newValue)} aria-label="Max lightlevel" valueLabelDisplay="auto" />
          </div>
          <div className='flex gap-4 justify-center'>
            <Button onClick={handleSubmit} variant="contained">Save</Button>
            <Button onClick={handleCancel} variant="outlined">Cancel</Button>
            
          </div>
        </Box>
      </Modal>
    </div>
  );
}

const Homepage = () => {
  const { hex, fan, autoMode, setAutoMode, handleClick, toggleDarkMode, getCookie, sensorData } = useData();
  const [open, setOpen] = useState(false);
  // const [sensorData, setSensorData] = useState({
  //   temperature: "OFF",
  //   humidity: "OFF",
  //   light: "OFF",
  // });
  const navigate = useNavigate();

  useEffect(() => {
    const user = getCookie('cookieUser')
    console.log("User: ", user)
    if (!user) {
      navigate('/auth');
    }
  }, [navigate,getCookie]);

  // useEffect(() => {
  //   client.on("connect", () => {
  //     client.subscribe(`${AIO_USERNAME}/feeds/temperature_sensor`);
  //     client.subscribe(`${AIO_USERNAME}/feeds/humility_sensor`);
  //     client.subscribe(`${AIO_USERNAME}/feeds/light_sensor`);
  //   });

  //   client.on("message", (topic, message) => {
  //     if (topic === `${AIO_USERNAME}/feeds/temperature_sensor`) {
  //       setSensorData((prevState) => ({
  //         ...prevState,
  //         temperature: parseFloat(message.toString()),
  //       }));
  //     } else if (topic === `${AIO_USERNAME}/feeds/humility_sensor`) {
  //       setSensorData((prevState) => ({
  //         ...prevState,
  //         humidity: parseFloat(message.toString()),
  //       }));
  //     } else if (topic === `${AIO_USERNAME}/feeds/light_sensor`) {
  //       setSensorData((prevState) => ({
  //         ...prevState,
  //         light: parseFloat(message.toString()),
  //       }));
  //     }
  //   });
  // }, []);
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
    const control = {
      Dev_id: "mode_set_device_1",
      Room_id: 1,
      Action: "Auto mode is turned on successfully",
      Ctrl_mode: "Manual",
      Timestamp: new Date().toISOString(),
      Isviewed: false,
    };
    axios
      .post("http://localhost:8000/controlling", control)
      .then((res) => {
        console.log("Log added successfully");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.log(err.response.data.error);
          } else if (err.response.status === 500) {
            console.error("Internal Server Response");
          }
        } else {
          console.error(err);
        }
      });
  }

  const handleTurnOff = () => {
    if (!autoMode) return
    setAutoMode(false)
    handleClick("Auto mode is turned off successfully", "success")()
    const control = {
      Dev_id: "mode_set_device_1",
      Room_id: 1,
      Action: "Auto mode is turned off successfully",
      Ctrl_mode: "Manual",
      Timestamp: new Date().toISOString(),
      Isviewed: false,
    };
    axios
      .post("http://localhost:8000/controlling", control)
      .then((res) => {
        console.log("Log added successfully");
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.status === 400) {
            console.log(err.response.data.error);
          } else if (err.response.status === 500) {
            console.error("Internal Server Response");
          }
        } else {
          console.error(err);
        }
      });
  }
  
  const handleSetting = () => {
    setOpen(true)
  }

  const handleClose = () => setOpen(false);


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
      <div className='flex'>
        <ButtonGroup size='large' variant="outlined" aria-label="Basic button group">
          <Button variant={autoMode ? "outlined" : "contained"} onClick={handleTurnOff} >AUTOMODE OFF</Button>
          <Button sx={{mr: "20px"}} variant={autoMode ? "contained" : "outlined"} onClick={handleTurnOn}>AUTOMODE ON</Button>
        </ButtonGroup>
        <BasicModal {...{ autoMode, handleClose, handleSetting, open, handleClick }} />
      </div>
      
    </div>
  )
}

export default Homepage