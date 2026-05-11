"use client";
import { useState, useEffect } from "react";
import styles from "./site.module.css";

export default function WeatherApp({ site }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState("London");

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Geocoding (City to Lat/Lon)
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`
      );
      const geoData = await geoRes.json();
      
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("City not found");
      }
      
      const { latitude, longitude, name, country } = geoData.results[0];

      // Step 2: Weather Data
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        name,
        country,
        current: weatherData.current,
        daily: weatherData.daily,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newCity = formData.get("city");
    if (newCity) {
      setCity(newCity);
      fetchWeather(newCity);
    }
  };

  const getWeatherIcon = (code) => {
    if (code === 0) return "☀️";
    if (code <= 3) return "🌤️";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    if (code <= 82) return "🌦️";
    if (code <= 99) return "⛈️";
    return "🌡️";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.icon}>{site.icon}</div>
        <div>
          <h1 className={styles.title}>{site.title}</h1>
          <p className={styles.description}>{site.description}</p>
        </div>
      </div>

      <div className={styles.card} style={{ maxWidth: "500px", margin: "0 auto" }}>
        <form onSubmit={handleSearch} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          <input
            name="city"
            type="text"
            placeholder="Enter city name..."
            className={styles.input}
            defaultValue={city}
          />
          <button type="submit" className={styles.button}>Search</button>
        </form>

        {loading ? (
          <div style={{ textAlign: "center", padding: "40px" }}>
            <div className={styles.spinner}></div>
            <p>Fetching local weather...</p>
          </div>
        ) : error ? (
          <div style={{ color: "#ef4444", textAlign: "center", padding: "20px" }}>
            <p>❌ {error}</p>
            <button onClick={() => fetchWeather(city)} className={styles.button} style={{ marginTop: "10px" }}>Retry</button>
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <h2 style={{ fontSize: "2rem", marginBottom: "5px" }}>{weather.name}, {weather.country}</h2>
            <div style={{ fontSize: "5rem", margin: "20px 0" }}>
              {getWeatherIcon(weather.current.weather_code)}
            </div>
            <div style={{ fontSize: "3.5rem", fontWeight: "bold", color: site.color }}>
              {Math.round(weather.current.temperature_2m)}°C
            </div>
            <p style={{ opacity: 0.7, marginBottom: "20px" }}>
              Feels like {Math.round(weather.current.apparent_temperature)}°C • Humidity {weather.current.relative_humidity_2m}%
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "10px", marginTop: "30px", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "20px" }}>
              {weather.daily.time.slice(1, 6).map((time, i) => (
                <div key={time} style={{ fontSize: "0.8rem" }}>
                  <div style={{ opacity: 0.6 }}>{new Date(time).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                  <div style={{ fontSize: "1.2rem", margin: "5px 0" }}>{getWeatherIcon(weather.daily.weather_code[i+1])}</div>
                  <div style={{ fontWeight: "bold" }}>{Math.round(weather.daily.temperature_2m_max[i+1])}°</div>
                  <div style={{ opacity: 0.5 }}>{Math.round(weather.daily.temperature_2m_min[i+1])}°</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
