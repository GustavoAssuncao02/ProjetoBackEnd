const prisma = require('../../database/prisma')

class ReviewRepository {
  create(data) {
    return prisma.reviews.create({
      data,
      select: {
        id: true,
        user_id: true,
        product_id: true,
        rating: true,
        comment: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findById(id) {
    return prisma.reviews.findUnique({
      where: { id },
      select: {
        id: true,
        user_id: true,
        product_id: true,
        rating: true,
        comment: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findAll() {
    return prisma.reviews.findMany({
      select: {
        id: true,
        user_id: true,
        product_id: true,
        rating: true,
        comment: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findByProductId(product_id) {
    return prisma.reviews.findMany({
      where: { product_id },
      select: {
        id: true,
        user_id: true,
        product_id: true,
        rating: true,
        comment: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.reviews.update({
      where: { id },
      data,
      select: {
        id: true,
        user_id: true,
        product_id: true,
        rating: true,
        comment: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.reviews.delete({
      where: { id }
    })
  }
    getRatingStats(product_id) {
        return prisma.reviews.aggregate({
            where: { product_id },
            _avg: {
            rating: true
            },
            _count: {
            rating: true
            }
        })
        }

}

module.exports = new ReviewRepository()