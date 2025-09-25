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
    setQuery(place.properties.name)
    setPlaces([])
    setPlaceVisibility(false)

    if (onPlaceSelect) {
      onPlaceSelect(place.geometry.coordinates)
    }
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
              const matchedCategory =
                place.properties.CompanyMetaData?.Categories?.find(
                  (cat) => categoryIcons[cat.class]
                )

              if (!matchedCategory) return null

              return (
                <li
                  className={styles.placesListElement}
                  key={place.properties.uri}
                  onClick={() => handlePlaceClick(place)}
                >
                  <img
                    className={styles.categorieIcon}
                    src={categoryIcons[matchedCategory.class]}
                  />
                  <div className={styles.name}>
                    <h1 className={styles.placesListElementMain}>
                      {place.properties.name}
                    </h1>
                    <p className={styles.adressText}>
                      {place.properties.description}
                    </p>
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
