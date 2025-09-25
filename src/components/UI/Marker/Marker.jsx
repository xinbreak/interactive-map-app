import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import styles from './Marker.module.css'
import { createPortal } from 'react-dom'

const Marker = ({ map, coordinates }) => {
  const markerRef = useRef(null)
  const contentRef = useRef(document.createElement('div'))

  useEffect(() => {
    if (!map || !coordinates || coordinates.length !== 2) return

    const [lng, lat] = coordinates
    if (isNaN(lng) || isNaN(lat)) return

    // Удаляем старый маркер
    if (markerRef.current) {
      markerRef.current.remove()
    }

    // Создаём новый маркер
    markerRef.current = new mapboxgl.Marker(contentRef.current)
      .setLngLat([lng, lat])
      .addTo(map)

    return () => {
      if (markerRef.current) markerRef.current.remove()
    }
  }, [map, coordinates])

  return createPortal(
    <div>
      <img className={styles.selectedMarker} src="/iconsPOI/default.svg" />
    </div>,
    contentRef.current
  )
}

export default Marker
