import { useEffect, useState } from 'react'
import MenuAdm from '../../components/menu-adm/MenuAdm'
import styles from './categoriesManager.styles'

export default function CategoriesManager() {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    try {
      const response = await fetch('http://localhost:3000/categories')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error loading categories')
      }

      setCategories(data)
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const url = editingId
        ? `http://localhost:3000/categories/${editingId}`
        : 'http://localhost:3000/categories'

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error saving category')
      }

      setMessage(editingId ? 'Category updated successfully!' : 'Category created successfully!')
      setName('')
      setEditingId(null)
      loadCategories()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(category) {
    setName(category.name)
    setEditingId(category.id)
    setMessage('')
  }

  function cancelEdit() {
    setName('')
    setEditingId(null)
    setMessage('')
  }

  async function handleToggle(id) {
    try {
      const response = await fetch(`http://localhost:3000/categories/${id}/toggle`, {
        method: 'PATCH'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error toggling category')
      }

      setMessage('Category status updated successfully!')
      loadCategories()
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Do you really want to delete this category?')

    if (!confirmed) return

    try {
      const response = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error deleting category')
      }

      setMessage('Category deleted successfully!')
      loadCategories()
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div style={styles.container}>
      <MenuAdm />

      <div style={styles.card}>
        <h1 style={styles.title}>Categories Manager</h1>

        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Saving...' : editingId ? 'Update Category' : 'Add Category'}
          </button>

          {editingId && (
            <button type="button" style={styles.yellowButton} onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td style={styles.td}>{category.id}</td>
                <td style={styles.td}>{category.name}</td>
                <td style={styles.td}>
                  <span style={category.activated ? styles.badgeOn : styles.badgeOff}>
                    {category.activated ? 'Activated' : 'Disabled'}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      type="button"
                      style={styles.button}
                      onClick={() => handleEdit(category)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      style={styles.yellowButton}
                      onClick={() => handleToggle(category.id)}
                    >
                      {category.activated ? 'Disable' : 'Activate'}
                    </button>

                    <button
                      type="button"
                      style={styles.redButton}
                      onClick={() => handleDelete(category.id)}
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
