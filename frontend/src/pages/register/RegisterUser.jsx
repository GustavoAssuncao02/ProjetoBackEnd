import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import styles from './registerUser.styles'

function onlyDigits(value) {
  return String(value || '').replace(/\D/g, '')
}

function isValidEmail(value) {
  const email = String(value || '').trim()
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  return emailPattern.test(email)
}

function formatCpf(value) {
  const digits = onlyDigits(value).slice(0, 11)

  if (digits.length <= 3) {
    return digits
  }

  if (digits.length <= 6) {
    return `${digits.slice(0, 3)}.${digits.slice(3)}`
  }

  if (digits.length <= 9) {
    return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
}

function isValidCpf(value) {
  const digits = onlyDigits(value)

  if (digits.length !== 11 || /^(\d)\1+$/.test(digits)) {
    return false
  }

  const calculateDigit = (baseDigits, factor) => {
    const total = baseDigits
      .split('')
      .reduce((sum, digit) => sum + Number(digit) * factor--, 0)
    const rest = (total * 10) % 11

    return rest === 10 ? 0 : rest
  }

  const firstDigit = calculateDigit(digits.slice(0, 9), 10)
  const secondDigit = calculateDigit(digits.slice(0, 10), 11)

  return firstDigit === Number(digits[9]) && secondDigit === Number(digits[10])
}

function formatPhone(value) {
  const digits = onlyDigits(value).slice(0, 11)

  if (digits.length <= 2) {
    return digits
  }

  if (digits.length <= 3) {
    return `${digits.slice(0, 2)} ${digits.slice(2)}`
  }

  if (digits.length <= 7) {
    return `${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3)}`
  }

  return `${digits.slice(0, 2)} ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`
}

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    birth_date: '',
    email: '',
    cpf: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [birthDateFocused, setBirthDateFocused] = useState(false)

  function handleChange(e) {
    const { name, value } = e.target
    const nextValue =
      name === 'cpf'
        ? formatCpf(value)
        : name === 'phone'
          ? formatPhone(value)
          : value

    setForm({
      ...form,
      [name]: nextValue
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!isValidEmail(form.email)) {
      setError('Informe um e-mail válido. Exemplo: nome@email.com')
      return
    }

    if (!isValidCpf(form.cpf)) {
      setError('Informe um CPF válido com 11 dígitos.')
      return
    }

    if (form.phone && onlyDigits(form.phone).length !== 11) {
      setError('Informe um telefone válido com 11 dígitos. Exemplo: 71 9 9681-5406')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('As senhas não conferem')
      return
    }

    if (form.password.length < 6) {
      setError('A senha precisa ter pelo menos 6 caracteres')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('http://localhost:3000/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: form.name,
          birth_date: form.birth_date,
          email: form.email.trim(),
          cpf: form.cpf,
          phone: form.phone,
          gender: form.gender,
          password: form.password
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao criar conta')
      }

      setSuccess('Conta criada com sucesso! Redirecionando para o login...')

      setTimeout(() => {
        navigate('/login')
      }, 1500)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h1 style={styles.title}>Create Account</h1>

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}

        <input
          type="text"
          name="name"
          placeholder="Full name"
          value={form.name}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.dateField}>
          {!form.birth_date && !birthDateFocused && (
            <span style={styles.datePlaceholder}>Data de Nascimento</span>
          )}
          <input
            type="date"
            name="birth_date"
            value={form.birth_date}
            onChange={handleChange}
            onFocus={() => setBirthDateFocused(true)}
            onBlur={() => setBirthDateFocused(false)}
            style={{
              ...styles.input,
              ...styles.dateInput,
              ...(form.birth_date || birthDateFocused ? {} : styles.emptyDateInput)
            }}
            required
          />
        </label>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          inputMode="numeric"
          maxLength={14}
          style={styles.input}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          inputMode="numeric"
          maxLength={15}
          style={styles.input}
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          style={styles.input}
        >
          <option value="">Gender</option>
          <option value="M">Male</option>
          <option value="F">Female</option>
          <option value="O">Other</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={form.confirmPassword}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>

        <div style={styles.loginRedirect}>
          Já possui conta?{' '}
          <Link to="/login" style={styles.loginLink}>
            Faça login clicando aqui
          </Link>
        </div>
      </form>
    </main>
  )
}
