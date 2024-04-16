import React, { useState, useEffect } from 'react';
import TempGraph from '../../components/TempGraph';
import LightGraph from '../../components/LightGraph';
import { getUser, getTempData } from '../../services/TableApi.service';

const Analytics = () => {
  const [lightData, setLightData] = useState([]);
  const [tempData, setTempData] = useState([]);

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
 

  return (
    <div className='w-full h-full'>
      <TempGraph realtimedata={tempData.result} />
      <LightGraph realtimedata={lightData.result} />
    </div>
  );
};

export default Analytics;