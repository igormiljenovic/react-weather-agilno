import './App.css';
import Gradovi from './gradovi.json'
import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import ApiChart from './components/ApiChart'

function App(response) {

  const [searchTerm, setSearchTerm] = useState('');

  const onSearch = (searchTerm) => {
    setSearchTerm(searchTerm)
  }

  const [favorite, setFavorite] = useState([]);

  const addToFavorite = city => {
    if (!favorite.includes(city)) setFavorite(favorite.concat(city));
    console.log(city);
  };

  const removeFavorite = city => {
    let index = favorite.indexOf(city);
    console.log(index);
    let temp = [...favorite.slice(0, index), ...favorite.slice(index + 1)];
    setFavorite(temp);
    console.log(temp);
  };

  let findfavorite = Gradovi.filter(val => favorite.includes(val.city));

  let grad = Gradovi.filter(val => searchTerm.includes(val.city));

  const [weatherData, setWeatherData] = useState([{}]);

  const getWeather = (event, city) => {
    var code = event.keyCode || event.which;
    if (code === "13") {
      fetch('https://api.open-meteo.com/v1/forecast?latitude=' + grad.map(val => {
        return (val.lat)}) + '&longitude=' + grad.map(val => {return(val.lng)}) + '&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,weathercode,pressure_msl,surface_pressure,cloudcover,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm').then(
       response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          console.log(weatherData)
        }
      )
    }
    else {
      let index = findfavorite.indexOf(city);
      let favsClick = findfavorite.slice(index);
      fetch('https://api.open-meteo.com/v1/forecast?latitude=' + favsClick.map(val => {
        return (val.lat)}) + '&longitude=' + favsClick.map(val => {return(val.lng)}) + '&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,weathercode,pressure_msl,surface_pressure,cloudcover,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm').then(
       response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          console.log(weatherData)
        }
      )
    }
  }

    const getWeatherOnClick = (e, val) => {
      fetch('https://api.open-meteo.com/v1/forecast?latitude=' + val.lat + '&longitude=' + val.lng + '&hourly=temperature_2m,relativehumidity_2m,dewpoint_2m,apparent_temperature,weathercode,pressure_msl,surface_pressure,cloudcover,windspeed_10m,windspeed_80m,windspeed_120m,windspeed_180m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm,soil_temperature_54cm').then(
       response => response.json()
      ).then(
        data => {
          setWeatherData(data)
          console.log(weatherData)

        }
      )
  }


  return (
    <div className="App">
      <div className="search">
        <input
        type="text"
        className="searchTerm"
        placeholder="Pretrazi gradove u HR"
        onChange={event => {setSearchTerm(event.target.value)}}
        value={searchTerm}
        onKeyPress={getWeather}
        />

      </div>
      <div className="search-res">
      {Gradovi.filter((val) => {
        if (searchTerm === "") {
          return val
        } else if (val.city.toLowerCase().includes(searchTerm.toLowerCase())) {
          return val
        }
      }).slice(0, 5)
      .map((val, key) => {
        return <ul className="Lista" key={key}>
                <input readOnly value={val.city} onClick={((e) => getWeatherOnClick(e, val))} className="gradovi"/>
                <button  onClick={() => addToFavorite(val.city)}>
                <FontAwesomeIcon icon={faStar}/>
                </button>
               </ul>
      })}
      </div>
      <div className="favorite_list">
        <h2>Favorites</h2>
          {findfavorite.map(val => {
            return (
              <div key={val.city} className="favs">
              <h4 className=""><input readOnly value={val.city} onClick={((e) => getWeatherOnClick(e, val))} className="gradovi"/></h4>

              <button onClick={() => removeFavorite(val.city)}>
              remove favorite
              </button>
              </div>
            );
          })}
          </div>
          <div className="prognoza">
            <p>{weatherData.longitude}</p>
            <p>{weatherData.latitude}</p>
            <p>{weatherData.elevation}</p>
          </div>
          <ApiChart/>
    </div>
  );
}

export default App;
