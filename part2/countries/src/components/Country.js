import React, { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherStatics from './WeatherStatics'

const Country = ({ country }) => {
    const [weatherData, setWeatherData] = useState(
        {
            current : {
                temperature : null,
                weather_icons : [

                ],
                wind_speed : null,
                wind_dir : null,
            }
        }
    )

    const hook = () => {
      axios
        .get('http://api.weatherstack.com/current', { 'params' : {
            access_key : process.env.REACT_APP_WATHER_STACK_API_KEY,
            query: country.name.common
        }})
        .then(response => {
            setWeatherData(response.data)
        })
    }
  
    useEffect(hook, [])
  
    return (
        <div styles="margin: 20px;"> 
            <h1>{ country.name ? country.name.common : "" }</h1>
            <p>capital { country.capital }</p>
            <p>population { country.population }</p>
            <h2> Languages </h2>
            <ul> {Object.entries(country.languages).map(([k, v]) => <li key={k}>{v}</li>)} </ul>
            <div>
                <img src={Object.values(country.flags)[0]} width="20%" height="20%" styles="margin-bottom: 10px"></img>
            </div>
            <WeatherStatics country={country} data={weatherData}></WeatherStatics>
        </div>
    )
} 
export default Country

                