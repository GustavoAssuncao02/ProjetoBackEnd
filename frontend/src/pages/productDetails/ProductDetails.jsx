import { useEffect, useMemo, useState } from 'react'
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
  const [cartMessage, setCartMessage] = useState('')

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

            <ProductCarousel currentProduct={product} currentColors={colorOptions} />
          </>
        )}
      </main>
    </div>
  )
}
