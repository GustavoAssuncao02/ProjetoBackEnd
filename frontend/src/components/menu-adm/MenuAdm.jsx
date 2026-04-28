import { Link } from 'react-router-dom'
import styles from './menuAdm.styles'

const menuItems = [
  { label: 'Variants', path: '/products/variant' },
  { label: 'Subcategories', path: '/subcategories-manager' },
  { label: 'Profile', path: '/profile' },
  { label: 'Products Manager', path: '/products' },
  { label: 'Categories', path: '/categories' },
  { label: 'Address', path: '/addresses' }
]

export default function MenuAdm() {
  return (
    <nav style={styles.nav} aria-label="Menu administrativo">
      <ul style={styles.list}>
        {menuItems.map((item) => (
          <li key={`${item.label}-${item.path}`}>
            <Link
              to={item.path}
              style={styles.link}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
