import styles from './ControlZoomButtons.module.css'

export default function ControlZoomButtons({ incremnetZoom, decremnetZoom }) {
  return (
    <div className={styles.controlButtons}>
      <button className={styles.incrementButton} onClick={incremnetZoom}>
        +
      </button>
      <button className={styles.decrementButton} onClick={decremnetZoom}>
        −
      </button>
    </div>
  )
}
