import { useEffect } from 'react'
import WantToGoButton from '../UI/WantToGoButton/WantToGoButton'
import styles from './Info.module.css'

export default function Info({ place }) {
  useEffect(() => {
    if (place) {
      console.log('place появился:', place)
    }
  }, [place])

  if (!place) {
    return null // пока place нет — ничего не рендерим
  }

  return (
    <div className={styles.container}>
      <div>
        <img src="/Images/img.jpg" alt="image" className={styles.placeImage} />
        <div className={styles.placeInfo}>
          <div className={styles.title}>
            <h1>{place.title}</h1>
            <p className={styles.rating}>
              4.5
              <img src="/icons/star.svg" className={styles.ratingStar} />
            </p>
          </div>
          <div className={styles.mainInfo}>
            <div className={styles.info}>
              <img src="/icons/category.svg" className={styles.infoIcon} />
              <p className={styles.infoText}>{place.category}</p>
            </div>
            <div className={styles.info}>
              <img src="/icons/clock.svg" className={styles.infoIcon} />
              <p className={styles.infoText}>10:00-20:00</p>
            </div>
            <div className={styles.info}>
              <img src="/icons/default.svg" className={styles.infoIcon} />
              <p className={styles.infoText}>{place.address}</p>
            </div>
          </div>
        </div>
      </div>
      <WantToGoButton />
    </div>
  )
}
