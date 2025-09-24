import Map from './components/Map/Map'
import './App.css'
import { useState } from 'react'

function App() {
  const [defaultCenter] = useState([27.5619, 53.9023])

  return (
    <>
      <Map deafualtCenter={defaultCenter} />
    </>
  )
}

export default App
