import { useEffect, useState } from 'react'
import MenuAdm from '../../components/menu-adm/MenuAdm'
import styles from './Profile.Styles'

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
    password_confirmation: '',
    role: ''
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(true)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleting, setDeleting] = useState(false)

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
        password_confirmation: '',
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
      const hasPassword = formData.password.trim()
      const hasPasswordConfirmation = formData.password_confirmation.trim()

      if (hasPassword && !hasPasswordConfirmation) {
        throw new Error('Confirm your new password before saving.')
      }

      if (!hasPassword && hasPasswordConfirmation) {
        throw new Error('Enter a new password before confirming it.')
      }

      if (hasPassword && formData.password !== formData.password_confirmation) {
        throw new Error('New password and confirmation do not match.')
      }

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
        password: '',
        password_confirmation: ''
      }))
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  async function handleDeleteAccount() {
    setDeleting(true)
    setMessage('')

    try {
      const token = localStorage.getItem('token')

      const response = await fetch(`http://localhost:3000/users/${formData.id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error deleting account')
      }

      localStorage.removeItem('token')
      localStorage.removeItem('user')

      setMessage('Account deleted successfully!')
      setTimeout(() => {
        window.location.href = '/'
      }, 1000)
    } catch (error) {
      setMessage(error.message)
    } finally {
      setDeleting(false)
      setConfirmDelete(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  if (fetching) {
    return (
      <div style={styles.container}>
        <MenuAdm />

        <div style={styles.card}>
          <h1 style={styles.title}>Loading profile...</h1>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <MenuAdm />

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

          <input
            type="password"
            name="password_confirmation"
            placeholder="Confirm new password"
            value={formData.password_confirmation}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Saving...' : 'Save changes'}
          </button>
        </form>

        {!confirmDelete && (
          <button
            type="button"
            style={styles.dangerButton}
            onClick={() => setConfirmDelete(true)}
          >
            Delete account
          </button>
        )}

        {confirmDelete && (
          <div style={styles.dangerBox}>
            <p style={styles.dangerText}>
              Are you sure you want to delete your account? This action cannot be undone.
            </p>

            <div style={styles.buttonGroup}>
              <button
                type="button"
                style={styles.dangerButton}
                onClick={handleDeleteAccount}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>

              <button
                type="button"
                style={styles.cancelButton}
                onClick={() => setConfirmDelete(false)}
                disabled={deleting}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <button type="button" style={styles.logoutButton} onClick={handleLogout}>
          Sair da conta
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  )
}
