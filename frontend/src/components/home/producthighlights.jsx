import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './Home.Styles'
import {
  HOME_SETTINGS_EVENT,
  HOME_SETTINGS_STORAGE_KEY,
  loadHomeSettings
} from '../../config/homeSettings'
import { getCategoryImage, getImageUrl } from '../../utils/catalogImages'

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

function getCategoryId(product) {
  return String(product.category_id || product.categories?.id || '')
}

function getProductSearchText(product) {
  return normalizeText(
    [
      product.name,
      product.description,
      product.categories?.name,
      product.subcategories?.name
    ].join(' ')
  )
}

function getSlotTerms(slot, category) {
  return [
    slot.query,
    slot.categoryName,
    slot.title,
    slot.label,
    category?.name,
    ...(slot.searchTerms || [])
  ]
    .map(normalizeText)
    .filter(Boolean)
}

function findCategoryForSlot(slot, categories) {
  if (slot.categoryId) {
    return categories.find((category) => String(category.id) === String(slot.categoryId))
  }

  const terms = getSlotTerms(slot, null)

  return categories.find((category) => {
    const categoryName = normalizeText(category.name)

    return terms.some((term) => categoryName === term || categoryName.includes(term))
  })
}

function productMatchesTerms(product, terms) {
  if (terms.length === 0) {
    return false
  }

  const productText = getProductSearchText(product)

  return terms.some((term) => productText.includes(term))
}

function pickRandom(items) {
  if (items.length === 0) {
    return null
  }

  return items[Math.floor(Math.random() * items.length)]
}

function getRandomProductImage(products, variantsByProductId) {
  const imageOptions = products.flatMap((product) => {
    const productVariants = variantsByProductId[String(product.id)] || []

    return productVariants.flatMap((variant) =>
      (variant.product_images || [])
        .map((image) => getImageUrl(image.image_url))
        .filter(Boolean)
    )
  })

  return pickRandom(imageOptions)
}

function getProductsForSlot(slot, category, products) {
  const terms = getSlotTerms(slot, category)
  const categoryProducts = category
    ? products.filter((product) => getCategoryId(product) === String(category.id))
    : []
  const searchedProducts = products.filter((product) => productMatchesTerms(product, terms))
  const productsById = {}

  ;[...categoryProducts, ...searchedProducts].forEach((product) => {
    productsById[String(product.id)] = product
  })

  return Object.values(productsById)
}

function createHighlightFromCategory(category, products, variantsByProductId) {
  const categoryProducts = products.filter(
    (product) => getCategoryId(product) === String(category.id)
  )
  const imageOption = getRandomProductImage(categoryProducts, variantsByProductId)

  return {
    id: `category-${category.id}`,
    categoryId: category.id,
    title: category.name,
    image: getCategoryImage(category) || imageOption || null,
    href: `/allproducts?categoryId=${category.id}`
  }
}

function createHighlightFromSlot(slot, categories, products, variantsByProductId) {
  const category = findCategoryForSlot(slot, categories)
  const slotProducts = getProductsForSlot(slot, category, products)
  const imageOption = getRandomProductImage(slotProducts, variantsByProductId)
  const query =
    slot.query || slot.searchTerms?.[0] || category?.name || slot.title || slot.label || ''
  const image =
    getImageUrl(slot.imageUrl || slot.image_url) || getCategoryImage(category) || imageOption || null

  if (!category && !query && !image) {
    return null
  }

  return {
    id: slot.id || `slot-${query}`,
    categoryId: category?.id || null,
    title: slot.title || slot.label || category?.name || query,
    image,
    href: category?.id
      ? `/allproducts?categoryId=${category.id}`
      : `/allproducts?search=${encodeURIComponent(query)}`
  }
}

export default function ProductHighlights() {
  const [homeSettings, setHomeSettings] = useState(() => loadHomeSettings())
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [variants, setVariants] = useState([])

  useEffect(() => {
    function refreshHomeSettings(event) {
      if (event?.key && event.key !== HOME_SETTINGS_STORAGE_KEY) {
        return
      }

      setHomeSettings(loadHomeSettings())
    }

    window.addEventListener(HOME_SETTINGS_EVENT, refreshHomeSettings)
    window.addEventListener('storage', refreshHomeSettings)

    return () => {
      window.removeEventListener(HOME_SETTINGS_EVENT, refreshHomeSettings)
      window.removeEventListener('storage', refreshHomeSettings)
    }
  }, [])

  useEffect(() => {
    async function loadCatalogHighlights() {
      try {
        const [categoriesResponse, productsResponse, variantsResponse] = await Promise.all([
          fetch('http://localhost:3000/categories'),
          fetch('http://localhost:3000/products'),
          fetch('http://localhost:3000/variants')
        ])

        const [categoriesData, productsData, variantsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
          variantsResponse.json()
        ])

        if (!categoriesResponse.ok || !productsResponse.ok || !variantsResponse.ok) {
          return
        }

        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
        setProducts(Array.isArray(productsData) ? productsData : [])
        setVariants(Array.isArray(variantsData) ? variantsData : [])
      } catch {
        setCategories([])
        setProducts([])
        setVariants([])
      }
    }

    loadCatalogHighlights()
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

  const items = useMemo(() => {
    const featuredCategories = homeSettings.featuredCategories || {}
    const maxItems = Number(featuredCategories.maxItems || 3)
    const activeCategories = categories
      .filter((category) => category.activated !== false)
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
    const configuredSlots = (featuredCategories.slots || []).filter(
      (slot) => slot.enabled !== false
    )
    const configuredItems = configuredSlots
      .map((slot) => createHighlightFromSlot(slot, activeCategories, products, variantsByProductId))
      .filter(Boolean)
    const usedCategoryIds = new Set(
      configuredItems.map((item) => String(item.categoryId || '')).filter(Boolean)
    )
    const categoryItems = activeCategories
      .filter((category) => !usedCategoryIds.has(String(category.id)))
      .map((category) => createHighlightFromCategory(category, products, variantsByProductId))

    return [...configuredItems, ...categoryItems].slice(0, maxItems)
  }, [categories, homeSettings.featuredCategories, products, variantsByProductId])

  if (items.length === 0) {
    return null
  }

  return (
    <section style={styles.highlights}>
      {items.map((item) => (
        <Link key={item.id} to={item.href} style={styles.card}>
          <div style={styles.cardImageWrap}>
            {item.image ? (
              <>
                <img
                  src={item.image}
                  alt={item.title}
                  style={styles.cardImage}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling.style.display = 'flex'
                  }}
                />
                <span style={{ ...styles.cardImageFallback, display: 'none' }}>
                  Sem imagem
                </span>
              </>
            ) : (
              <span style={styles.cardImageFallback}>Sem imagem</span>
            )}
          </div>
          <div style={styles.cardTitle}>{item.title}</div>
        </Link>
      ))}
    </section>
  )
}
