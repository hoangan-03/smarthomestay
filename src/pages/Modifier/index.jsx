import React, { useState, useEffect } from "react";
import data from "../../components/Constant";
import FormControlLabel from "@mui/material/FormControlLabel";
import PowerSwitch from "../../components/PowerSwitch";
import analytic from "../../assets/images/analytic.png";
import analyticiconlight from "../../assets/icons/analyticiconlight.png";
import { Sketch } from "@uiw/react-color";
import { Slider } from "@mui/material";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import client from "../../mqtt/mqttclient";
import { useData } from "../../components/DataProvider";
import lightbulb_dark from "../../assets/icons/lightbulb_dark.png";
import humid_dark from "../../assets/icons/humid_dark.png";
import temperature_dark from "../../assets/icons/temperature_dark.png";
import "./Modifier.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const AIO_USERNAME = process.env.REACT_APP_AIO_USERNAME;

const Modifier = ({ variable }) => {
  const navigate = useNavigate();
  const { hex, setHex, fan, setFan, autoMode, handleClick, toggleDarkMode, getCookie, sensorData} = useData()
  const [switchLightState, setSwitchLightState] = useState(false);
  const [switchTempandHumState, setSwitchTempandHumState] = useState(true);
  const [switchLightSenState, setLightSenState] = useState(true);
  const [openSetColor, setOpenSetColor] = useState(false);
  let holdColor = hex
  const [holdFan, setHoldFan] = useState(parseInt(fan));

  useEffect(() => {
    client.on("connect", () => {
      client.subscribe(`${AIO_USERNAME}/feeds/humidity_tem`);
    });
    client.on("message", (topic, message) => {
      if (topic === `${AIO_USERNAME}/feeds/humidity_tem`) {
        console.log("HERE temp sensor", message.toString());
        setSwitchTempandHumState(message.toString());
      }
      else if (topic === `${AIO_USERNAME}/feeds/light_switch`) {
        console.log("HERE light switch", message.toString());
        setLightSenState(message.toString());
      }
    }); 
  }, [])
  useEffect(() => {
    const user = getCookie('cookieUser');
    if (!user) {
      navigate('/auth');
    }
  }, [navigate, getCookie]);

  const handleSetColor = () => {
    setHex(holdColor)
    handleClick("Set LED color successfully", "success")()
    const control = {
      Dev_id: "color_set_device_1",
      Room_id: 1,
      Action: "Set LED color successfully",
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

  useEffect(() => {
    console.log("Publish hex color")
    client.publish(`${AIO_USERNAME}/feeds/led_color`, hex);
  }, [hex])

  useEffect(() => {
    console.log("Publish fan")
    client.publish(`${AIO_USERNAME}/feeds/FAN`, fan);
  }, [fan])

  const handleSwitchLightChange = () => {
    const action = switchLightState ? "off" : "on";

    if (switchLightState) {
      client.publish(`${AIO_USERNAME}/feeds/light_switch`, "0");
    } else {
      client.publish(`${AIO_USERNAME}/feeds/light_switch`, "1");
    }

    handleClick("Light switch is turned " + action + " successfully", "success")();
    setSwitchLightState(!switchLightState);
    const control = {
      Dev_id: "light_switch_device_1",
      Room_id: 1,
      Action: "Light switch is turned " + action + " successfully",
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
  const handleTempandHumChange = () => {
    if (switchTempandHumState) {
      client.publish(`${AIO_USERNAME}/feeds/humidity_tem`, "0");
    } else {
      client.publish(`${AIO_USERNAME}/feeds/humidity_tem`, "1");
    }
    const action = switchTempandHumState ? "off" : "on";

    handleClick("Temperature and Humidity sensor is turned " + action + " successfully", "success")()
    setSwitchTempandHumState(!switchTempandHumState);
    const control1 = {
      Dev_id: "humidity_device_1",
      Room_id: 1,
      Action: "Humidity sensor is turned " + action + " successfully",
      Ctrl_mode: "Manual",
      Timestamp: new Date().toISOString(),
      Isviewed: false,
    };
    axios
      .post("http://localhost:8000/controlling", control1)
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
    const control2 = {
      Dev_id: "temperature_device_1",
      Room_id: 1,
      Action: "Temperature sensor is turned " + action + " successfully",
      Ctrl_mode: "Manual",
      Timestamp: new Date().toISOString(),
      Isviewed: false,
    };
    axios
      .post("http://localhost:8000/controlling", control2)
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
  const handleLightSenChange = () => {
    if (switchLightSenState) {
      client.publish(`${AIO_USERNAME}/feeds/control_lux`, "0");
    } else {
      client.publish(`${AIO_USERNAME}/feeds/control_lux`, "1");
    }
    const action = switchLightSenState ? "off" : "on";
    handleClick("Light sensor is turned " + action + " successfully", "success")()
    setLightSenState(!switchLightSenState);
    const control = {
      Dev_id: "light_device_1",
      Room_id: 1,
      Action: "Light sensor is turned " + action + " successfully",
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
  const handleSetFanChange = () => {
    setFan(holdFan.toString());
    handleClick("Fan speed is set to " + holdFan.toString() + " successfully", "success")()
    const control = {
      Dev_id: "fan_device_1",
      Room_id: 1,
      Action: "Fan speed is set to " + holdFan.toString() + " successfully",
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


  const handleSliderChange = (event, newValue) => {
    setHoldFan(newValue);
  };

  // const [sensorData, setSensorData] = useState({
  //   temperature: "OFF",
  //   humidity: "OFF",
  //   light: "OFF",
  // });

  // useEffect(() => {
  //   client.on("connect", () => {
  //     console.log("Connected to Adafruit MQTT");
  //     client.subscribe(`${AIO_USERNAME}/feeds/temperature_sensor`);
  //     client.subscribe(`${AIO_USERNAME}/feeds/humility_sensor`);
  //     client.subscribe(`${AIO_USERNAME}/feeds/light_sensor`);

  //     // const publishInterval = setInterval(() => {
  //     //   client.publish(`${AIO_USERNAME}/feeds/temperature_sensor`, "69");
  //     //   client.publish(`${AIO_USERNAME}/feeds/humility_sensor`, "30");
  //     //   client.publish(`${AIO_USERNAME}/feeds/light_sensor`, "20");
  //     // }, 4000);
  //     // return () => {
  //     //   clearInterval(publishInterval);
  //     // };
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
  const variables = variable;
  const temporlightvar = {
    value: variables === "temperature" ? data.temperature : data.lightlevel,
  };
  const temporlightvarDark = {
    value: variables === "temperature" ? temperature_dark : lightbulb_dark,
  }
  const humidityvar = {
    value: data.humidity,
  };


  return (
    <div className="w-full relative">
      <div className=" w-full h-[auto] flex flex-col gap-6 relative items-center justify-center">
        <div className="w-full h-[full] flex flex-row gap-6 flex-wrap justify-center">
          <div className="w-[420px] h-[160px] itemContainer flex flex-row  justify-between items-center py-[30px] px-[25px]">
            <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
              <h1 className="text-4xl">{temporlightvar.value.text}</h1>
              <h2 className="text-5xl font-bold" style={{ color: 'var(--text-data)' }}>
                {variables === "temperature"
                  ? sensorData.temperature
                  : sensorData.light}{" "}
                {(sensorData.temperature === "OFF" || sensorData.temperature === "NaN") ? "" : (variables === "temperature" ? "oC" : "LUX")}
              </h2>
            </div>
            <img
              className="w-auto h-[100px] object-cover"
              src={!toggleDarkMode ? temporlightvar.value.iconUrl : temporlightvarDark.value}
              alt=""
            ></img>
          </div>
          <div
            className={`w-[420px] h-[160px] py-[30px] px-[25px] itemContainer flex-row  justify-between items-center ${variables === "temperature" ? "flex" : "hidden"
              }`}
          >
            <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
              <h1 className="text-[var(--text-title)] text-4xl">{humidityvar.value.text}</h1>
              <h2 className="text-5xl font-bold" style={{ color: 'var(--text-data)' }}>
                {sensorData.humidity}
                {sensorData.temperature === "OFF" || sensorData.temperature === "NaN" ? "" : "%"}
              </h2>
            </div>
            <img
              className="w-auto h-[100px] object-cover"
              src={!toggleDarkMode ? humidityvar.value.iconUrl : humid_dark}
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
            onClick={() => { setOpenSetColor(prev => !prev) }}
            variant="contained"
            color="primary"
            disabled={autoMode}
          >
            Set LED Color
          </Button>
        </div>
        <div className="w-full h-[full] flex flex-row gap-6 flex-wrap justify-center">
          <div className="w-[420px] h-[320px] itemContainer px-9 py-8">
            <div className="w-full relative h-full flex flex-col justify-start items-start gap-4 ">
              <div className="w-full h-[80px] text-center flex justify-center items-center bg-gray/20 rounded-3xl text-black text-2xl font-bold px-6 py-3">
                <p>{variables === "temperature" ? "Fan Speed" : "Light Switch"}</p>
              </div>

              {variables === "temperature" && <Slider defaultValue={holdFan} value={holdFan} onChange={handleSliderChange} aria-label="Default" valueLabelDisplay="auto" disabled={autoMode} />}
              <h1 className="text-black font-bold text-2xl ml-4">

                {variables === "temperature"
                  ? "Set fan speed"
                  : "Turn the led light on or off"}
              </h1>
              <div
                className={`w-full absolute bottom-0 h-auto  flex justify-end items-center ${variables === "temperature" ? "hidden" : "block"
                  } `}
              >
                <FormControlLabel
                  control={
                    <PowerSwitch
                      sx={{ m: 1 }}
                      checked={switchLightState}
                      onChange={() => handleSwitchLightChange()}
                      disabled={autoMode}
                    />
                  }
                />
              </div>
              <div
                className={`w-full absolute bottom-0 h-auto  flex justify-end items-center ${variables === "temperature" ? "block" : "hidden"
                  } `}
              >
                <Button sx={{ m: 1 }}
                  size="large"
                  variant="contained"
                  onClick={handleSetFanChange}
                  disabled={autoMode}>
                  SET
                </Button>
              </div>
            </div>
          </div>

          <div className="w-[420px] h-[320px] itemContainer px-9 py-8">
            <div className="w-full relative h-full flex flex-col justify-start items-start gap-4">
              <div className="w-full h-[80px] text-center flex justify-center items-center bg-gray/20 rounded-3xl text-black text-2xl font-bold px-6 py-3">
                <p>{"Sensor"}</p>
              </div>
              <h1 className="text-black font-bold text-2xl ml-4">
                {variables === "temperature"
                  ? "Turn the humidity and tempearture sensor on or off"
                  : "Turn the led light sensor on or off"}
              </h1>
              <div
                className={`w-full absolute bottom-0 h-auto  flex justify-end items-center ${variables === "temperature" ? "hidden" : "block"
                  } `}
              >
                <FormControlLabel
                  control={
                    <PowerSwitch
                      sx={{ m: 1 }}
                      checked={switchLightSenState}
                      onChange={() => handleLightSenChange()}
                      disabled={autoMode}
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
                      checked={switchTempandHumState}
                      onChange={() => handleTempandHumChange()}
                      disabled={autoMode}
                    />
                  }
                />
              </div>


            </div>


          </div>


          <div className="home-large-image" style={{ height: "320px", backgroundColor: "var(--bg-head-foot-item)" }}>

            <img
              className="w-full h-full object-cover rounded-xl"
              src={analytic}
              alt=""
            ></img>
            <div className="home-config">
              <div className="flex flex-col gap-3 ">
                <h1 className="text-white font-bold text-2xl ml-4">Analytics</h1>
              </div>
              <Link to="/Analytics" className="w-[60px] h-[60px] flex justify-center items-center p-2 rounded-full bg-gray/60">
                <img
                  className="w-[30px] h-[30px] object-cover "
                  src={analyticiconlight}
                  alt=""
                ></img>
              </Link>
            </div>
          </div>





        </div>



      </div>
      {openSetColor && (<div className={`w-[400px] h-[600px]  items-center itemContainer px-2 py-3 flex flex-col gap-1 absolute top-0 right-0 variables === "temperature" ? "hidden" : "block"} `} style={{ top: "-80px" }}>
        <Sketch
          color={holdColor}
          onChange={(color) => {
            holdColor = color.hex
            // console.log("NEWHEX", hex)
          }}
          style={{ width: '350px', height: '500px' }} // Set the width here
        />
        <div className="flex gap-5">
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            onClick={() => handleSetColor()}

            style={{ width: '270px', height: '60px', backgroundColor: "#1D4ED8" }} // Set the width here
          >
            Set LED Color
          </Button>
          <Button sx={{ width: '50px', height: "60px", backgroundColor: "#1D4ED8" }} onClick={() => setOpenSetColor(prev => !prev)} variant="contained" color="primary">
            {openSetColor ? "Close" : "Set LED Color"}
          </Button>
        </div>

      </div>)}
      {/* <AlertDialog title={"Turn Off Sensor Confirm"} description={"Disabling this feature may bring discomfort. Are you sure you want to proceed with disabling it?"} open={openAlertDialog} handleClose={handleCloseDialog} handleConfirm={handleConfirmDialog}/> */}
    </div>


  );
};

export default Modifier;
