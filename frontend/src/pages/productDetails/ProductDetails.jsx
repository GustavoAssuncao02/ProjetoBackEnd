import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MainHeader from '../../components/home/MainHeader'
import ProductCarousel from '../../components/product-carousel/ProductCarousel'
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

export default function ProductDetails() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [variants, setVariants] = useState([])
  const [selectedColor, setSelectedColor] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [message, setMessage] = useState('')

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

                <button type="button" style={styles.buyButton}>
                  Comprar
                </button>
              </div>
            </section>

            <ProductCarousel currentProduct={product} currentColors={colorOptions} />
          </>
        )}
      </main>
    </div>
  )
}
