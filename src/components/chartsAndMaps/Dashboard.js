// Dashboard.js
import React from 'react';
import LineGraph from './LineGraph';
import Map from './Map';

const Dashboard = () => {
  return (
    <div className=''>
      <h1 className='text-center p-5 font-bold text-2xl'>COVID-19 Dashboard</h1>
      <div>
        <h2 className='text-center font-medium'>Worldwide Cases Fluctuations</h2>
        <LineGraph />
      </div>
      <div className='p-8 mt-8'>
        <h2 className='mb-4 font-medium'>Country-specific Data</h2>
        <Map />
      </div>
    </div>
  );
};

export default Dashboard;
