import { useEffect, useState } from 'react'
import styles from './EditProfile.Styles'

export default function EditProfile() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    birth_date: '',
    email: '',
    cpf: '',
    phone: '',
    gender: '',
    password: '',
    role: ''
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)

  useEffect(() => {
    loadUser()
  }, [])

  async function loadUser() {
    try {
      const token = localStorage.getItem('token')

      const response = await fetch('http://localhost:3000/auth/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error loading user')
      }

      setFormData({
        id: data.id,
        name: data.name || '',
        birth_date: data.birth_date ? data.birth_date.split('T')[0] : '',
        email: data.email || '',
        cpf: data.cpf || '',
        phone: data.phone || '',
        gender: data.gender || '',
        password: '',
        role: data.role || ''
      })
    } catch (error) {
      setMessage(error.message)
    } finally {
      setFetching(false)
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
      const token = localStorage.getItem('token')

      const bodyData = {
        name: formData.name,
        birth_date: formData.birth_date,
        email: formData.email,
        phone: formData.phone,
        gender: formData.gender
      }

      if (formData.password.trim()) {
        bodyData.password = formData.password
      }

      const response = await fetch(`http://localhost:3000/users/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(bodyData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error updating profile')
      }

      setMessage('Profile updated successfully!')

      setFormData((prev) => ({
        ...prev,
        password: ''
      }))
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (fetching) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>Loading profile...</h1>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Edit Profile</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="cpf"
            placeholder="CPF"
            value={formData.cpf}
            style={styles.disabledInput}
            disabled
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            style={styles.input}
          />

          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            style={styles.disabledInput}
            disabled
          />

          <input
            type="password"
            name="password"
            placeholder="New password (optional)"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  )
}