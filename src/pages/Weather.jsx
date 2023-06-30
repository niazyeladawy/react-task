import { CircularProgress, Container, Grid } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
const API_KEY = import.meta.env.VITE_API_KEY;

import styles from './Weather.module.css'

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        const getLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherData(latitude, longitude);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            } else {
                console.error('Geolocation is not supported by this browser.');
            }
        };

        getLocation()


    }, []);

    const fetchWeatherData = async (lat, lon) => {

        try {
            const { data } = await axios.get(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely&appid=${API_KEY}&units=metric`
            );

            setWeatherData(data);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    if (!weatherData) {
        return <div style={{ display: "flex", justifyContent: "center" }}><CircularProgress size={100} /></div>;
    }

    const { hourly } = weatherData;



    return (
        <section className={styles.section}>
            <Container maxWidth="xl">
                <h2>Today's Weather in next Hours:</h2>
                <Grid container spacing={3} className={styles.hours}>
                    {hourly?.slice(0, 24).map((hour) => (
                        <Grid item xs={12} sm={12} md={6} lg={3} xl={2} key={hour.dt}>
                            <div className={styles.hour_item}>
                                <img src={`http://openweathermap.org/img/w/${hour.weather[0].icon}.png`} alt="" />
                                <p className={styles.temp}>{new Date(hour.dt * 1000).toLocaleTimeString()}:  <span >{hour.temp}°C</span></p>

                            </div>
                        </Grid>
                    ))}
                </Grid>
                <h2>Next 5 Days:</h2>
                <Grid container spacing={3} className={styles.daily}>
                    {weatherData?.daily?.slice(0, 5).map((day) => (
                        <Grid item xs={12} sm={12} md={6} lg={3} xl={2} key={day.dt}>
                            <div className={styles.daily_item}>
                                <h3>{new Date(day.dt * 1000).toLocaleDateString()}:</h3>
                                <img src={`http://openweathermap.org/img/w/${day.weather[0].icon}.png`} alt="" />
                                <span >{day.temp.day}°C</span>
                            </div>

                        </Grid>
                    ))}
                </Grid>
            </Container>
        </section>
    );

}

export default Weather