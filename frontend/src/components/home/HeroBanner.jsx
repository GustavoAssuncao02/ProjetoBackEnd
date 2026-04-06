import styles from './Home.Styles'
import heroImage from '../../assets/images/hero-banner.png'

export default function HeroBanner() {
  return (
    <section style={styles.hero}>
      <div style={styles.heroLeft}>
        <div style={styles.heroText}>
          {`10% OFF\nEM\nROUPAS\nOVER\nSIZE`}
        </div>
      </div>

      <div style={styles.heroRight}>
        <img src={heroImage} alt="Hero Banner" style={styles.heroImage} />
      </div>
    </section>
  )
}