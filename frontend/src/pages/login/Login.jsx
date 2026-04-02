import { useState } from 'react'
import styles from './login.styles'

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [token, setToken] = useState('')
  const [user, setUser] = useState(null)

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
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Login failed')
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      setToken(data.token)
      setUser(data.user)
      setMessage('Login successful!')
    } catch (error) {
      setMessage(error.message)
      setToken('')
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setToken('')
    setUser(null)
    setMessage('Logged out successfully!')
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Login</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
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
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        {user && (
          <div style={styles.tokenBox}>
            <strong>User:</strong>
            <br />
            {user.name} - {user.email} - {user.role}
          </div>
        )}

        {token && (
          <div style={styles.tokenBox}>
            <strong>JWT Token:</strong>
            <br />
            {token}
          </div>
        )}

        {token && (
          <button
            type="button"
            style={{ ...styles.button, marginTop: '12px' }}
            onClick={handleLogout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  )
}