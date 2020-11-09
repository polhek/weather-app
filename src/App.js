import './App.css';
import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import WeatherInfo from './components/WeatherInfo';

function App() {
  const [search, setSearch] = useState('Ljubljana');
  const [daily, setDaily] = useState();
  const [allData, setAll] = useState();

  const dateBins = {};
  const nBins = 6;
  const apiKey = 'af533ff5de5f96b4a9d160f95a8c26ae';
  // function to group by day, as I have 3hour timestamps of weather
  const groupByDate = async () => {
    const today = new Date();
    const day = 60 * 60 * 24 * 1000;
    for (let i = 0; i < nBins; i++) {
      const date = new Date(today.getTime() + i * day);
      dateBins[date.getDate()] = [];
    }
  };

  useEffect(() => {
    getWeather();
  }, [search]);

  const getWeather = async () => {
    groupByDate();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${search}&units=metric&appid=${apiKey}`,
        { mode: 'cors' }
      );
      if (response.status >= 400 && response.status < 600) {
        throw Error('Coudnt find the city');
      }
      const find = await response.json();

      const reports = find.list;

      setterData(find);
      for (const report of reports) {
        const reportDate = new Date(report.dt * 1000).getDate();
        dateBins[reportDate].push(report);
      }
      setterDaily(dateBins);
    } catch (error) {
      alert(error);
    }
  };

  const setterData = (all) => {
    setAll(all);
  };
  const setterDaily = (daily) => {
    setDaily(daily);
  };

  return (
    <div className="App">
      <div className="container">
        <Search
          setSearch={setSearch}
          allData={allData}
          search={search}
          daily={daily}
        />
        <WeatherInfo allData={allData} daily={daily} />
      </div>
    </div>
  );
}

export default App;
