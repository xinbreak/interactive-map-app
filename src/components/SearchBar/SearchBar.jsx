import React, { useState } from 'react'
import getPlaces from '../API/getPlaces'
import { categoryIcons } from '../../icons/iconsPOI'
import styles from './SearchBar.module.css'

export default function SearchBar({ onPlaceSelect }) {
  const [query, setQuery] = useState('')
  const [places, setPlaces] = useState([])
  const [placeVisibility, setPlaceVisibility] = useState(false)

  const handleSearchChange = async (e) => {
    const value = e.target.value
    setQuery(value)

    if (!value) {
      setPlaces([])
      setPlaceVisibility(false)
      return
    }

    try {
      const result = await getPlaces(value)
      setPlaces(result || [])
      setPlaceVisibility(true)
      console.log(result)
    } catch (error) {
      console.error('There was error fetching places: ', error)
    }
  }

  const handlePlaceClick = (place) => {
    setQuery(place.title)
    setPlaces([])
    setPlaceVisibility(false)
    onPlaceSelect([place.longitude, place.latitude], place)
  }

  return (
    <>
      <div className={styles.seacrhContainer}>
        <div className={styles.searhcBarContainer}>
          <input
            className={`${styles.searchBar} ${
              placeVisibility && places.length > 0 ? styles.active : ''
            }`}
            type="text"
            value={query}
            onChange={handleSearchChange}
            placeholder="Enter location..."
          />
          <button className={styles.loop}>
            <img src="/icons/loop.svg" alt="search" />
          </button>
        </div>

        {placeVisibility && places.length > 0 && (
          <ul className={styles.placesList}>
            {places.map((place) => {
              const matchedIcon = categoryIcons[place.category]

              if (!matchedIcon || !place.address?.includes('Минск')) return null // нет иконки → не выводим элемент

              return (
                <li
                  className={styles.placesListElement}
                  key={place.position}
                  onClick={() => handlePlaceClick(place)}
                >
                  <img
                    className={styles.categorieIcon}
                    src={matchedIcon}
                    alt={place.category || 'Место'}
                  />
                  <div className={styles.name}>
                    <h1 className={styles.placesListElementMain}>
                      {place.title}
                    </h1>
                    <p className={styles.adressText}>{place.address}</p>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </>
  )
}
