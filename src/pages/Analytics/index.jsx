import React, { useState, useEffect } from 'react';
import TempGraph from '../../components/TempGraph';
import LightGraph from '../../components/LightGraph';
import { getLightData, getTempData, getHumidityData } from '../../services/TableApi.service';
import { ButtonGroup, Button } from '@mui/material';
import HumidGraph from '../../components/HumidGraph';
import { useData } from '../../components/DataProvider';
import { useNavigate } from 'react-router-dom';
const Analytics = () => {
  const [lightData, setLightData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [humidityData, setHumidityData] = useState([]);
  const [isTemp, setIsTemp] = useState(true);
  const [isLight, setIsLight] = useState(false);
  const [isHumid, setIsHumid] = useState(false);
  const { toggleDarkMode, getCookie } = useData();
  const navigate = useNavigate();


  useEffect(() => {
    const user = getCookie('cookieUser');
    if (!user) {
      navigate('/auth');
    }
  }, [navigate, getCookie]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lightRes = await getLightData();
        console.log("lightData", lightRes);
        setLightData(lightRes);
        setTimeout(async () => {
          const tempRes = await getTempData();
          console.log("tempData", tempRes);
          setTempData(tempRes);
          const humidityRes = await getHumidityData();
          console.log("humidityData", humidityRes);
          setHumidityData(humidityRes);
        }, 300);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  const handleButtonClick = (type) => {
    if (type === "temp") {
      setIsTemp(true);
      setIsLight(false);
      setIsHumid(false);
    } else if (type === "light") {
      setIsTemp(false);
      setIsLight(true);
      setIsHumid(false);
    } else {
      setIsTemp(false);
      setIsLight(false);
      setIsHumid(true);
    }
  }
  return (
    <div className='w-full h-[full]'>
      <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{ mb: "30px" }}>
        <Button variant={isTemp ? "contained" : "outlined"} onClick={() => handleButtonClick("temp")}>Temp</Button>
        <Button variant={isLight ? "contained" : "outlined"} onClick={() => handleButtonClick("light")}>Light</Button>
        <Button variant={isHumid ? "contained" : "outlined"} onClick={() => handleButtonClick("humid")}>Humid</Button>
      </ButtonGroup>
      {isTemp && <TempGraph realtimedata={tempData} toggleDarkMode={toggleDarkMode} />}
      {isLight && <LightGraph realtimedata={lightData} toggleDarkMode={toggleDarkMode} />}
      {isHumid && <HumidGraph realtimedata={humidityData} toggleDarkMode={toggleDarkMode} />}

    </div>
  );
};

export default Analytics;