import React, { useEffect, useRef } from 'react'

const YandexMap = () => {
  const mapContainerRef = useRef(null)

  useEffect(() => {
    if (typeof window.ymaps !== 'undefined') {
      window.ymaps.ready(() => {
        const myMap = new window.ymaps.Map(mapContainerRef.current, {
          center: [53.90057873406576, 27.55875380838331], // Координаты центра карты (Москва)
          zoom: 12, // Начальный уровень масштаба
        })

        // Здесь вы можете добавить метки, маршруты и другие элементы
      })
    }
  }, [])

  return (
    <div
      ref={mapContainerRef}
      style={{ width: '100%', height: '100vh' }} // Задайте нужные размеры
    />
  )
}

export default YandexMap
