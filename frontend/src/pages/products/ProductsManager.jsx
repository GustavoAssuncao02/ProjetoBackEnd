import { useEffect, useState } from 'react'
import styles from './ProductsManager.Styles'

export default function ProductsManager() {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    old_price: '',
    current_price: '',
    stock_quantity: '',
    category_id: ''
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
        stock_quantity: Number(formData.stock_quantity),
        category_id: Number(formData.category_id)
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
      stock_quantity: product.stock_quantity || '',
      category_id: product.category_id || ''
    })
    setMessage('')
  }

  function resetForm() {
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      old_price: '',
      current_price: '',
      stock_quantity: '',
      category_id: ''
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

      setMessage('Product deleted successfully!')
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

          <input
            type="number"
            name="stock_quantity"
            placeholder="Stock quantity"
            value={formData.stock_quantity}
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
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Description</th>
              <th style={styles.th}>Old Price</th>
              <th style={styles.th}>Current Price</th>
              <th style={styles.th}>Stock</th>
              <th style={styles.th}>Category</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
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
                <td style={styles.td}>{getCategoryName(product.category_id)}</td>
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