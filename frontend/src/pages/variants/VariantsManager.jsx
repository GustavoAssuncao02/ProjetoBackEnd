import { Fragment, useEffect, useMemo, useState } from 'react'
import styles from './variantsManager.styles'

const colorOptions = [
  'Preto',
  'Branco',
  'Cinza',
  'Chumbo',
  'Azul',
  'Azul Marinho',
  'Azul Claro',
  'Vermelho',
  'Vinho',
  'Verde',
  'Verde Militar',
  'Amarelo',
  'Laranja',
  'Rosa',
  'Roxo',
  'Bege',
  'Marrom',
  'Off White',
  'Creme',
  'Estampado'
]

const sizeOptions = [
  'PP',
  'P',
  'M',
  'G',
  'GG',
  'XG',
  'XGG',
  'EXG',
  'Único',
  'Infantil P',
  'Infantil M',
  'Infantil G'
]

export default function VariantsManager() {
  const [variants, setVariants] = useState([])
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [expandedProducts, setExpandedProducts] = useState({})

  const [formData, setFormData] = useState({
    product_id: '',
    size: '',
    color: '',
    stock_quantity: ''
  })

  useEffect(() => {
    loadVariants()
    loadProducts()
  }, [])

  const productsById = useMemo(() => {
    return products.reduce((acc, product) => {
      acc[String(product.id)] = product
      return acc
    }, {})
  }, [products])

  const groupedVariants = useMemo(() => {
    const groups = []
    const groupsByProductId = {}

    variants.forEach((variant) => {
      const productId = String(variant.product_id)

      if (!groupsByProductId[productId]) {
        const product = productsById[productId]

        groupsByProductId[productId] = {
          productId,
          productName: product ? product.name : `Produto #${variant.product_id}`,
          totalStock: product ? product.stock_quantity : null,
          variants: []
        }

        groups.push(groupsByProductId[productId])
      }

      groupsByProductId[productId].variants.push(variant)
    })

    return groups
  }, [productsById, variants])

  async function loadVariants() {
    try {
      const response = await fetch('http://localhost:3000/variants')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar variantes')
      }

      setVariants(data)
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function loadProducts() {
    try {
      const response = await fetch('http://localhost:3000/products')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao carregar produtos')
      }

      setProducts(data)
    } catch (error) {
      setMessage(error.message)
    }
  }

  function handleChange(e) {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  function handleImagesChange(e) {
    setImages(Array.from(e.target.files))
  }

  function getProductName(productId) {
    const product = productsById[String(productId)]
    return product ? `${product.name} (Estoque total: ${product.stock_quantity})` : `Produto #${productId}`
  }

  function toggleProduct(productId) {
    setExpandedProducts((prev) => ({
      ...prev,
      [productId]: !prev[productId]
    }))
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
    const fileId = getDriveFileId(url)

    if (!fileId) {
      return url
    }

    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w300`
  }

  function getMainImage(variant) {
    if (!variant.product_images || variant.product_images.length === 0) {
      return null
    }

    return variant.product_images[0].image_url
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const url = editingId
        ? `http://localhost:3000/variants/${editingId}`
        : 'http://localhost:3000/variants'

      const method = editingId ? 'PUT' : 'POST'

      let requestConfig

      if (editingId) {
        requestConfig = {
          method,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            product_id: Number(formData.product_id),
            size: formData.size,
            color: formData.color,
            stock_quantity: Number(formData.stock_quantity)
          })
        }
      } else {
        if (images.length === 0) {
          throw new Error('Selecione pelo menos uma imagem para criar a variante')
        }

        const body = new FormData()

        body.append('product_id', formData.product_id)
        body.append('size', formData.size)
        body.append('color', formData.color)
        body.append('stock_quantity', formData.stock_quantity)

        images.forEach((image) => {
          body.append('images', image)
        })

        requestConfig = {
          method,
          body
        }
      }

      const response = await fetch(url, requestConfig)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao salvar variante')
      }

      setMessage(editingId ? 'Variante atualizada com sucesso!' : 'Variante criada com sucesso!')
      resetForm()
      loadVariants()
      loadProducts()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(variant) {
    setEditingId(variant.id)

    setFormData({
      product_id: variant.product_id,
      size: variant.size || '',
      color: variant.color || '',
      stock_quantity: variant.stock_quantity || ''
    })

    setImages([])
    setMessage('')
  }

  function resetForm() {
    setEditingId(null)

    setFormData({
      product_id: '',
      size: '',
      color: '',
      stock_quantity: ''
    })

    setImages([])
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Deseja realmente excluir esta variante?')

    if (!confirmed) {
      return
    }

    try {
      const response = await fetch(`http://localhost:3000/variants/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao excluir variante')
      }

      setMessage('Variante excluída com sucesso!')
      loadVariants()
      loadProducts()

      if (editingId === id) {
        resetForm()
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Variants Manager</h1>

        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            name="product_id"
            value={formData.product_id}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Selecione um produto</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <select
            name="color"
            value={formData.color}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Selecione a cor</option>
            {colorOptions.map((color) => (
              <option key={color} value={color}>
                {color}
              </option>
            ))}
          </select>

          <select
            name="size"
            value={formData.size}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Selecione o tamanho</option>
            {sizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="stock_quantity"
            placeholder="Estoque da variante"
            value={formData.stock_quantity}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {!editingId && (
            <div style={styles.fileGroup}>
              <label style={styles.label}>Imagens da variante</label>

              <p style={styles.imageWarning}>
                A primeira imagem selecionada será usada como imagem principal.
              </p>

              <input
                type="file"
                name="images"
                accept="image/png,image/jpeg,image/jpg,image/webp,image/gif,image/bmp,image/svg+xml"
                multiple
                required
                onChange={handleImagesChange}
                style={styles.input}
              />

              {images.length > 0 && (
                <p style={styles.selectedImages}>
                  {images.length} imagem(ns) selecionada(s)
                </p>
              )}
            </div>
          )}

          <div style={styles.formActions}>
            <button type="submit" style={styles.button} disabled={loading}>
              {loading ? 'Salvando...' : editingId ? 'Atualizar Variante' : 'Adicionar Variante'}
            </button>

            {editingId && (
              <button type="button" style={styles.yellowButton} onClick={resetForm}>
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Imagem</th>
                <th style={styles.th}>Produto</th>
                <th style={styles.th}>Cor</th>
                <th style={styles.th}>Tamanho</th>
                <th style={styles.th}>Estoque</th>
                <th style={styles.th}>Ações</th>
              </tr>
            </thead>

            <tbody>
              {groupedVariants.length === 0 && (
                <tr>
                  <td style={styles.emptyState} colSpan="7">
                    Nenhuma variante cadastrada.
                  </td>
                </tr>
              )}

              {groupedVariants.map((group) => {
                const isExpanded = Boolean(expandedProducts[group.productId])
                const stockLabel =
                  group.totalStock === null ? 'Estoque total indisponível' : `Estoque total: ${group.totalStock}`

                return (
                  <Fragment key={group.productId}>
                    <tr style={styles.groupRow}>
                      <td colSpan="7" style={styles.groupCell}>
                        <button
                          type="button"
                          style={styles.groupButton}
                          onClick={() => toggleProduct(group.productId)}
                        >
                          <span style={styles.expandIcon}>{isExpanded ? '-' : '+'}</span>
                          <span style={styles.groupTitle}>{group.productName}</span>
                          <span style={styles.groupMeta}>
                            {stockLabel} | {group.variants.length} variante(s)
                          </span>
                        </button>
                      </td>
                    </tr>

                    {isExpanded &&
                      group.variants.map((variant) => {
                        const mainImage = getMainImage(variant)
                        const imageUrl = getImageUrl(mainImage)

                        return (
                          <tr key={variant.id} style={styles.variantRow}>
                            <td style={{ ...styles.td, ...styles.variantTd }}>{variant.id}</td>

                            <td style={{ ...styles.td, ...styles.variantTd }}>
                              {imageUrl ? (
                                <img
                                  src={imageUrl}
                                  alt={variant.color}
                                  style={styles.variantImage}
                                  referrerPolicy="no-referrer"
                                  onError={(e) => {
                                    e.currentTarget.style.display = 'none'
                                  }}
                                />
                              ) : (
                                <span style={styles.noImage}>Sem imagem</span>
                              )}
                            </td>

                            <td style={{ ...styles.td, ...styles.variantTd }}>
                              {getProductName(variant.product_id)}
                            </td>
                            <td style={{ ...styles.td, ...styles.variantTd }}>{variant.color}</td>
                            <td style={{ ...styles.td, ...styles.variantTd }}>{variant.size}</td>
                            <td style={{ ...styles.td, ...styles.variantTd }}>
                              {variant.stock_quantity}
                            </td>

                            <td style={{ ...styles.td, ...styles.variantTd }}>
                              <div style={styles.actions}>
                                <button
                                  type="button"
                                  style={styles.button}
                                  onClick={() => handleEdit(variant)}
                                >
                                  Editar
                                </button>

                                <button
                                  type="button"
                                  style={styles.redButton}
                                  onClick={() => handleDelete(variant.id)}
                                >
                                  Excluir
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                  </Fragment>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
