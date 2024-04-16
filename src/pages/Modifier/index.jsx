import React, { useState, useEffect } from "react";
import data from "../../components/Constant";
import FormControlLabel from "@mui/material/FormControlLabel";
import PowerSwitch from "../../components/PowerSwitch";
import analytic from "../../assets/images/analytic.png";
import analyticiconlight from "../../assets/icons/analyticiconlight.png";
import { Sketch } from "@uiw/react-color";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import client from "../../mqtt/mqttclient";
import "./Modifier.css";
const AIO_USERNAME = "quoc_huy";

const Modifier = ({variable, hex, setHex, fan, setFan}) => {
  const [switchLightState, setSwitchLightState] = useState(false);
  const [switchTempandHumState, setSwitchTempandHumState] = useState(true);
  const [switchFanState, setSwitchFanState] = useState(false);
  const [switchLightSenState, setLightSenState] = useState(true);
  const [openSetColor, setOpenSetColor] = useState(false);  

  const handleSetColor = () => {
    client.publish(`${AIO_USERNAME}/feeds/led_color`, hex);
  }

  const handleSwitchLightChange = () => {
    if (switchLightState) {
      client.publish(`${AIO_USERNAME}/feeds/light_switch`, "0");
    } else {
      client.publish(`${AIO_USERNAME}/feeds/light_switch`, "1");
    }
    setSwitchLightState(!switchLightState);
  };
  const handleTempandHumChange = () => {
    if (switchTempandHumState) {
      client.publish(`${AIO_USERNAME}/feeds/humidity_tem`, "0");
    } else {
      client.publish(`${AIO_USERNAME}/feeds/humidity_tem`, "1");
    }
    setSwitchTempandHumState(!switchTempandHumState);
  };
  const handleSwitchFanChange = () => {
    if (switchFanState) {
      client.publish(`${AIO_USERNAME}/feeds/FAN`, "0");
    } else {
      client.publish(`${AIO_USERNAME}/feeds/FAN`, "30");
    }
    setSwitchFanState(!switchFanState);
  };
  const handleLightSenChange = () => {
    if (switchLightSenState) {
      client.publish(`${AIO_USERNAME}/feeds/control_lux`, "0");
    } else {
      client.publish(`${AIO_USERNAME}/feeds/control_lux`, "1");
    }
    setLightSenState(!switchLightSenState);
  };

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
  const temporlightvar = {
    value: variables === "temperature" ? data.temperature : data.lightlevel,
  };
  const humidityvar = {
    value: data.humidity,
  };
  return (
    <div className="w-full relative">
      <div className=" w-full h-[auto] flex flex-col gap-6 relative items-center justify-center">
        <div className="w-full h-[full] flex flex-row gap-6 flex-wrap justify-center">
          <div className="w-[420px] h-[160px] rounded-xl border-4 border-lightgray bg-white py-[30px] px-[25px] flex flex-row  justify-between items-center">
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
            className={`w-[420px] h-[160px] rounded-xl border-4 border-lightgray bg-white py-[30px] px-[25px] flex flex-row  justify-between items-center ${variables === "temperature" ? "block" : "hidden"
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
          <Button
            sx={{
                height: "50px",
                position: "absolute",
                top: 0,
                right: 0,
                display: variables === "temperature" ? "none" : "block" 
            }}
            onClick={() => setOpenSetColor(prev => !prev)}
            variant="contained"
            color="primary"
          >
            Set LED Color
          </Button>
        </div>
        <div className="w-full h-[full] flex flex-row gap-6 flex-wrap justify-center">
          <div className="w-[420px] h-[320px] border-4 border-lightgray bg-white rounded-xl px-9 py-8">
            <div className="w-full relative h-full flex flex-col justify-start items-start gap-4 ">
              <div className="w-full h-[80px] text-center flex justify-center items-center bg-gray/20 rounded-3xl text-black text-2xl font-bold px-6 py-3">
                {"Switch"}
              </div>
              <h1 className="text-black font-bold text-2xl ml-4">
                {variables === "temperature"
                  ? "Turn the fan on or off"
                  : "Turn the led light on or off"}
              </h1>
              <h2 className="text-black font-semibold text-xl ml-4">
                Write something here
              </h2>
              <div
                className={`w-full absolute bottom-0 h-auto  flex justify-end items-center ${variables === "temperature" ? "hidden" : "block"
                  } `}
              >
                <FormControlLabel
                  control={
                    <PowerSwitch
                      sx={{ m: 1 }}
                      defaultChecked
                      checked={switchLightState}
                      onChange={() => handleSwitchLightChange()}
                    />
                  }
                />
              </div>
              <div
                className={`w-full absolute bottom-0 h-auto  flex justify-end items-center ${variables === "temperature" ? "block" : "hidden"
                  } `}
              >
                <FormControlLabel
                  control={
                    <PowerSwitch
                      sx={{ m: 1 }}
                      defaultChecked
                      checked={switchFanState}
                      onChange={() => handleSwitchFanChange()}
                    />
                  }
                />
              </div>
            </div>
          </div>

          <div className="w-[420px] h-[320px] border-4 border-lightgray bg-white rounded-xl px-9 py-8">
            <div className="w-full relative h-full flex flex-col justify-start items-start gap-4">
              <div className="w-full h-[80px] text-center flex justify-center items-center bg-gray/20 rounded-3xl text-black text-2xl font-bold px-6 py-3">
                {"Sensor"}
              </div>
              <h1 className="text-black font-bold text-2xl ml-4">
                {variables === "temperature"
                  ? "Turn the humidity and tempearture sensor on or off"
                  : "Turn the led light sensor on or off"}
              </h1>
              <h2 className="text-black font-semibold text-xl ml-4">
                Write something here
              </h2>
              <div
                className={`w-full absolute bottom-0 h-auto  flex justify-end items-center ${variables === "temperature" ? "hidden" : "block"
                  } `}
              >
                <FormControlLabel
                  control={
                    <PowerSwitch
                      sx={{ m: 1 }}
                      defaultChecked
                      checked={switchLightSenState}
                      onChange={() => handleLightSenChange()}
                    />
                  }
                />
              </div>
              <div
                className={`w-full absolute bottom-0 h-auto  flex justify-end items-center ${variables === "temperature" ? "block" : "hidden"
                  } `}
              >
                <FormControlLabel
                  control={
                    <PowerSwitch
                      sx={{ m: 1 }}
                      defaultChecked
                      checked={switchTempandHumState}
                      onChange={() => handleTempandHumChange()}
                    />
                  }
                />
              </div>
              
              
            </div>
            
            
          </div>
          
          <div className="home-large-image" style={{height: "320px"}}>
          <img
            className="w-full h-full object-cover"
            src={analytic}
            alt=""
          ></img>
          <div className="home-config">
            <div className="flex flex-col gap-3 ">
              <h1 className="text-white font-bold text-2xl ml-4">Analytics</h1>
              <h2 className="text-white font-semibold text-xl ml-4">
                Write something here
              </h2>
            </div>
            <div className="w-[60px] h-[60px] flex justify-center items-center p-2 rounded-full bg-gray/60">
              <img
                className="w-[30px] h-[30px] object-cover "
                src={analyticiconlight}
                alt=""
              ></img>
            </div>
          </div>
        </div>





        </div>
      

        
      </div>
      {openSetColor && (<div className={`w-[400px] h-[700px]  items-center border-4 border-lightgray bg-white rounded-xl px-2 py-3 flex flex-col gap-1 absolute top-0 right-0 ${variables === "temperature" ? "hidden" : "block"} `}>
        <Sketch
          color={hex}
          onChange={(color) => {
            setHex(color.hex);
            console.log("NEWHEX", hex)
          }}
          style={{ width: '350px', height: '600px' }} // Set the width here
        />
        <div className="flex gap-5">
          <Button 
            variant="contained" 
            endIcon={<SendIcon />} 
            onClick={() => handleSetColor()} 
            style={{ width: '270px', height: '60px', backgroundColor:"#1D4ED8" }} // Set the width here
          >
            Set LED Color
          </Button>
          <Button sx={{width: '50px', height:"60px", backgroundColor:"#1D4ED8" }} onClick={() => setOpenSetColor(prev => !prev)}  variant="contained" color="primary">
              {openSetColor ? "Close" : "Set LED Color"}
            </Button>
        </div>
        
      </div>)}
    </div>
    
    
  );
};

export default Modifier;
