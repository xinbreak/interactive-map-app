import Map from './components/Map/Map'
import ZoomSidebar from './components/ZoomSidebar/ZoomSidebar'
import './App.css'
import { useState } from 'react'

const defaultCenter = [27.5619, 53.9023]

function App() {
  return (
    <>
      <Map center={defaultCenter} />
    </>
  )
}

export default App
