import MainHeader from '../../components/home/MainHeader'
import InfoBar from '../../components/home/InfoBar'
import HeroBanner from '../../components/home/HeroBanner'
import ProductHighlights from '../../components/home/ProductHighlights'
import ProductCarousel from '../../components/product-carousel/ProductCarousel'
import SectionTitle from '../../components/home/SectionTitle'
import styles from '../../components/home/Home.Styles'
import homeSections from '../../config/HomeSections'

const sectionMap = {
  'main-header': <MainHeader />,
  'info-bar': <InfoBar />,
  'hero-banner': <HeroBanner />,
  'product-highlights': <ProductHighlights />,
  'product-carousel': (
    <div style={styles.homeCarousel}>
      <div style={styles.homeCarouselInner}>
        <ProductCarousel showHeader={false} />
      </div>
    </div>
  ),
  'location-title': <SectionTitle title="LOCALIZAÇÃO" />
}

export default function Home() {
  const orderedSections = [...homeSections]
    .filter((section) => section.visible)
    .sort((a, b) => a.order - b.order)

  return (
    <div style={styles.page}>
      {orderedSections.map((section) => (
        <div key={section.id} data-section-id={section.id}>
          {sectionMap[section.id]}
        </div>
      ))}
    </div>
  )
}
