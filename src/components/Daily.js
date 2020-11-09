import React, { useState, useEffect } from 'react';

const Daily = ({
  data,
  day,
  monthName,
  date,
  clickHandler,
  id,
  clicked,
  setClicked,
}) => {
  const [maxTemperature, setMaxTemperature] = useState();
  const [lowTemperature, setLowTemperature] = useState();
  const [wIcon, setwIcon] = useState();
  const [classes, setClasses] = useState('daily-item');

  const findMaxTemp = () => {
    if (data) {
      let maxTemp = data[0].main.temp_max;

      for (let index = 0; index < data.length; index++) {
        let max = data[index].main.temp_max;
        if (maxTemp <= max) {
          maxTemp = max;
        }
      }
      setMaxTemperature(Math.round(maxTemp));
    }
  };

  const checkClicked = () => {
    if (id === clicked) {
      setClasses('daily-item active');
    } else {
      setClasses('daily-item');
    }
  };

  const findLowTemp = () => {
    if (data) {
      let lowTemp = data[0].main.temp_min;
      for (let index = 0; index < data.length; index++) {
        let low = data[index].main.temp_min;
        if (lowTemp >= low) {
          lowTemp = low;
        }
      }
      setLowTemperature(Math.round(lowTemp));
    }
  };

  const getIcon = () => {
    if (data.length > 1) {
      const n = Math.round(data.length / 2 - 1);
      const icon = data[n].weather[0].icon;
      setwIcon(icon);
    } else {
      const icon = data[0].weather[0].icon;
      setwIcon(icon);
    }
  };

  useEffect(() => {
    findMaxTemp();
    findLowTemp();
    getIcon();
    setClicked(0);
  }, [data]);

  useEffect(() => {
    checkClicked();
  }, [clicked]);

  return (
    <>
      <div
        className={classes}
        onClick={() => {
          clickHandler(id);
        }}
      >
        <div className="row">
          <div className="headerDaily">
            <img
              className="dailyIcon"
              src={`http://openweathermap.org/img/wn/${wIcon}@2x.png`}
              alt="weather"
            ></img>
            <h4 className="day">{day}</h4>
          </div>
          <h4>{maxTemperature}°C</h4>
        </div>
        <div className="row">
          <p>
            {date}. {monthName}
          </p>
          <p>{lowTemperature}°C</p>
        </div>
      </div>
    </>
  );
};

export default Daily;
