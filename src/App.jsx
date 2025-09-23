import Map from './components/Map/Map'
import './App.css'

const defaultCenter = [27.5619, 53.9023]

function App() {
  return (
    <>
      <Map center={defaultCenter} />
    </>
  )
}

export default App
