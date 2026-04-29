import { useEffect, useState } from 'react'
import MenuAdm from '../../components/menu-adm/MenuAdm'
import styles from './materialsManager.styles'

export default function MaterialsManager() {
  const [materials, setMaterials] = useState([])
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadMaterials()
  }, [])

  async function loadMaterials() {
    try {
      const response = await fetch('http://localhost:3000/materials')
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error loading materials')
      }

      setMaterials(data)
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
        ? `http://localhost:3000/materials/${editingId}`
        : 'http://localhost:3000/materials'

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
        throw new Error(data.error || 'Error saving material')
      }

      setMessage(editingId ? 'Material updated successfully!' : 'Material created successfully!')
      resetForm()
      loadMaterials()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(material) {
    setName(material.name)
    setEditingId(material.id)
    setMessage('')
  }

  function resetForm() {
    setName('')
    setEditingId(null)
  }

  async function handleToggle(id) {
    try {
      const response = await fetch(`http://localhost:3000/materials/${id}/toggle`, {
        method: 'PATCH'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error toggling material')
      }

      setMessage('Material status updated successfully!')
      loadMaterials()
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Do you really want to delete this material?')
    if (!confirmed) return

    try {
      const response = await fetch(`http://localhost:3000/materials/${id}`, {
        method: 'DELETE'
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error deleting material')
      }

      setMessage('Material deleted successfully!')
      loadMaterials()

      if (editingId === id) {
        resetForm()
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <div style={styles.container}>
      <MenuAdm />

      <div style={styles.card}>
        <h1 style={styles.title}>Materials Manager</h1>

        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            placeholder="Material name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Saving...' : editingId ? 'Update Material' : 'Add Material'}
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
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.id}>
                <td style={styles.td}>{material.id}</td>
                <td style={styles.td}>{material.name}</td>
                <td style={styles.td}>
                  <span style={material.activated ? styles.badgeOn : styles.badgeOff}>
                    {material.activated ? 'Activated' : 'Disabled'}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      type="button"
                      style={styles.button}
                      onClick={() => handleEdit(material)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      style={styles.yellowButton}
                      onClick={() => handleToggle(material.id)}
                    >
                      {material.activated ? 'Disable' : 'Activate'}
                    </button>

                    <button
                      type="button"
                      style={styles.redButton}
                      onClick={() => handleDelete(material.id)}
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
