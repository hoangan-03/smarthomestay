import React from 'react'
import TempGraph from '../../components/TempGraph'
import LightGraph from '../../components/LightGraph';
const Analytics = () => {
  return (
    <div className='w-screen h-screen'>
      <TempGraph />
      <LightGraph />
    </div>
  )
}

export default Analytics;