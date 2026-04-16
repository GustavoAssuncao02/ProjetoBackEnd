import { useEffect, useState } from 'react'
import styles from './variantsManager.styles'

export default function VariantsManager() {
  const [variants, setVariants] = useState([])
  const [products, setProducts] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

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

  async function loadVariants() {
    try {
      const response = await fetch('http://localhost:3000/variants')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error loading variants')
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
        throw new Error(data.error || 'Error loading products')
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

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const url = editingId
        ? `http://localhost:3000/variants/${editingId}`
        : 'http://localhost:3000/variants'

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
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
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error saving variant')
      }

      setMessage(editingId ? 'Variant updated successfully!' : 'Variante criada com Sucesso!')
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
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Do you really want to delete this variant?')
    if (!confirmed) return

    try {
      const response = await fetch(`http://localhost:3000/variants/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error deleting variant')
      }

      setMessage('Variant deleted successfully!')
      loadVariants()
      loadProducts()

      if (editingId === id) {
        resetForm()
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  function getProductName(productId) {
    const product = products.find((item) => item.id === productId)
    return product ? `${product.name} (Stock total: ${product.stock_quantity})` : `Product #${productId}`
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
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="size"
            placeholder="Size"
            value={formData.size}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="number"
            name="stock_quantity"
            placeholder="Variant stock"
            value={formData.stock_quantity}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Saving...' : editingId ? 'Update Variant' : 'Add Variant'}
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
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Color</th>
              <th style={styles.th}>Size</th>
              <th style={styles.th}>Variant Stock</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {variants.map((variant) => (
              <tr key={variant.id}>
                <td style={styles.td}>{variant.id}</td>
                <td style={styles.td}>{getProductName(variant.product_id)}</td>
                <td style={styles.td}>{variant.color}</td>
                <td style={styles.td}>{variant.size}</td>
                <td style={styles.td}>{variant.stock_quantity}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      type="button"
                      style={styles.button}
                      onClick={() => handleEdit(variant)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      style={styles.redButton}
                      onClick={() => handleDelete(variant.id)}
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