import styles from './ZoomSidebar.module.css'

export default function ZoomSidebar({ zoom }) {
  return (
    <div className={styles.zoomSidebarContainer}>
      <h1 className={styles.title}>{zoom.toFixed(0)}x</h1>
    </div>
  )
}
