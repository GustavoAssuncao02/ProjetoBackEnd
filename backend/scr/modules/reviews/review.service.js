const reviewRepository = require('./review.repository')

class ReviewService {
  async createReview(data) {
    if (!data.user_id) {
      throw new Error('User id is required')
    }

    if (!data.product_id) {
      throw new Error('Product id is required')
    }

    if (data.rating === undefined || data.rating === null) {
      throw new Error('Rating is required')
    }

    data.user_id = Number(data.user_id)
    data.product_id = Number(data.product_id)
    data.rating = Number(data.rating)

    if (data.rating < 1 || data.rating > 5) {
      throw new Error('Rating must be between 1 and 5')
    }

    return reviewRepository.create(data)
  }

  getAllReviews() {
    return reviewRepository.findAll()
  }

  async getReviewById(id) {
    const review = await reviewRepository.findById(id)

    if (!review) {
      throw new Error('Review not found')
    }

    return review
  }

  getReviewsByProductId(product_id) {
    return reviewRepository.findByProductId(Number(product_id))
  }

  async updateReview(id, data) {
    const review = await reviewRepository.findById(id)

    if (!review) {
      throw new Error('Review not found')
    }

    if (data.user_id !== undefined) {
      data.user_id = Number(data.user_id)
    }

    if (data.product_id !== undefined) {
      data.product_id = Number(data.product_id)
    }

    if (data.rating !== undefined) {
      data.rating = Number(data.rating)

      if (data.rating < 1 || data.rating > 5) {
        throw new Error('Rating must be between 1 and 5')
      }
    }

    return reviewRepository.updateById(id, data)
  }

  async deleteReview(id) {
    const review = await reviewRepository.findById(id)

    if (!review) {
      throw new Error('Review not found')
    }

    return reviewRepository.deleteById(id)
  }
    async getProductRatingStats(product_id) {
        const result = await reviewRepository.getRatingStats(Number(product_id))

        return {
            average: result._avg.rating || 0,
            totalReviews: result._count.rating
        }
        }
}

module.exports = new ReviewService()