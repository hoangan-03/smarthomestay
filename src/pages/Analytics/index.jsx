import React, { useState, useEffect } from 'react';
import TempGraph from '../../components/TempGraph';
import LightGraph from '../../components/LightGraph';
import { getUser, getTempData } from '../../services/TableApi.service';
import { ButtonGroup, Button } from '@mui/material';
import HumidGraph from '../../components/HumidGraph';
const Analytics = () => {
  const [lightData, setLightData] = useState([]);
  const [tempData, setTempData] = useState([]);
  const [isTemp, setIsTemp] = useState(true);
  const [isLight, setIsLight] = useState(false);
  const [isHumid, setIsHumid] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const lightRes = await getUser();
        console.log("lightData", lightRes);
        setLightData(lightRes);
  
        // Add a delay before fetching the second data
        setTimeout(async () => {
          const tempRes = await getTempData();
          console.log("tempData", tempRes);
          setTempData(tempRes);
        },300); // Delay of 1 second
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
      <ButtonGroup variant="outlined" aria-label="Basic button group" sx={{mb: "30px"}}>
        <Button variant={isTemp ? "contained" : "outlined"} onClick={() => handleButtonClick("temp")}>Temp</Button>
        <Button variant={isLight ? "contained" : "outlined"} onClick={() => handleButtonClick("light")}>Light</Button>
        <Button variant={isHumid ? "contained" : "outlined"} onClick={() => handleButtonClick("humid")}>Humid</Button>
      </ButtonGroup>
      {isTemp && <TempGraph realtimedata={tempData.result} />}
      {isLight && <LightGraph realtimedata={lightData.result} />}
      {isHumid && <HumidGraph realtimedata={tempData.result} />}
      
    </div>
  );
};

export default Analytics;