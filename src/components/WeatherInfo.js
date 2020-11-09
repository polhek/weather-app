import React, { useState } from 'react';
import Daily from './Daily';
import Hourly from './Hourly';

const WeatherInfo = ({ daily, allData }) => {
  const [clicked, setClicked] = useState(0);
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
  ];
  let dd;
  let mm;
  let date;
  const getCurrentDate = () => {
    let today = new Date();
    dd = today.getDay();
    mm = today.getMonth();
    date = today.getDate();
  };
  getCurrentDate();
  let hourlyData;
  const getHourlyData = () => {
    hourlyData = daily[date + clicked];
  };

  const clickHandler = (id) => {
    setClicked(id);
  };

  const DailyWeather = () => {
    if (daily) {
      getHourlyData();
      return Object.keys(daily).map((key, index) => {
        return (
          <Daily
            clickHandler={clickHandler}
            data={daily[key]}
            key={index}
            id={index}
            day={days[dd + index]}
            monthName={monthNames[mm]}
            date={date + index}
            clicked={clicked}
            setClicked={setClicked}
          />
        );
      });
    }
  };

  return (
    <div className="dailyContainer">
      <div className="daily">
        <div className="daily_Weather">{DailyWeather()}</div>
      </div>
      <Hourly hourlyData={hourlyData} />
    </div>
  );
};

export default WeatherInfo;
