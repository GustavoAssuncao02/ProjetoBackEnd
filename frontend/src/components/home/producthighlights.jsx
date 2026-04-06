import styles from './Home.Styles'
import jaquetaImg from '../../assets/images/jaqueta.jpg'
import femininaImg from '../../assets/images/feminina.jpg'
import calcadoImg from '../../assets/images/calcado.jpg'

const items = [
  {
    id: 'windbreakers',
    title: 'Jaquetas corta vento',
    image: jaquetaImg
  },
  {
    id: 'women-fashion',
    title: 'Moda Feminina',
    image: femininaImg
  },
  {
    id: 'shoes',
    title: 'Calçados',
    image: calcadoImg
  }
]

export default function ProductHighlights() {
  return (
    <section style={styles.highlights}>
      {items.map((item) => (
        <div key={item.id} style={styles.card}>
          <img src={item.image} alt={item.title} style={styles.cardImage} />
          <div style={styles.cardTitle}>{item.title}</div>
        </div>
      ))}
    </section>
  )
}