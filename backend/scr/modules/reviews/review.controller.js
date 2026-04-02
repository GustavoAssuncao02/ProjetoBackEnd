const reviewService = require('./review.service')

class ReviewController {
  async create(req, res) {
    try {
      const review = await reviewService.createReview(req.body)
      res.status(201).json(review)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const reviews = await reviewService.getAllReviews()
      res.status(200).json(reviews)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const review = await reviewService.getReviewById(Number(id))
      res.status(200).json(review)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getByProductId(req, res) {
    try {
      const { productId } = req.params
      const reviews = await reviewService.getReviewsByProductId(Number(productId))
      res.status(200).json(reviews)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const review = await reviewService.updateReview(Number(id), req.body)
      res.status(200).json(review)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await reviewService.deleteReview(Number(id))
      res.status(200).json({ message: 'Review deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
    async getRatingStats(req, res) {
        try {
            const { productId } = req.params

            const stats = await reviewService.getProductRatingStats(productId)

            res.json(stats)
        } catch (err) {
            res.status(400).json({ error: err.message })
        }
        }
}

module.exports = new ReviewController()