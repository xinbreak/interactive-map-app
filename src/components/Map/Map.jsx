import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import ZoomSidebar from '../ZoomSidebar/ZoomSidebar'
import ControlZoomButtons from '../UI/ControlZoomButtons'
import SeacrhBar from '../SearchBar/SearchBar'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

export default function Map({ deafualtCenter }) {
  const mapRef = useRef()
  const mapContainerRef = useRef()

  const [zoom, setZoom] = useState(11)
  const [center, setCenter] = useState(deafualtCenter)

  const incremnetZoom = () => {
    mapRef.current.flyTo({
      center: center,
      zoom: zoom + 1,
    })
  }

  const decremnetZoom = () => {
    mapRef.current.flyTo({
      center: center,
      zoom: zoom - 1,
    })
  }

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
    })

    mapRef.current.on('move', () => {
      const mapCenter = mapRef.current.getCenter()
      const mapZoom = mapRef.current.getZoom()

      setCenter([mapCenter.lng, mapCenter.lat])
      setZoom(mapZoom)
    })

    mapRef.current.addControl

    return () => mapRef.current.remove()
  }, [])

  return (
    <>
      <SeacrhBar />
      <ControlZoomButtons
        incremnetZoom={incremnetZoom}
        decremnetZoom={decremnetZoom}
      />
      <ZoomSidebar zoom={zoom} />
      <div
        id="map-container"
        ref={mapContainerRef}
        style={{ width: '100%', height: '100%' }}
      ></div>
    </>
  )
}
