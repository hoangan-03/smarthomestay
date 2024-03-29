import React, { useState, useEffect } from "react";
import data from "../../components/Constant";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import PowerSwitch from "../../components/PowerSwitch";
import analytic from "../../assets/images/analytic.png";
import analyticiconlight from "../../assets/icons/analyticiconlight.png";
import client from "../../mqtt/mqttclient"

const AIO_USERNAME = 'quoc_huy';
const Modifier = (variable) => {

  const [switchLightState, setSwitchLightState] = useState(true);
  const [switchTempandHumState, setSwitchTempandHumState] = useState(true);
  const handleSwitchLightChange = () => {
    setSwitchLightState(!switchLightState);
  };
  const handleTempandHumChange = () => {
    setSwitchTempandHumState(!switchTempandHumState);
  };

  const [sensorData, setSensorData] = useState({
    temperature: 4,
    humidity: 3,
    light: 2,
  });
  console.log("variable: ", variable.variable);

  useEffect(() => {
    client.on("connect", () => {
      console.log("Connected to Adafruit MQTT");
      client.subscribe(`${AIO_USERNAME}/feeds/temperature_sensor`);
      client.subscribe(`${AIO_USERNAME}/feeds/humility_sensor`);
      client.subscribe(`${AIO_USERNAME}/feeds/light_sensor`);
      const publishInterval = setInterval(() => {
        client.publish(`${AIO_USERNAME}/feeds/temperature_sensor`, "69");
        client.publish(`${AIO_USERNAME}/feeds/humility_sensor`, "30");
        client.publish(`${AIO_USERNAME}/feeds/light_sensor`, "20");
      }, 4000);
      return () => {
        clearInterval(publishInterval);
        client.end();
      };
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

  console.log("temperature", sensorData.temperature);
  console.log("humidity", sensorData.humidity);
  console.log("light", sensorData.light);

  const [acceptanceRange, setAcceptanceRange] = useState(50);
  const thisvar = {
    value:
      variable.variable === "temperature" ? data.temperature : data.lightlevel,
  };
  const handleChange = (acceptanceRange) => setAcceptanceRange(acceptanceRange);

  return (
    <div className="w-[1300px] h-auto flex flex-col gap-6">
      <div className="w-[420px] h-[175px] rounded-xl border-4 border-lightgray bg-white py-[30px] px-[25px] flex flex-row  justify-between items-center">
        <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
          <h1 className="text-black text-4xl">{thisvar.value.text}</h1>
          <h2 className="text-blue-700 text-5xl font-bold">
            {variable.variable == "temperature"
              ? sensorData.temperature
              : sensorData.light}{" "}
            {variable.variable == "temperature" ? "°C" : "%"}
          </h2>
        </div>
        <img
          className="w-auto h-[100px] object-cover"
          src={thisvar.value.iconUrl}
          alt=""
        ></img>
      </div>
      <div className="w-full h-[400px] flex flex-row gap-6">
        <div className="w-[420px] h-[400px] border-4 border-lightgray bg-white rounded-xl px-9 py-8">
          <div className="w-full h-full flex flex-col justify-start items-start gap-4">
            <div className="w-auto h-[80px] flex justify-center items-center bg-gray/20 rounded-3xl text-black text-2xl font-bold px-6 py-3">
              Acceptance range
            </div>
            <h1 className="text-black font-bold text-2xl ml-4">
              Write something here
            </h1>
            <h1 className="text-black font-semibold text-xl ml-4">
              Write something here
            </h1>
            <div className="w-full h-auto mt-[90px]">
              <Box sx={{ width: 320 }}>
                <Slider
                  value={acceptanceRange}
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  onChange={(e, newValue) => handleChange(newValue)}
                />
              </Box>
            </div>
          </div>
        </div>
        <div className="w-[420px] h-[400px] border-4 border-lightgray bg-white rounded-xl px-9 py-8">
          <div className="w-full h-full flex flex-col justify-start items-start gap-4">
            <div className="w-auto h-[80px] flex justify-center items-center bg-gray/20 rounded-3xl text-black text-2xl font-bold px-6 py-3">
              Power
            </div>
            <h1 className="text-black font-bold text-2xl ml-4">
              Write something here
            </h1>
            <h2 className="text-black font-semibold text-xl ml-4">
              Write something here
            </h2>
            <div
              className={`w-full h-auto mt-[90px] flex justify-end items-center ${variable.variable === "temperature" ? "block" : "hidden"
                } `}
            >
              <FormControlLabel
                control={
                  <PowerSwitch
                    sx={{ m: 1 }}
                    defaultChecked
                    checked={switchLightState}
                    onChange={handleSwitchLightChange}
                  />
                }
              />
            </div>
            <div
              className={`w-full h-auto mt-[90px] flex justify-end items-center ${variable.variable === "temperature" ? "hidden" : "block"
                } `}
            >
              <FormControlLabel
                control={
                  <PowerSwitch
                    sx={{ m: 1 }}
                    defaultChecked
                    checked={switchTempandHumState}
                    onChange={handleTempandHumChange}
                  />
                }
              />
            </div>
          </div>
        </div>

        <div className="relative w-[420px] h-[400px] border-4 border-lightgray bg-white rounded-xl">
          <img
            className="w-full h-full object-cover"
            src={analytic}
            alt=""
          ></img>
          <div className="absolute bottom-0 h-[127px] w-full flex flex-row py-4 px-7  justify-between items-center bg-black/40 backdrop-blur-lg">
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
  );
};

export default Modifier;
