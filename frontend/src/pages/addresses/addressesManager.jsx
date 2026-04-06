import { useEffect, useState } from 'react'
import styles from './addressesManager.styles'

export default function AddressesManager() {
  const token = localStorage.getItem('token')

  const [addresses, setAddresses] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zip_code: '',
    country: 'Brazil'
  })

  useEffect(() => {
    if (token) {
      loadAddresses()
    }
  }, [token])

  async function loadAddresses() {
    try {
      const response = await fetch('http://localhost:3000/addresses/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error loading addresses')
      }

      setAddresses(data)
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
        ? `http://localhost:3000/addresses/me/${editingId}`
        : 'http://localhost:3000/addresses'

      const method = editingId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error saving address')
      }

      setMessage(editingId ? 'Address updated successfully!' : 'Address created successfully!')
      resetForm()
      loadAddresses()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  function handleEdit(address) {
    setEditingId(address.id)
    setFormData({
      street: address.street || '',
      number: address.number || '',
      complement: address.complement || '',
      neighborhood: address.neighborhood || '',
      city: address.city || '',
      state: address.state || '',
      zip_code: address.zip_code || '',
      country: address.country || 'Brazil'
    })
    setMessage('')
  }

  function resetForm() {
    setEditingId(null)
    setFormData({
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zip_code: '',
      country: 'Brazil'
    })
  }

  async function handleDelete(id) {
    const confirmed = window.confirm('Do you really want to delete this address?')
    if (!confirmed) return

    try {
      const response = await fetch(`http://localhost:3000/addresses/me/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error deleting address')
      }

      setMessage('Address deleted successfully!')
      loadAddresses()

      if (editingId === id) {
        resetForm()
      }
    } catch (error) {
      setMessage(error.message)
    }
  }

  if (!token) {
    return (
      <div style={styles.container}>
        <div style={styles.loginBox}>
          <h1>Login required</h1>
          <p>You need to be logged in to manage your addresses.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>My Addresses</h1>

        {message && <p style={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={formData.street}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="number"
            placeholder="Number"
            value={formData.number}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="complement"
            placeholder="Complement"
            value={formData.complement}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            type="text"
            name="neighborhood"
            placeholder="Neighborhood"
            value={formData.neighborhood}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="zip_code"
            placeholder="ZIP Code"
            value={formData.zip_code}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="country"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Saving...' : editingId ? 'Update Address' : 'Add Address'}
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
              <th style={styles.th}>Street</th>
              <th style={styles.th}>Number</th>
              <th style={styles.th}>Complement</th>
              <th style={styles.th}>Neighborhood</th>
              <th style={styles.th}>City</th>
              <th style={styles.th}>State</th>
              <th style={styles.th}>ZIP</th>
              <th style={styles.th}>Country</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((address) => (
              <tr key={address.id}>
                <td style={styles.td}>{address.id}</td>
                <td style={styles.td}>{address.street}</td>
                <td style={styles.td}>{address.number}</td>
                <td style={styles.td}>{address.complement}</td>
                <td style={styles.td}>{address.neighborhood}</td>
                <td style={styles.td}>{address.city}</td>
                <td style={styles.td}>{address.state}</td>
                <td style={styles.td}>{address.zip_code}</td>
                <td style={styles.td}>{address.country}</td>
                <td style={styles.td}>
                  <div style={styles.actions}>
                    <button
                      type="button"
                      style={styles.button}
                      onClick={() => handleEdit(address)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      style={styles.redButton}
                      onClick={() => handleDelete(address.id)}
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