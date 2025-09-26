import { useState, useEffect } from 'react'

export const useGeolocation = () => {
  const [locationInfo, setLocationInfo] = useState(null)
  const [locationError, setLocationError] = useState(null)

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (res) => {
        setLocationInfo({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        })
      },
      (err) => {
        setLocationError(err.message)
      }
    )
  }, [])

  return { locationError, locationInfo }
}
