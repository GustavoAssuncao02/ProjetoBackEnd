import { useState } from 'react'
import styles from './registerUser.styles'

export default function RegisterUser() {
  const [formData, setFormData] = useState({
    name: '',
    birth_date: '',
    email: '',
    cpf: '',
    phone: '',
    gender: '',
    password: '',
    role: 'CUSTOMER' // fixo
  })

  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

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
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error registering user')
      }

      setMessage('User registered successfully!')

      setFormData({
        name: '',
        birth_date: '',
        email: '',
        cpf: '',
        phone: '',
        gender: '',
        password: '',
        role: 'CUSTOMER'
      })
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>User Registration</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input type="text" name="name" placeholder="Full name" value={formData.name} onChange={handleChange} style={styles.input} required />

          <input type="date" name="birth_date" value={formData.birth_date} onChange={handleChange} style={styles.input} required />

          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} style={styles.input} required />

          <input type="text" name="cpf" placeholder="CPF" value={formData.cpf} onChange={handleChange} style={styles.input} required />

          <input type="text" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} style={styles.input} />

          <select name="gender" value={formData.gender} onChange={handleChange} style={styles.input} required>
            <option value="">Select gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>

          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} style={styles.input} required />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Saving...' : 'Register'}
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}
      </div>
    </div>
  )
}