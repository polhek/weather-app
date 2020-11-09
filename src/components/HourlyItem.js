import React from 'react';

const HourlyItem = ({ hour }) => {
  let time;
  const formatTime = () => {
    let timeFormated = hour.dt_txt.split(' ').pop();
    time = timeFormated.substring(0, timeFormated.length - 3);
  };
  formatTime();
  return (
    <div className="hour">
      <h4>{time}</h4>
      <div>
        <img
          alt="icon"
          className="hourlyIcon"
          src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`}
        />
        <h4>{Math.round(hour.main.temp)}°C</h4>
      </div>
      <h4>RealFeel®: {Math.round(hour.main.feels_like)}°C </h4>
      <h4>{hour.weather[0].main}</h4>
      <h4>Wind speed: {Math.round(hour.wind.speed * 3.6)} km/h</h4>
    </div>
  );
};

export default HourlyItem;
