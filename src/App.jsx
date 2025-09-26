import Map from './components/Map/Map'
import { useGeolocation } from './components/API/useGeolocation'
import './App.css'
import { useEffect, useState } from 'react'

function App() {
  const [defaultCenter, setDefaultCenter] = useState([27.5619, 53.9023])
  const { locationInfo, locationError } = useGeolocation()

  console.log(defaultCenter)

  useEffect(() => {
    if (locationInfo && !locationError) {
      setDefaultCenter([locationInfo.longitude, locationInfo.latitude])
    }
  }, [locationInfo, locationError])

  return (
    <>
      <Map deafaultCenter={defaultCenter} />
    </>
  )
}

export default App
