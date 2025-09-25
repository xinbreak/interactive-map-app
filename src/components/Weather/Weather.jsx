import { useEffect, useState } from 'react'
import { allWeatherIcons } from '../../icons/iconsWeather'
import styles from './Weather.module.css'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY

export default function Weather({ coords }) {
  const [weatherData, setWeatherData] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords[1]}&lon=${coords[0]}&units=metric&appid=${API_KEY}&lang=ru`

        const response = await fetch(url)
        const data = await response.json()

        const icon =
          allWeatherIcons[data.weather[0].icon] || '/iconsWeather/ClearSky.svg'

        setWeatherData({
          temperature: Math.floor(data.main.temp),
          location: data.name,
          icon: icon,
        })
      } catch (error) {
        console.error('Ошибка при получении погоды:', error)
      }
    }

    fetchWeather()
  }, [])

  if (!weatherData) {
    return <div className={styles.weatherWidget}>Loading...</div>
  }

  return (
    <div className={styles.weatherWidget}>
      <img src={weatherData.icon} />
      <div className={styles.temperatureAndCity}>
        <h2 className={styles.deg}>
          {weatherData.temperature}
          <img src="/iconsWeather/deg.svg" className={styles.degIcon} />
        </h2>
        <h3 className={styles.location}>{weatherData.location}</h3>
      </div>
    </div>
  )
}
