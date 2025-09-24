import React, { useState } from 'react'
import getPlaces from '../API/getPlaces'
import styles from './SearchBar.module.css'

export default function SearchBar() {
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
      setPlaces(result)
      setPlaceVisibility(true)
      console.log(result)
    } catch (error) {
      console.error('There was error fetching places: ', error)
    }
  }

  const handlePlaceClick = (place) => {
    setQuery(place.properties.name)
    setPlaces([])
    setPlaceVisibility(false)
  }

  return (
    <div className={styles.seacrhContainer}>
      <input
        className={styles.searchBar}
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Enter location"
      />
      <button className={styles.loop}>
        <img src="/icons/search.svg" />
      </button>
      {placeVisibility && places.length > 0 && (
        <ul className={styles.placesList}>
          {places.map((place) => (
            <li
              className={styles.placesListElement}
              key={place.id}
              onClick={() => handlePlaceClick(place)}
            >
              {place.properties.name}
              <p className={styles.adressText}>
                {place.properties.description}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
