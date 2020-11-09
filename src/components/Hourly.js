import React from 'react';
import HourlyItem from './HourlyItem';

const Hourly = ({ hourlyData }) => {
  const hourlyFunction = () => {
    if (hourlyData) {
      return hourlyData.map((hour) => {
        return <HourlyItem hour={hour} key={hour.dt} />;
      });
    }
  };
  return <div className="hourly">{hourlyFunction()}</div>;
};

export default Hourly;
