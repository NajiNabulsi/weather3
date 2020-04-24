import React, { useState, useEffect } from "react";

const WeatherCard = () => {
  const [val, setVal] = useState([]);
  const [qurey, setQurey] = useState("Nijmegen");
  const [search, setSearch] = useState();
  const [error, setError] = useState(false);

  // fetch weather function
  const getWeather = async () => {
    try {
      const apiCall = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${qurey}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      const response = await apiCall.json();

      setVal([
        ...val,
        {
          id: response.sys.id,
          city: `${response.name}, ${response.sys.country}`,
          main: response.weather[0].main,
          temp_max: response.main.temp_max,
          temp_min: response.main.temp_min,
          location: `${response.sys.sunrise}, ${response.sys.sunset}`,
        },
      ]);
    } catch {
      setError(true);
    }
  };

  useEffect(() => {
    getWeather();
  }, [qurey]);

  // handles
  const getSearch = (e) => {
    e.preventDefault();
    setQurey(search);
    setSearch("");
  };

  const getCityName = (e) => {
    setSearch(e.target.value);
  };

  const deleteCity = (id) => {
    const citiesLeft = val.filter((city) => city.id !== id);
    setVal(citiesLeft);
  };

  return (
    <div>
      <div className="form">
        <h1>Weather</h1>
        <form>
          <div className="search">
            <input
              type="text"
              className="input"
              value={search}
              placeholder="please enter a city name"
              name="city"
              autoComplete="off"
              onChange={getCityName}
            />

            {search && (
              <button className="btn" onClick={getSearch}>
                Get Weather
              </button>
            )}
          </div>
        </form>
      </div>
      {!val && <div>please enter City</div>}

      {[] &&
        val.map((ele) => (
          <div className="weCard" key={ele.city} id={ele.id}>
            <button className="img" onClick={() => deleteCity(ele.id)}>
              x
            </button>
            <h1>{ele.city}</h1>
            <h2>{ele.main}</h2>
            <h3>min temp: {ele.temp_min}</h3>
            <h3>max temp: {ele.temp_max}</h3>
            <h3>location: {ele.location}</h3>
          </div>
        ))}

      {error && (
        <div className="err" role="alert">
          Please Enter City ...!
        </div>
      )}
    </div>
  );
};

export default WeatherCard;
