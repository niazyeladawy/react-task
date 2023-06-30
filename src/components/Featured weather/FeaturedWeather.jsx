import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './FeaturedWeather.module.css'
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const FeaturedWeather = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {

        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        getWeatherData(latitude, longitude);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        const getWeatherData = async (latitude, longitude) => {
            const API_KEY = import.meta.env.VITE_API_KEY;
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;


            try {
                const response = await axios.get(apiUrl);

                setWeatherData(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        getLocation();

    }, []);

    return (
        <div className={styles.cont}>
            {weatherData ? (
                <Link to='/weather'>
                    <p className={styles.city}>{weatherData.name}, {weatherData.sys.country}</p>
                    <p className={styles.temp}>{weatherData.main.temp}°C</p>
                    <p>Weather: {weatherData.weather[0].description}</p>
                    <p>Humidity: {weatherData.main.humidity}%</p>
                    <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                </Link>
            ) : (
                <CircularProgress />
            )}
        </div>
    );
}

export default FeaturedWeather