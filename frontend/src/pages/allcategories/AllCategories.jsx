import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import MainHeader from '../../components/home/MainHeader'
import styles from './allCategories.styles'

function getProductCategoryId(product) {
  return String(product.category_id || product.categories?.id || '')
}

export default function AllCategories() {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadCatalog() {
      try {
        setLoading(true)
        setMessage('')

        const [categoriesResponse, productsResponse] = await Promise.all([
          fetch('http://localhost:3000/categories'),
          fetch('http://localhost:3000/products')
        ])

        const categoriesData = await categoriesResponse.json()
        const productsData = await productsResponse.json()

        if (!categoriesResponse.ok) {
          throw new Error(categoriesData.error || 'Erro ao carregar categorias')
        }

        if (!productsResponse.ok) {
          throw new Error(productsData.error || 'Erro ao carregar produtos')
        }

        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
        setProducts(Array.isArray(productsData) ? productsData : [])
      } catch (error) {
        setMessage(error.message)
      } finally {
        setLoading(false)
      }
    }

    loadCatalog()
  }, [])

  const productCountByCategoryId = useMemo(() => {
    return products.reduce((acc, product) => {
      const categoryId = getProductCategoryId(product)

      if (!categoryId) {
        return acc
      }

      acc[categoryId] = (acc[categoryId] || 0) + 1
      return acc
    }, {})
  }, [products])

  const visibleCategories = useMemo(() => {
    return categories
      .filter((category) => category.activated !== false)
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  }, [categories])

  function getProductCountLabel(categoryId) {
    const count = productCountByCategoryId[String(categoryId)] || 0
    return `${count} produto${count === 1 ? '' : 's'}`
  }

  return (
    <div style={styles.page}>
      <MainHeader />

      <main style={styles.content}>
        <header style={styles.header}>
          <span style={styles.kicker}>Catalogo</span>
          <h1 style={styles.title}>Todas as categorias</h1>
          <p style={styles.subtitle}>
            Encontre os produtos por grupo e veja o catalogo ja filtrado.
          </p>
        </header>

        {message && <p style={styles.message}>{message}</p>}

        {loading ? (
          <div style={styles.emptyState}>Carregando categorias...</div>
        ) : visibleCategories.length === 0 ? (
          <div style={styles.emptyState}>Nenhuma categoria encontrada.</div>
        ) : (
          <section style={styles.grid} aria-label="Lista de categorias">
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                to={`/allproducts?categoryId=${category.id}`}
                style={styles.categoryLink}
              >
                <span style={styles.categoryInfo}>
                  <span style={styles.categoryName}>{category.name}</span>
                  <span style={styles.categoryMeta}>
                    {getProductCountLabel(category.id)}
                  </span>
                </span>
                <span style={styles.categoryAction}>Ver produtos</span>
              </Link>
            ))}
          </section>
        )}
      </main>
    </div>
  )
}
