import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';

const Search = ({ setSearch, search, daily, allData }) => {
  const [location, setLocation] = useState();
  const [temperature, setTemperature] = useState();
  const [weatherIcon, setWeatherIcon] = useState('');

  const searchWeather = (e) => {
    e.preventDefault();
    setSearch(location);
  };

  const getCurrentWeather = () => {
    if (daily) {
      const obj = daily;
      const today = new Date();
      let dayC = new Date(today.getTime());
      let cDate = dayC.getDate();

      let cTemp = Math.round(obj[cDate][0].main.temp);
      let wIcon = obj[cDate][0].weather[0].icon;

      setTemperature(cTemp);
      setWeatherIcon(wIcon);
    }
  };

  useEffect(() => {
    getCurrentWeather();
  }, [daily, allData]);

  return (
    <div className="search">
      <div className="current-city">
        <img
          className="currentWeatherIcon"
          src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt="weather"
        ></img>
        <h4>
          {temperature}°C {search}
        </h4>
      </div>
      <div className="searchBox">
        <form onSubmit={(e) => searchWeather(e)}>
          <input
            className="searchInput"
            type="text"
            placeholder="Search location.."
            name="search"
            onChange={(e) => setLocation(e.target.value)}
          ></input>
          <button className="searchButton" type="submit">
            <FaSearch className="sIcon" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
