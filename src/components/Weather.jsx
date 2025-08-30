import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

const Weather = () => {
   
    const inputRef= useRef(); //useRef for storing the city name everytime the user enters it into the input search box
    
    //creating state variable to store the weather data from the API for dynamic weather forecast
  const [weatherData, setWeatherData]= useState(false);

  const allIcons= {
    "01d" : clear_icon,
    "01n" : clear_icon,
    "02d" : cloud_icon,
    "02n" : cloud_icon,
    "03d" : cloud_icon,
    "03n" : cloud_icon,
    "04d" : drizzle_icon,
    "04n" : drizzle_icon,
    "09d" : rain_icon,
    "09n" : rain_icon,
    "10d" : rain_icon,
    "10n" : rain_icon,
    "13d" : snow_icon,
    "13n" : snow_icon
  }

  const search = async (city)=>{ //call this function whenever it gets loaded
    if(city == ""){
        alert("Enter City Name!")
        return; // exits the program execution here
    }
    try{
        const url= `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}` ;

        const response = await fetch(url); //fetch url
        const data = await response.json(); //convert the response using json method

        if(!response.ok){
            alert(data.message);
            return;
        }

        console.log(data);
        const icon= allIcons[data.weather[0].icon] || clear_icon;
        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: data.main.temp.toFixed(1), // returns temp till 1 decimal place as a string
            location: data.name,
            icon: icon
        });//storing the weather data in an object which is then stored in setWeatherData
    } catch (error) {
        setWeatherData(false);
        console.error("Error in fetching weather data!")
    }
  }

  useEffect(()=>{
    search("hyderabad");
  }, [])
  
    return (
    <div className='weather'>
        <div className='search-bar'>
            <input ref={inputRef} type="text" placeholder='Search City' onKeyDown={(e)=> {
                if(e.key == "Enter"){search(inputRef.current.value)}
            }}/>
            <i className="ri-search-line" onClick={()=> {search(inputRef.current.value)}}></i>
        </div>
        {weatherData ? <><img src={weatherData.icon} alt="" className='weather-icon'/>
        <p className='temperature'>{weatherData.temperature}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} alt="" />
                <div>
                    <p>{weatherData.humidity}%</p>
                    <span>Humidity</span>
                </div>
            </div>
            <div className="col">
                <img src={wind_icon} alt="" />
                <div>
                    <p>{weatherData.windSpeed} m/s</p>
                    <span>Wind Speed</span>
                </div>
            </div>
        </div></> : <></>}
    </div>
  )
}

export default Weather