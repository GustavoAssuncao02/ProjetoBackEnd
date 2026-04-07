import { useEffect, useState } from 'react'
import styles from './ProductReviews.styles'

export default function ProductReviews({ productId }) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  const [reviews, setReviews] = useState([])
  const [stats, setStats] = useState({ average: 0, totalReviews: 0 })
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    rating: '',
    comment: ''
  })

  useEffect(() => {
    if (productId) {
      loadReviews()
      loadStats()
    }
  }, [productId])

  async function loadReviews() {
    try {
      const response = await fetch(`http://localhost:3000/reviews/product/${productId}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error loading reviews')
      }

      setReviews(data)
    } catch (error) {
      setMessage(error.message)
    }
  }

  async function loadStats() {
    try {
      const response = await fetch(`http://localhost:3000/reviews/product/${productId}/stats`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error loading review stats')
      }

      setStats(data)
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
      if (!user?.id) {
        throw new Error('User not found in localStorage')
      }

      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: user.id,
          product_id: Number(productId),
          rating: Number(formData.rating),
          comment: formData.comment
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error creating review')
      }

      setMessage('Review created successfully!')
      setFormData({
        rating: '',
        comment: ''
      })

      loadReviews()
      loadStats()
    } catch (error) {
      setMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <div style={styles.container}>
        <div style={styles.loginBox}>
          <h1>Login required</h1>
          <p>You need to be logged in to review this product.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Product Reviews</h1>

        {message && <p style={styles.message}>{message}</p>}

        <p style={{ marginBottom: '20px', textAlign: 'center' }}>
          Average: <strong>{Number(stats.average || 0).toFixed(1)}</strong> | Total Reviews:{' '}
          <strong>{stats.totalReviews || 0}</strong>
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <select
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select rating</option>
            <option value="1">1 star</option>
            <option value="2">2 stars</option>
            <option value="3">3 stars</option>
            <option value="4">4 stars</option>
            <option value="5">5 stars</option>
          </select>

          <textarea
            name="comment"
            placeholder="Write your review"
            value={formData.comment}
            onChange={handleChange}
            style={styles.textarea}
          />

          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Saving...' : 'Submit Review'}
          </button>
        </form>

        <div>
          {reviews.map((review) => (
            <div key={review.id} style={styles.reviewCard}>
              <div style={styles.reviewHeader}>
                <span>Rating: {review.rating}/5</span>
                <span>{review.created_at ? new Date(review.created_at).toLocaleDateString() : ''}</span>
              </div>

              <div>
                {review.comment || 'No comment'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}