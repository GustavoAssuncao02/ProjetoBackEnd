import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MainHeader from '../../components/home/MainHeader'
import ProductCarousel from '../../components/product-carousel/ProductCarousel'
import { addCartItem } from '../../utils/cartStorage'
import styles from './productDetails.styles'

const colorMap = {
  preto: '#111111',
  preta: '#111111',
  branco: '#ffffff',
  branca: '#ffffff',
  cinza: '#9ca3af',
  chumbo: '#36454f',
  azul: '#2563eb',
  vermelho: '#dc2626',
  vinho: '#7f1d1d',
  verde: '#16a34a',
  amarelo: '#facc15',
  laranja: '#f97316',
  rosa: '#fb7185',
  roxo: '#7e22ce',
  bege: '#d6b98c',
  marrom: '#7c4a26',
  creme: '#f5e6c8'
}

const ratingValues = [1, 2, 3, 4, 5]
const FAVORITES_STORAGE_KEY = 'oriun_favorite_products'

function getFavoriteProductIds() {
  try {
    const favorites = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) || '[]')

    return Array.isArray(favorites) ? favorites.map(String) : []
  } catch {
    return []
  }
}

function saveFavoriteProductIds(favorites) {
  localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
}

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
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w700`
  }

  if (url.startsWith('/')) {
    return `http://localhost:3000${url}`
  }

  return url
}

function normalizeColorName(color) {
  return String(color || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function getColorValue(color) {
  const normalizedColor = normalizeColorName(color)
  const match = Object.keys(colorMap).find((key) => normalizedColor.includes(key))

  return match ? colorMap[match] : '#d1d5db'
}

function formatCurrency(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function formatReviewDate(value) {
  if (!value) {
    return ''
  }

  return new Date(value).toLocaleDateString('pt-BR')
}

function getReviewsCountLabel(count) {
  return `${count} avaliaç${count === 1 ? 'ão' : 'ões'}`
}

function RatingStars({ rating, size = 16 }) {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0))

  return (
    <span style={styles.ratingStars} aria-label={`Nota ${safeRating.toFixed(1)} de 5`}>
      {ratingValues.map((value) => {
        const fillPercentage = Math.max(0, Math.min(1, safeRating - (value - 1))) * 100

        return (
          <span
            key={value}
            style={{
              ...styles.star,
              fontSize: size,
              height: size,
              width: size
            }}
          >
            <span style={styles.starEmpty}>★</span>
            <span style={{ ...styles.starFilled, width: `${fillPercentage}%` }}>★</span>
          </span>
        )
      })}
    </span>
  )
}

export default function ProductDetails() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [variants, setVariants] = useState([])
  const [reviews, setReviews] = useState([])
  const [reviewStats, setReviewStats] = useState({ average: 0, totalReviews: 0 })
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [message, setMessage] = useState('')
  const [cartMessage, setCartMessage] = useState('')
  const [reviewMessage, setReviewMessage] = useState('')
  const [reviewLoading, setReviewLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    async function loadProduct() {
      try {
        setMessage('')

        const [productResponse, variantsResponse] = await Promise.all([
          fetch(`http://localhost:3000/products/${productId}`),
          fetch(`http://localhost:3000/variants/product/${productId}`)
        ])

        const productData = await productResponse.json()
        const variantsData = await variantsResponse.json()

        if (!productResponse.ok) {
          throw new Error(productData.error || 'Erro ao carregar produto')
        }

        if (!variantsResponse.ok) {
          throw new Error(variantsData.error || 'Erro ao carregar variantes')
        }

        setProduct(productData)
        setVariants(variantsData)
      } catch (error) {
        setMessage(error.message)
      }
    }

    loadProduct()
  }, [productId])

  useEffect(() => {
    setIsFavorite(getFavoriteProductIds().includes(String(productId)))
  }, [productId])

  const loadReviewData = useCallback(async () => {
    if (!productId) {
      return
    }

    try {
      setReviewLoading(true)
      setReviewMessage('')

      const [reviewsResponse, statsResponse] = await Promise.all([
        fetch(`http://localhost:3000/reviews/product/${productId}`),
        fetch(`http://localhost:3000/reviews/product/${productId}/stats`)
      ])

      const reviewsData = await reviewsResponse.json()
      const statsData = await statsResponse.json()

      if (!reviewsResponse.ok) {
        throw new Error(reviewsData.error || 'Erro ao carregar avaliações')
      }

      if (!statsResponse.ok) {
        throw new Error(statsData.error || 'Erro ao carregar nota do produto')
      }

      const sortedReviews = (Array.isArray(reviewsData) ? reviewsData : []).sort(
        (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0)
      )

      setReviews(sortedReviews)
      setReviewStats({
        average: Number(statsData.average || 0),
        totalReviews: Number(statsData.totalReviews || 0)
      })
    } catch (error) {
      setReviewMessage(error.message)
    } finally {
      setReviewLoading(false)
    }
  }, [productId])

  useEffect(() => {
    loadReviewData()
  }, [loadReviewData])

  const colorOptions = useMemo(() => {
    const colors = new Set()

    variants.forEach((variant) => {
      if (variant.color) {
        colors.add(variant.color)
      }
    })

    return [...colors]
  }, [variants])

  const visibleImages = useMemo(() => {
    const currentColor = selectedColor || colorOptions[0] || ''
    const selectedVariants = currentColor
      ? variants.filter((variant) => variant.color === currentColor)
      : variants
    const imageUrls = selectedVariants.flatMap((variant) =>
      (variant.product_images || []).map((image) => getImageUrl(image.image_url))
    )

    return [...new Set(imageUrls.filter(Boolean))]
  }, [colorOptions, selectedColor, variants])

  const selectedVariant = useMemo(() => {
    const variantsFromSelectedColor = selectedColor
      ? variants.filter((variant) => variant.color === selectedColor)
      : variants

    return (
      variantsFromSelectedColor.find((variant) => Number(variant.stock_quantity || 0) > 0) ||
      variantsFromSelectedColor[0] ||
      variants[0] ||
      null
    )
  }, [selectedColor, variants])

  useEffect(() => {
    if (colorOptions.length === 0) {
      setSelectedColor('')
      return
    }

    if (!selectedColor || !colorOptions.includes(selectedColor)) {
      setSelectedColor(colorOptions[0])
    }
  }, [colorOptions, selectedColor])

  useEffect(() => {
    setSelectedImage(visibleImages[0] || '')
  }, [visibleImages])

  function renderPrice() {
    const oldPrice = Number(product?.old_price || 0)
    const currentPrice = Number(product?.current_price || 0)

    if (oldPrice > 0 && oldPrice > currentPrice) {
      return (
        <>
          de <span style={styles.oldPriceText}>{formatCurrency(oldPrice)}</span> por{' '}
          {formatCurrency(currentPrice)} reais
        </>
      )
    }

    return formatCurrency(currentPrice)
  }

  function handleAddToCart() {
    if (!product || !selectedVariant) {
      setCartMessage('')
      setMessage('Não foi possível adicionar este produto ao carrinho.')
      return
    }

    addCartItem({
      product_id: product.id,
      product_name: product.name,
      variant_id: selectedVariant.id,
      color: selectedVariant.color || selectedColor || 'Único',
      size: selectedVariant.size || 'Único',
      quantity: 1,
      unit_price: Number(product.current_price || 0),
      image_url: selectedImage || visibleImages[0] || ''
    })

    setMessage('')
    setCartMessage('Produto adicionado ao carrinho.')
  }

  function handleToggleFavorite() {
    const productIdText = String(productId)
    const favorites = getFavoriteProductIds()
    const nextFavorites = favorites.includes(productIdText)
      ? favorites.filter((favoriteId) => favoriteId !== productIdText)
      : [...favorites, productIdText]

    saveFavoriteProductIds(nextFavorites)
    setIsFavorite(nextFavorites.includes(productIdText))
  }

  return (
    <div style={styles.page}>
      <MainHeader />

      <main style={styles.content}>
        <Link to="/allproducts" style={styles.backLink}>
          Voltar para todos os produtos
        </Link>

        {message && <p style={styles.message}>{message}</p>}

        {product && (
          <>
            <section style={styles.detailCard}>
              <button
                type="button"
                aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                title={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                style={{
                  ...styles.favoriteButton,
                  ...(isFavorite ? styles.favoriteButtonActive : {})
                }}
                onClick={handleToggleFavorite}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill={isFavorite ? 'currentColor' : 'none'}
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M20.84 4.61C20.33 4.1 19.72 3.7 19.05 3.42C18.38 3.14 17.66 3 16.94 3C16.22 3 15.5 3.14 14.83 3.42C14.16 3.7 13.55 4.1 13.04 4.61L12 5.65L10.96 4.61C9.93 3.58 8.54 3 7.08 3C5.62 3 4.23 3.58 3.2 4.61C2.17 5.64 1.59 7.03 1.59 8.49C1.59 9.95 2.17 11.34 3.2 12.37L12 21.17L20.8 12.37C21.31 11.86 21.71 11.25 21.99 10.58C22.27 9.91 22.41 9.2 22.41 8.47C22.41 7.75 22.27 7.03 21.99 6.36C21.71 5.69 21.31 5.08 20.8 4.57L20.84 4.61Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div style={styles.gallery}>
                <div style={styles.thumbnails}>
                  {visibleImages.map((imageUrl) => (
                    <button
                      key={imageUrl}
                      type="button"
                      style={{
                        ...styles.thumbnailButton,
                        ...(selectedImage === imageUrl ? styles.activeThumbnail : {})
                      }}
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <img src={imageUrl} alt={product.name} style={styles.thumbnailImage} />
                    </button>
                  ))}
                </div>

                <div style={styles.mainImageWrap}>
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt={product.name}
                      style={styles.mainImage}
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <span style={styles.noImage}>Sem imagem</span>
                  )}
                </div>
              </div>

              <div style={styles.info}>
                <h1 style={styles.productName}>{product.name}</h1>
                <div style={styles.ratingRow}>
                  <RatingStars rating={reviewStats.average} size={15} />
                  <span style={styles.ratingSummary}>
                    {reviewStats.totalReviews > 0
                      ? `${reviewStats.average.toFixed(1)} (${getReviewsCountLabel(reviewStats.totalReviews)})`
                      : 'Sem avaliações'}
                  </span>
                </div>
                <p style={styles.price}>{renderPrice()}</p>

                <div style={styles.descriptionBlock}>
                  <h2 style={styles.sectionTitle}>Descrição</h2>
                  <p style={styles.description}>{product.description || 'Sem descrição.'}</p>
                </div>

                {colorOptions.length > 0 && (
                  <div>
                    <h2 style={styles.sectionTitle}>Cor</h2>
                    <div style={styles.colorOptions}>
                      {colorOptions.map((color) => (
                        <button
                          key={color}
                          type="button"
                          style={{
                            ...styles.colorButton,
                            ...(selectedColor === color ? styles.activeColorButton : {})
                          }}
                          onClick={() => setSelectedColor(color)}
                        >
                          <span
                            style={{
                              ...styles.colorDot,
                              backgroundColor: getColorValue(color)
                            }}
                          />
                          <span style={styles.colorLabel}>{color}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <button type="button" style={styles.buyButton} onClick={handleAddToCart}>
                  <span style={styles.buyButtonIcon} aria-hidden="true">
                    <svg
                      width="21"
                      height="21"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM7.17 14.75C6.42 14.75 5.76 14.33 5.43 13.68L2 6.59V5H4.31L7.28 11.25H14.53L17.28 6.25H19.56L16.05 12.61C15.7 13.25 15.03 13.65 14.3 13.65H7.53L6.43 15.65H19V17.65H7C5.9 17.65 5 16.75 5 15.65C5 15.31 5.09 14.97 5.25 14.68L6.6 12.24L3.62 6H2V4H5L8.18 10.75H14.52L17.28 5.75C17.63 5.1 18.3 4.7 19.03 4.7H21V6.7H19.3L16.3 12.15C15.95 12.79 15.28 13.19 14.55 13.19H7.68L7.17 14.75Z"
                        fill="currentColor"
                      />
                    </svg>
                  </span>
                  Adicionar ao carrinho
                </button>

                {cartMessage && <p style={styles.cartMessage}>{cartMessage}</p>}
              </div>
            </section>

            <section style={styles.reviewsSection}>
              <div style={styles.reviewsHeader}>
                <div>
                  <span style={styles.reviewsKicker}>Experiência dos clientes</span>
                  <h2 style={styles.reviewsTitle}>Avaliações</h2>
                </div>

                <div style={styles.reviewsScore}>
                  <RatingStars rating={reviewStats.average} size={18} />
                  <strong style={styles.reviewsAverage}>{reviewStats.average.toFixed(1)}</strong>
                  <span style={styles.reviewsTotal}>
                    {getReviewsCountLabel(reviewStats.totalReviews || 0)}
                  </span>
                </div>
              </div>

              {reviewMessage && <p style={styles.reviewMessage}>{reviewMessage}</p>}

              <div style={styles.reviewList}>
                {reviewLoading ? (
                  <div style={styles.reviewEmptyState}>Carregando avaliações...</div>
                ) : reviews.length === 0 ? (
                  <div style={styles.reviewEmptyState}>
                    Ainda não há avaliações para este produto.
                  </div>
                ) : (
                  reviews.map((review) => (
                    <article key={review.id} style={styles.reviewItem}>
                      <div style={styles.reviewItemHeader}>
                        <div>
                          <strong style={styles.reviewAuthor}>Cliente</strong>
                          <div style={styles.reviewItemStars}>
                            <RatingStars rating={review.rating} size={13} />
                          </div>
                        </div>
                        <span style={styles.reviewDate}>{formatReviewDate(review.created_at)}</span>
                      </div>

                      <p style={styles.reviewComment}>
                        {review.comment || 'Sem comentário.'}
                      </p>
                    </article>
                  ))
                )}
              </div>
            </section>

            <ProductCarousel currentProduct={product} currentColors={colorOptions} />
          </>
        )}
      </main>
    </div>
  )
}
