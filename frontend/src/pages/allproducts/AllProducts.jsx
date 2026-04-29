import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import MainHeader from '../../components/home/MainHeader'
import styles from './allProducts.styles'

const sortOptions = [
  { label: 'A até Z', value: 'name-asc' },
  { label: 'Z até A', value: 'name-desc' },
  { label: 'Menor para maior preço', value: 'price-asc' },
  { label: 'Maior para menor preço', value: 'price-desc' },
  { label: 'Adicionado recentemente', value: 'recent' }
]

const defaultSortBy = 'name-asc'

function getValidSortBy(value) {
  return sortOptions.some((option) => option.value === value) ? value : defaultSortBy
}

function getCategoryIdsFromParams(searchParams) {
  const values = [
    ...searchParams.getAll('categoryId'),
    ...searchParams.getAll('categoryIds')
  ]

  const categoryIds = values
    .flatMap((value) => String(value || '').split(','))
    .map((value) => value.trim())
    .filter(Boolean)

  return [...new Set(categoryIds)]
}

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
}

export default function AllProducts() {
  const [searchParams] = useSearchParams()
  const categoryIdsFromUrl = getCategoryIdsFromParams(searchParams)
  const categoryIdsParamKey = categoryIdsFromUrl.join(',')
  const [products, setProducts] = useState([])
  const [variants, setVariants] = useState([])
  const [filters, setFilters] = useState({
    categoryIds: categoryIdsFromUrl,
    subcategoryIds: [],
    colors: [],
    sortBy: getValidSortBy(searchParams.get('sortBy')),
    availableOnly: false
  })
  const [message, setMessage] = useState('')
  const searchTerm = searchParams.get('search')?.trim() || ''
  const sortByParam = searchParams.get('sortBy')

  useEffect(() => {
    loadCatalog()
  }, [])

  useEffect(() => {
    if (!categoryIdsParamKey) {
      return
    }

    const nextCategoryIds = categoryIdsParamKey.split(',').filter(Boolean)

    setFilters((prev) => {
      if (prev.categoryIds.join(',') === categoryIdsParamKey) {
        return prev
      }

      return {
        ...prev,
        categoryIds: nextCategoryIds,
        subcategoryIds: []
      }
    })
  }, [categoryIdsParamKey])

  useEffect(() => {
    if (!sortByParam) {
      return
    }

    const nextSortBy = getValidSortBy(sortByParam)

    setFilters((prev) => {
      if (prev.sortBy === nextSortBy) {
        return prev
      }

      return {
        ...prev,
        sortBy: nextSortBy
      }
    })
  }, [sortByParam])

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
        throw new Error(productsData.error || 'Erro ao carregar produtos')
      }

      if (!variantsResponse.ok) {
        throw new Error(variantsData.error || 'Erro ao carregar variantes')
      }

      setProducts(productsData)
      setVariants(variantsData)
    } catch (error) {
      setMessage(error.message)
    }
  }

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

  const productAvailabilityById = useMemo(() => {
    return products.reduce((acc, product) => {
      const productStock = Number(product.stock_quantity || 0)
      const variantStock = (variantsByProductId[String(product.id)] || []).reduce(
        (total, variant) => total + Number(variant.stock_quantity || 0),
        0
      )

      acc[String(product.id)] = productStock > 0 || variantStock > 0
      return acc
    }, {})
  }, [products, variantsByProductId])

  const categoryOptions = useMemo(() => {
    const categoriesById = {}

    products.forEach((product) => {
      if (product.categories?.id) {
        categoriesById[product.categories.id] = product.categories
      }
    })

    return Object.values(categoriesById).sort((a, b) => a.name.localeCompare(b.name))
  }, [products])

  const subcategoryOptions = useMemo(() => {
    const subcategoriesById = {}

    products.forEach((product) => {
      const matchesSelectedCategories =
        filters.categoryIds.length === 0 ||
        filters.categoryIds.includes(String(product.category_id))

      if (matchesSelectedCategories && product.subcategories?.id) {
        subcategoriesById[product.subcategories.id] = product.subcategories
      }
    })

    return Object.values(subcategoriesById).sort((a, b) => a.name.localeCompare(b.name))
  }, [filters.categoryIds, products])

  const colorOptions = useMemo(() => {
    const colors = new Set()

    variants.forEach((variant) => {
      if (variant.color) {
        colors.add(variant.color)
      }
    })

    return [...colors].sort((a, b) => a.localeCompare(b))
  }, [variants])

  const filteredProducts = useMemo(() => {
    const normalizedSearch = normalizeText(searchTerm)
    const filtered = products.filter((product) => {
      const productVariants = variantsByProductId[String(product.id)] || []
      const matchesSearch =
        !normalizedSearch || normalizeText(product.name).includes(normalizedSearch)
      const matchesCategory =
        filters.categoryIds.length === 0 ||
        filters.categoryIds.includes(String(product.category_id))
      const matchesSubcategory =
        filters.subcategoryIds.length === 0 ||
        filters.subcategoryIds.includes(String(product.subcategory_id))
      const matchesColor =
        filters.colors.length === 0 ||
        productVariants.some((variant) => filters.colors.includes(variant.color))
      const productIsAvailable = Boolean(productAvailabilityById[String(product.id)])
      const matchesAvailability = !filters.availableOnly || productIsAvailable

      return (
        matchesSearch &&
        matchesCategory &&
        matchesSubcategory &&
        matchesColor &&
        matchesAvailability
      )
    })

    return filtered.sort((a, b) => {
      if (filters.sortBy === 'price-asc') {
        return Number(a.current_price || 0) - Number(b.current_price || 0)
      }

      if (filters.sortBy === 'price-desc') {
        return Number(b.current_price || 0) - Number(a.current_price || 0)
      }

      if (filters.sortBy === 'name-desc') {
        return (b.name || '').localeCompare(a.name || '')
      }

      if (filters.sortBy === 'recent') {
        return new Date(b.created_at || 0) - new Date(a.created_at || 0)
      }

      return (a.name || '').localeCompare(b.name || '')
    })
  }, [filters, productAvailabilityById, products, searchTerm, variantsByProductId])

  function handleSortChange(e) {
    setFilters((prev) => ({
      ...prev,
      sortBy: e.target.value
    }))
  }

  function toggleArrayFilter(name, value) {
    setFilters((prev) => {
      const currentValues = prev[name]
      const normalizedValue = String(value)
      const nextValues = currentValues.includes(normalizedValue)
        ? currentValues.filter((item) => item !== normalizedValue)
        : [...currentValues, normalizedValue]

      return {
        ...prev,
        [name]: nextValues,
        ...(name === 'categoryIds' ? { subcategoryIds: [] } : {})
      }
    })
  }

  function handleAvailableChange(e) {
    setFilters((prev) => ({
      ...prev,
      availableOnly: e.target.checked
    }))
  }

  function clearFilters() {
    setFilters({
      categoryIds: [],
      subcategoryIds: [],
      colors: [],
      sortBy: defaultSortBy,
      availableOnly: false
    })
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
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w500`
    }

    if (url.startsWith('/')) {
      return `http://localhost:3000${url}`
    }

    return url
  }

  function getProductImage(product) {
    const productVariants = variantsByProductId[String(product.id)] || []
    const variantWithImage = productVariants.find((variant) => variant.product_images?.length)

    return getImageUrl(variantWithImage?.product_images?.[0]?.image_url)
  }

  function formatCurrency(value) {
    return Number(value || 0).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })
  }

  function renderPrice(product) {
    if (!productAvailabilityById[String(product.id)]) {
      return <span style={styles.unavailablePrice}>Esgotado</span>
    }

    const oldPrice = Number(product.old_price || 0)
    const currentPrice = Number(product.current_price || 0)

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
        <div style={styles.toolbar}>
          <h1 style={styles.title}>Todos os produtos</h1>

          <div style={styles.sortGroup}>
            <label htmlFor="sortBy" style={styles.label}>
              Organizar
            </label>
            <select
              id="sortBy"
              name="sortBy"
              value={filters.sortBy}
              onChange={handleSortChange}
              style={styles.sortSelect}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {searchTerm && (
          <p style={styles.searchResultLabel}>
            Resultado da busca por "{searchTerm}"
          </p>
        )}

        {message && <p style={styles.message}>{message}</p>}

        <div style={styles.layout}>
          <aside style={styles.filters}>
            <h2 style={styles.filtersTitle}>Filtros</h2>

            <div style={styles.filterField}>
              <span style={styles.label}>Grupo</span>
              <div style={styles.checkboxGroup}>
                {categoryOptions.map((category) => (
                  <label key={category.id} style={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      checked={filters.categoryIds.includes(String(category.id))}
                      onChange={() => toggleArrayFilter('categoryIds', category.id)}
                      style={styles.checkboxInput}
                    />
                    <span style={styles.checkboxText}>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.filterField}>
              <span style={styles.label}>Subgrupo</span>
              <div style={styles.checkboxGroup}>
                {subcategoryOptions.map((subcategory) => (
                  <label key={subcategory.id} style={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      checked={filters.subcategoryIds.includes(String(subcategory.id))}
                      onChange={() => toggleArrayFilter('subcategoryIds', subcategory.id)}
                      style={styles.checkboxInput}
                    />
                    <span style={styles.checkboxText}>{subcategory.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.filterField}>
              <span style={styles.label}>Cor</span>
              <div style={styles.checkboxGroup}>
                {colorOptions.map((color) => (
                  <label key={color} style={styles.checkboxOption}>
                    <input
                      type="checkbox"
                      checked={filters.colors.includes(color)}
                      onChange={() => toggleArrayFilter('colors', color)}
                      style={styles.checkboxInput}
                    />
                    <span style={styles.checkboxText}>{color}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={styles.filterField}>
              <label style={styles.checkboxOption}>
                <input
                  type="checkbox"
                  checked={filters.availableOnly}
                  onChange={handleAvailableChange}
                  style={styles.checkboxInput}
                />
                <span style={styles.checkboxText}>Disponível</span>
              </label>
            </div>

            <button type="button" style={styles.clearButton} onClick={clearFilters}>
              Limpar filtros
            </button>
          </aside>

          <section>
            {filteredProducts.length === 0 ? (
              <div style={styles.emptyState}>Nenhum produto encontrado.</div>
            ) : (
              <div style={styles.grid}>
                {filteredProducts.map((product) => {
                  const imageUrl = getProductImage(product)

                  return (
                    <Link
                      key={product.id}
                      to={`/allproducts/${product.id}`}
                      style={styles.productLink}
                    >
                      <article style={styles.productCard}>
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

                        <div style={styles.productInfo}>
                          <h2 style={styles.productName}>{product.name}</h2>
                          <p style={styles.description}>{product.description || 'Sem descrição.'}</p>
                          <p style={styles.price}>{renderPrice(product)}</p>
                        </div>
                      </article>
                    </Link>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  )
}
