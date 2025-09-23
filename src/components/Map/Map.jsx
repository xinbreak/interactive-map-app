import React, { useRef, useEffect } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY

export default function Map({ center }) {
  const mapRef = useRef(null)

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapRef.current,
      center: center,
      zoom: 11,
    })
    return () => map.remove()
  }, [])

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}
