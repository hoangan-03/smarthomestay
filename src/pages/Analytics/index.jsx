import React, { useState, useEffect, useCallback } from 'react';
import TempGraph from '../../components/TempGraph';
import LightGraph from '../../components/LightGraph';
import { getUser } from '../../services/TableApi.service';

const Analytics = () => {
  const [data, setData] = useState([]);

  const refreshData = useCallback(() => {
    getUser().then((resData) => setData(resData));
  }, []);

  useEffect(() => {
    refreshData();
  }, [refreshData]);

  console.log("data" , data.result);

  return (
    <div className='w-screen h-screen'>
      <TempGraph realtimedata={data.result} />
      <LightGraph realtimedata={data.result} />
    </div>
  );
};

export default Analytics;