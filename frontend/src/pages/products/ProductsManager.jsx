import { useEffect, useState } from 'react'
import styles from './ProductsManager.Styles'

export default function ProductsManager() {
  const [sortConfig, setSortConfig] = useState({
    key: 'id',
    direction: 'desc'
  })
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [subcategories, setSubcategories] = useState([])
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    old_price: '',
    current_price: '',
    category_id: '',
    subcategory_id: ''
  })

  useEffect(() => {
    loadProducts()
    loadCategories()
  }, [])

  async function loadProducts() {
    try {
      const response = await fetch('http://localhost:3000/products')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error loading products')
      }

      setProducts(data)
    } catch (error) {
      setMessage(error.message)
    }
  }
  function handleSort(key) {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc'
        }
      }

      return {
        key,
        direction: key === 'id' ? 'desc' : 'asc'
      }
    })
  }
  function getSortIndicator(columnKey) {
    if (sortConfig.key !== columnKey) return '↕'
    return sortConfig.direction === 'asc' ? '↑' : '↓'
  }
  const sortedProducts = [...products].sort((a, b) => {
    let valueA
    let valueB

    switch (sortConfig.key) {
      case 'id':
        valueA = a.id
        valueB = b.id
        break
      case 'old_price':
        valueA = a.old_price ?? 0
        valueB = b.old_price ?? 0
        break

      case 'stock':
        valueA = a.stock_quantity ?? 0
        valueB = b.stock_quantity ?? 0
        break

      case 'name':
        valueA = a.name?.toLowerCase() || ''
        valueB = b.name?.toLowerCase() || ''
        break

      case 'price':
        valueA = a.current_price
        valueB = b.current_price
        break

      case 'category':
        valueA = a.categories?.name?.toLowerCase() || ''
        valueB = b.categories?.name?.toLowerCase() || ''
        break

      case 'subcategory':
        valueA = a.subcategories?.name?.toLowerCase() || ''
        valueB = b.subcategories?.name?.toLowerCase() || ''
        break
      case 'description':
        valueA = a.description?.toLowerCase() || ''
        valueB = b.description?.toLowerCase() || ''
        break

      default:
        valueA = a.id
        valueB = b.id
    }

    if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1
    if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  async function loadCategories() {
    try {
      const response = await fetch('http://localhost:3000/categories')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error loading categories')
      }

      const onlyActive = data.filter((category) => category.activated === true)
      setCategories(onlyActive)
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

    // 👇 SE MUDAR CATEGORIA, CARREGA SUBCATEGORIA
    if (name === 'category_id') {
      setFormData((prev) => ({
        ...prev,
        category_id: value,
        subcategory_id: '' // limpa subcategoria
      }))

      loadSubcategories(value)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const url = editingId
        ? `http://localhost:3000/products/${editingId}`
        : 'http://localhost:3000/products'

      const method = editingId ? 'PUT' : 'POST'

      const payload = {
        name: formData.name,
        description: formData.description,
        old_price: formData.old_price === '' ? null : Number(formData.old_price),
        current_price: Number(formData.current_price),
        category_id: Number(formData.category_id),
        subcategory_id: Number(formData.subcategory_id) // 👈 NOVO
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error saving product')
      }

      setMessage(editingId ? 'Product updated successfully!' : 'Product created successfully!')
      resetForm()
      loadProducts()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(product) {
    setEditingId(product.id)
    setFormData({
      name: product.name || '',
      description: product.description || '',
      old_price: product.old_price ?? '',
      current_price: product.current_price ?? '',
      category_id: product.category_id || '',
      subcategory_id: product.subcategory_id || '' // 👈 NOVO
    })
    loadSubcategories(product.category_id) // 👈 IMPORTANTE
    setMessage('')
  }

  function resetForm() {
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      old_price: '',
      current_price: '',
      category_id: '',
      subcategory_id: '' // 👈 NOVO
    })
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Do you really want to delete this product?')
    if (!confirmed) return

    try {
      const response = await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error deleting product')
      }

      setMessage('Produto deletado com sucesso')
      loadProducts()

      if (editingId === id) {
        resetForm()
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  function getCategoryName(categoryId) {
    const category = categories.find((item) => item.id === categoryId)
    return category ? category.name : `Category #${categoryId}`
  }
  async function loadSubcategories(categoryId) {
    if (!categoryId) {
      setSubcategories([])
      return
    }

    try {
      const response = await fetch(
        `http://localhost:3000/subcategories/by-category?category_id=${categoryId}`
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error loading subcategories')
      }

      setSubcategories(data.subcategories)
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Products Manager</h1>

        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="number"
            step="0.01"
            name="old_price"
            placeholder="Old price (optional)"
            value={formData.old_price}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="number"
            step="0.01"
            name="current_price"
            placeholder="Current price"
            value={formData.current_price}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <select
            name="subcategory_id"
            value={formData.subcategory_id}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select a subcategory</option>

            {subcategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.name}
              </option>
            ))}
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Saving...' : editingId ? 'Update Product' : 'Add Product'}
          </button>

          {editingId && (
            <button type="button" style={styles.yellowButton} onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th} onClick={() => handleSort('id')}>
                ID {getSortIndicator('id')}
              </th>

              <th style={styles.th} onClick={() => handleSort('name')}>
                Name {getSortIndicator('name')}
              </th>

              <th style={styles.th} onClick={() => handleSort('description')}>
                Description {getSortIndicator('description')}
              </th>

              <th style={styles.th} onClick={() => handleSort('old_price')}>
                Old Price {getSortIndicator('old_price')}
              </th>

              <th style={styles.th} onClick={() => handleSort('price')}>
                Current Price {getSortIndicator('price')}
              </th>

              <th style={styles.th} onClick={() => handleSort('stock')}>
                Stock {getSortIndicator('stock')}
              </th>

              <th style={styles.th} onClick={() => handleSort('category')}>
                Category {getSortIndicator('category')}
              </th>

              <th style={styles.th} onClick={() => handleSort('subcategory')}>
                Subcategory {getSortIndicator('subcategory')}
              </th>

              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedProducts.map((product) => (
              <tr key={product.id}>
                <td style={styles.td}>{product.id}</td>
                <td style={styles.td}>{product.name}</td>
                <td style={styles.td}>{product.description}</td>
                <td style={styles.td}>
                  {product.old_price !== null && product.old_price !== undefined
                    ? `R$ ${Number(product.old_price).toFixed(2)}`
                    : '-'}
                </td>
                <td style={styles.td}>R$ {Number(product.current_price).toFixed(2)}</td>
                <td style={styles.td}>{product.stock_quantity}</td>
                <td style={styles.td}>{product.categories?.name || '-'}</td>
                <td style={styles.td}>{product.subcategories?.name || '-'}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      type="button"
                      style={styles.button}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      style={styles.redButton}
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}