import React, { useState, useEffect } from "react";
import data from "../../components/Constant";
import FormControlLabel from "@mui/material/FormControlLabel";
import PowerSwitch from "../../components/PowerSwitch";
import analytic from "../../assets/images/analytic.png";
import analyticiconlight from "../../assets/icons/analyticiconlight.png";
import client from "../../mqtt/mqttclient";
const AIO_USERNAME = "quoc_huy";

const Modifier = (variable) => {
  const [switchLightState, setSwitchLightState] = useState(true);
  const [switchTempandHumState, setSwitchTempandHumState] = useState(true);
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

  const [sensorData, setSensorData] = useState({
    temperature: 4,
    humidity: 3,
    light: 2,
  });
 
  useEffect(() => {
    client.on("connect", () => {
      console.log("Connected to Adafruit MQTT");
      // client.subscribe(`${AIO_USERNAME}/feeds/temperature_sensor`);
      // client.subscribe(`${AIO_USERNAME}/feeds/humility_sensor`);
      // client.subscribe(`${AIO_USERNAME}/feeds/light_sensor`);

      // const publishInterval = setInterval(() => {
      //   client.publish(`${AIO_USERNAME}/feeds/temperature_sensor`, "69");
      //   client.publish(`${AIO_USERNAME}/feeds/humility_sensor`, "30");
      //   client.publish(`${AIO_USERNAME}/feeds/light_sensor`, "20");
      // }, 4000);
      // return () => {
      //   clearInterval(publishInterval);
      // };
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
  const variables = variable.variable;
  const temporlightvar = {
    value: variables === "temperature" ? data.temperature : data.lightlevel,
  };
  const humidityvar = {
    value: data.humidity,
  };

  return (
    <div className="w-[1300px] h-auto flex flex-col gap-6">
      <div className="w-full h-[175px] flex flex-row gap-6">
        <div className="w-[440px] h-full rounded-xl border-4 border-lightgray bg-white py-[30px] px-[25px] flex flex-row  justify-between items-center">
          <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
            <h1 className="text-black text-4xl">{temporlightvar.value.text}</h1>
            <h2 className="text-blue-700 text-5xl font-bold">
              {variables === "temperature"
                ? sensorData.temperature
                : sensorData.light}{" "}
              {variables === "temperature" ? "°C" : "%"}
            </h2>
          </div>
          <img
            className="w-auto h-[100px] object-cover"
            src={temporlightvar.value.iconUrl}
            alt=""
          ></img>
        </div>
        <div
          className={`w-[440px] h-full rounded-xl border-4 border-lightgray bg-white py-[30px] px-[25px] flex flex-row  justify-between items-center ${
            variables === "temperature" ? "block" : "hidden"
          }`}
        >
          <div className="w-auto h-full flex flex-col justify-center items-start gap-3">
            <h1 className="text-black text-4xl">{humidityvar.value.text}</h1>
            <h2 className="text-blue-700 text-5xl font-bold">
              {sensorData.humidity}
              {}
            </h2>
          </div>
          <img
            className="w-auto h-[100px] object-cover"
            src={humidityvar.value.iconUrl}
            alt=""
          ></img>
        </div>
      </div>
      <div className="w-full h-[400px] flex flex-row gap-6">
        <div className="w-[440px] h-[400px] border-4 border-lightgray bg-white rounded-xl px-9 py-8">
          <div className="w-full relative h-full flex flex-col justify-start items-start gap-4">
            <div className="w-full h-[80px] text-center flex justify-center items-center bg-gray/20 rounded-3xl text-black text-2xl font-bold px-6 py-3">
              {variables === "temperature" ? "Switch" : "Switch"}
            </div>
            <h1 className="text-black font-bold text-2xl ml-4">
              {variables === "temperature"
                ? "Turn the humidity and tempearture sensor on or off"
                : "Turn the led light on or off"}
            </h1>
            <h2 className="text-black font-semibold text-xl ml-4">
              Write something here
            </h2>
            <div
              className={`w-full absolute bottom-0 h-auto  flex justify-end items-center ${
                variables === "temperature" ? "hidden" : "block"
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
              className={`w-full absolute bottom-0 h-auto  flex justify-end items-center ${
                variables === "temperature" ? "block" : "hidden"
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

        <div className="relative w-[440px] h-[400px] border-4 border-lightgray bg-white rounded-xl">
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
