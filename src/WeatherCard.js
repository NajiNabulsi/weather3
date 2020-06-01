import React, { useState, useEffect } from "react";
import Form from "./Form";
import CityInfo from "./CityInfo";

// use states
const WeatherCard = () => {
  const [
    data = [
      {
        id: null,
        city: undefined,
        country: undefined,
        main: undefined,
        temp_max: null,
        temp_min: null,
        loction: "",
      },
    ],
    setData,
  ] = useState([]);

  const [qurey, setQurey] = useState("Amsterdam");
  const [search, setSearch] = useState();
  const [isLoding, setIsLoding] = useState(false);
  const [hasErr, setHasErr] = useState(false);

  // fetch weather function
  const getWeather = async () => {
    setHasErr(false);
    setIsLoding(true);
    try {
      const apiCall = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${qurey}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      );

      const response = await apiCall.json();
      
      setData([
        ...data,
        {
          id: response.sys.id,
          city: `${response.name}, ${response.sys.country}`,
          main: response.weather[0].main,
          temp_max: response.main.temp_max,
          temp_min: response.main.temp_min,
          loction: `${response.coord.lat}, ${response.coord.lon}`,
        },
      ]);

      setIsLoding(false);
    } catch {
      setHasErr(true);
      setIsLoding(false);
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

  const deletHandle = (id) => {       
    const citiesLeft = data.filter((city) => city.id !== id);
    setData(citiesLeft);
  };

  return (
    <div>
      <h1>Hack Your Weather III</h1>
      <Form onSubmit={getSearch} onChange={getCityName} value={search} />
      {isLoding && <p className="loding">Please wait LODING....</p>}

      {hasErr && (
        <p className="err" role="alert">
          Please Enter correct City ...!
        </p>
      )}
      {[] &&
        data.map((item) => (
          <CityInfo
            val={item}
            key={item.city}
            id={item.id}
            onClick={()=> deletHandle(item.id)}
          />
        ))}
    </div>
  );
};

export default WeatherCard;
