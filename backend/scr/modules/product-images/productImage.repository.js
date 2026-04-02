const prisma = require('../../database/prisma')

class ProductImageRepository {
  create(data) {
    return prisma.product_images.create({
      data,
      select: {
        id: true,
        product_id: true,
        image_url: true,
        color: true,
        display_order: true,
        created_at: true
      }
    })
  }

  createMany(data) {
    return prisma.product_images.createMany({
      data
    })
  }

  findById(id) {
    return prisma.product_images.findUnique({
      where: { id },
      select: {
        id: true,
        product_id: true,
        image_url: true,
        color: true,
        display_order: true,
        created_at: true
      }
    })
  }

  findAll() {
    return prisma.product_images.findMany({
      select: {
        id: true,
        product_id: true,
        image_url: true,
        color: true,
        display_order: true,
        created_at: true
      },
      orderBy: [
        { product_id: 'asc' },
        { display_order: 'asc' }
      ]
    })
  }

  findByProductId(product_id) {
    return prisma.product_images.findMany({
      where: { product_id },
      select: {
        id: true,
        product_id: true,
        image_url: true,
        color: true,
        display_order: true,
        created_at: true
      },
      orderBy: {
        display_order: 'asc'
      }
    })
  }

  findByProductIdAndColor(product_id, color) {
    return prisma.product_images.findMany({
      where: {
        product_id,
        color
      },
      select: {
        id: true,
        product_id: true,
        image_url: true,
        color: true,
        display_order: true,
        created_at: true
      },
      orderBy: {
        display_order: 'asc'
      }
    })
  }

  updateById(id, data) {
    return prisma.product_images.update({
      where: { id },
      data,
      select: {
        id: true,
        product_id: true,
        image_url: true,
        color: true,
        display_order: true,
        created_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.product_images.delete({
      where: { id }
    })
  }
}

module.exports = new ProductImageRepository()