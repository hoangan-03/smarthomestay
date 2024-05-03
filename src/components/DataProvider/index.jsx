import React, { createContext, useContext, useState, useEffect } from 'react';
import ConsecutiveSnackbars from '../ConsecutiveSnackbars';
import client from '../../mqtt/mqttclient';
const AIO_USERNAME = process.env.REACT_APP_AIO_USERNAME;
const DataContext = createContext();
export const useData = () => useContext(DataContext);
export const DataProvider = ({ children }) => {

    // Hex: color of the light
    // Fan: speed of the fan

    // deleteCookie('cookieUser') to delete the user cookie
    // getCookie('cookieUser') to get the user cookie
    // getCookie return Object: {acc_id: 30910, key: "randomkey", password:"", username:"Peter"}

    const [hex, setHex] = useState('#FFFFFF');
    const [fan, setFan] = useState('0');
    const [setting, setSetting] = useState({
        minTemp: 25,
        maxTemp: 35,
        minLight: 30,
        maxLight: 60,
    });
    const [autoMode, setAutoMode] = useState(false);
    const [snackPack, setSnackPack] = React.useState([]);
    const [messageInfo, setMessageInfo] = React.useState(undefined);
    const [toggleDarkMode, setToggleDarkMode] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(getCookie('cookieUser'))
    const [sensorData, setSensorData] = useState({
      temperature: "OFF",
      humidity: "OFF",
      light: "OFF",
    });

    function setCookie(name, value, days) {
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + days);
      
        // Set SameSite=Strict attribute
        const cookieOptions = {
          expires: expirationDate.toUTCString(),
          path: '/',
          secure: true,
          SameSite: 'Strict',
        };
      
        const cookieValue = `${name}=${encodeURIComponent(JSON.stringify(value))}; ${serializeCookieOptions(cookieOptions)}`;
        document.cookie = cookieValue;
    };

    const serializeCookieOptions = (options) => {
        return Object.entries(options)
          .map(([key, value]) => `${key}=${value}`)
          .join('; ');
    };
    /*Take cookie*/
    function getCookie (name) {
        const cookies = document.cookie.split(';').map(cookie => cookie.trim());
        for (const cookie of cookies) {
          if (cookie.startsWith(`${name}=`)) {
            const cookieValue = cookie.substring(name.length + 1);
            return JSON.parse(decodeURIComponent(cookieValue));
          }
        }
        return null;
    };
      
    function deleteCookie(cookieName) {
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    useEffect(() => {
      client.on("connect", () => {
        console.log("Connected to Adafruit MQTT DP")
        client.subscribe(`${AIO_USERNAME}/feeds/temperature_sensor`);
        client.subscribe(`${AIO_USERNAME}/feeds/humility_sensor`);
        client.subscribe(`${AIO_USERNAME}/feeds/light_sensor`);
        client.subscribe(`${AIO_USERNAME}/feeds/FAN`);
        client.subscribe(`${AIO_USERNAME}/feeds/led_color`);
        client.subscribe(`${AIO_USERNAME}/feeds/auto_mode`);
      });
  
      client.on("message", (topic, message) => {
        console.log("Received message from topic DP: ", topic);
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
        } else if (topic === `${AIO_USERNAME}/feeds/FAN`) {
          console.log("HERE FAN", message.toString());
          setFan(message.toString());
        } else if (topic === `${AIO_USERNAME}/feeds/led_color`) {
          setHex(message.toString());
        } else if (topic === `${AIO_USERNAME}/feeds/auto_mode`) {
          setAutoMode(message.toString() === '0' ? false : true);
        }
      });
    }, []);

    useEffect(() => {
        if (toggleDarkMode) {
        document.body.classList.add('dark');
        } else {
        document.body.classList.remove('dark');
        }
    }, [toggleDarkMode]); 

    // hanlde Message popup
    const handleClick = (message, severity) => () => {
      setSnackPack((prev) => [...prev, { message, severity, key: new Date().getTime() }]);

      // TODO: Use message to send notification to server
    };



    return (
        <DataContext.Provider value={{hex, setHex, fan, setFan, autoMode, setAutoMode, toggleDarkMode, setToggleDarkMode, handleClick, deleteCookie, getCookie, setCookie, isLogin, setIsLogin, user, setUser, sensorData, setting, setSetting}}>
            {children}
            <ConsecutiveSnackbars snackPack={snackPack} setSnackPack={setSnackPack} messageInfo={messageInfo} setMessageInfo={setMessageInfo} handleClick={handleClick}/>
        </DataContext.Provider>
    );
};
