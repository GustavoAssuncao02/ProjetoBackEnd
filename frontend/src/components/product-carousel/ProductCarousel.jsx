import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductCarousel.css'
import styles from './productCarousel.styles'

function getDriveFileId(url) {
  if (!url) {
    return null
  }

  const text = String(url)
  const patterns = [
    /id=([^&]+)/,
    /\/d\/([^/]+)/,
    /file\/d\/([^/]+)/,
    /thumbnail\?id=([^&]+)/
  ]

  for (const pattern of patterns) {
    const match = text.match(pattern)

    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}

function getImageUrl(url) {
  if (!url) {
    return null
  }

  const fileId = getDriveFileId(url)

  if (fileId) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w500`
  }

  if (url.startsWith('/')) {
    return `http://localhost:3000${url}`
  }

  return url
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function renderPrice(product) {
  const oldPrice = Number(product.old_price || 0)
  const currentPrice = Number(product.current_price || 0)

  if (oldPrice > 0 && oldPrice > currentPrice) {
    return (
      <>
        de <span style={styles.oldPrice}>{formatCurrency(oldPrice)}</span> por{' '}
        {formatCurrency(currentPrice)}
      </>
    )
  }

  return formatCurrency(currentPrice)
}

function shuffleProducts(products) {
  return [...products]
    .map((product) => ({ product, order: Math.random() }))
    .sort((a, b) => a.order - b.order)
    .map((item) => item.product)
}

export default function ProductCarousel({
  currentProduct = null,
  currentColors = [],
  title = 'Produtos parecidos',
  showHeader = true
}) {
  const [products, setProducts] = useState([])
  const [variants, setVariants] = useState([])
  const [message, setMessage] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animationDirection, setAnimationDirection] = useState('idle')

  useEffect(() => {
    async function loadCatalog() {
      try {
        setMessage('')

        const [productsResponse, variantsResponse] = await Promise.all([
          fetch('http://localhost:3000/products'),
          fetch('http://localhost:3000/variants')
        ])

        const productsData = await productsResponse.json()
        const variantsData = await variantsResponse.json()

        if (!productsResponse.ok) {
          throw new Error(productsData.error || 'Erro ao carregar produtos relacionados')
        }

        if (!variantsResponse.ok) {
          throw new Error(variantsData.error || 'Erro ao carregar variantes relacionadas')
        }

        setProducts(productsData)
        setVariants(variantsData)
      } catch (error) {
        setMessage(error.message)
      }
    }

    loadCatalog()
  }, [])

  const variantsByProductId = useMemo(() => {
    return variants.reduce((acc, variant) => {
      const productId = String(variant.product_id)

      if (!acc[productId]) {
        acc[productId] = []
      }

      acc[productId].push(variant)
      return acc
    }, {})
  }, [variants])

  const currentProductFromCatalog = useMemo(() => {
    if (!currentProduct?.id) {
      return null
    }

    return products.find((product) => String(product.id) === String(currentProduct.id)) || currentProduct
  }, [currentProduct, products])

  const orderedProducts = useMemo(() => {
    const candidates = products.filter(
      (product) => !currentProductFromCatalog || String(product.id) !== String(currentProductFromCatalog.id)
    )

    if (!currentProductFromCatalog) {
      return shuffleProducts(candidates)
    }

    const currentColorSet = new Set(currentColors)
    const currentCategoryId = String(currentProductFromCatalog.category_id || '')
    const currentSubcategoryId = String(currentProductFromCatalog.subcategory_id || '')

    return candidates
      .map((product) => {
        const productVariants = variantsByProductId[String(product.id)] || []
        const sharesColor = productVariants.some((variant) => currentColorSet.has(variant.color))
        let score = 0

        if (currentCategoryId && String(product.category_id) === currentCategoryId) {
          score += 100
        }

        if (currentSubcategoryId && String(product.subcategory_id) === currentSubcategoryId) {
          score += 70
        }

        if (sharesColor) {
          score += 35
        }

        return {
          product,
          score,
          randomTieBreaker: Math.random()
        }
      })
      .sort((a, b) => {
        if (b.score !== a.score) {
          return b.score - a.score
        }

        return a.randomTieBreaker - b.randomTieBreaker
      })
      .map((item) => item.product)
  }, [currentColors, currentProductFromCatalog, products, variantsByProductId])

  useEffect(() => {
    setCurrentIndex(0)
    setAnimationDirection('idle')
  }, [orderedProducts])

  const visibleProducts = useMemo(() => {
    if (orderedProducts.length === 0) {
      return []
    }

    const itemsPerPage = Math.min(4, orderedProducts.length)

    return Array.from({ length: itemsPerPage }, (_, index) => {
      const productIndex = (currentIndex + index) % orderedProducts.length
      return orderedProducts[productIndex]
    })
  }, [currentIndex, orderedProducts])

  function goToPreviousProducts() {
    setAnimationDirection('previous')
    setCurrentIndex((prev) => {
      if (orderedProducts.length === 0) {
        return 0
      }

      return (prev - 1 + orderedProducts.length) % orderedProducts.length
    })
  }

  function goToNextProducts() {
    setAnimationDirection('next')
    setCurrentIndex((prev) => {
      if (orderedProducts.length === 0) {
        return 0
      }

      return (prev + 1) % orderedProducts.length
    })
  }

  function getProductImage(product) {
    const productVariants = variantsByProductId[String(product.id)] || []
    const currentColorSet = new Set(currentColors)
    const matchingVariant = productVariants.find(
      (variant) => currentColorSet.has(variant.color) && variant.product_images?.length
    )
    const variantWithImage =
      matchingVariant || productVariants.find((variant) => variant.product_images?.length)

    return getImageUrl(variantWithImage?.product_images?.[0]?.image_url)
  }

  if (message) {
    return (
      <section style={styles.section}>
        <div style={styles.message}>{message}</div>
      </section>
    )
  }

  if (visibleProducts.length === 0) {
    return null
  }

  return (
    <section style={styles.section}>
      {showHeader && (
        <div style={styles.header}>
          <div>
            <h2 style={styles.title}>{title}</h2>
            <p style={styles.subtitle}>Outras roupas do catálogo selecionadas para você</p>
          </div>
        </div>
      )}

      <div style={styles.carouselArea}>
        {orderedProducts.length > 1 && (
          <button
            type="button"
            style={styles.arrowButton}
            onClick={goToPreviousProducts}
            aria-label="Ver produtos anteriores"
          >
            &lt;
          </button>
        )}

        <div style={styles.viewport}>
          <div
            key={`${currentIndex}-${animationDirection}`}
            className={`product-carousel-track product-carousel-track--${animationDirection}`}
            style={styles.track}
          >
            {visibleProducts.map((product) => {
              const imageUrl = getProductImage(product)

              return (
                <Link key={product.id} to={`/allproducts/${product.id}`} style={styles.link}>
                  <article style={styles.card}>
                    <div style={styles.imageWrap}>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={product.name}
                          style={styles.image}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none'
                          }}
                        />
                      ) : (
                        <div style={styles.noImage}>Sem imagem</div>
                      )}
                    </div>

                    <div style={styles.info}>
                      <h3 style={styles.name}>{product.name}</h3>
                      <p style={styles.price}>{renderPrice(product)}</p>
                    </div>
                  </article>
                </Link>
              )
            })}
          </div>
        </div>

        {orderedProducts.length > 1 && (
          <button
            type="button"
            style={styles.arrowButton}
            onClick={goToNextProducts}
            aria-label="Ver próximos produtos"
          >
            &gt;
          </button>
        )}
      </div>
    </section>
  )
}
