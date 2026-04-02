const prisma = require('../../database/prisma')

class VariantRepository {
  create(data) {
    return prisma.variants.create({
      data,
      select: {
        id: true,
        product_id: true,
        size: true,
        color: true,
        stock_quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findById(id) {
    return prisma.variants.findUnique({
      where: { id },
      select: {
        id: true,
        product_id: true,
        size: true,
        color: true,
        stock_quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findAll() {
    return prisma.variants.findMany({
      select: {
        id: true,
        product_id: true,
        size: true,
        color: true,
        stock_quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findByProductId(product_id) {
    return prisma.variants.findMany({
      where: { product_id },
      select: {
        id: true,
        product_id: true,
        size: true,
        color: true,
        stock_quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.variants.update({
      where: { id },
      data,
      select: {
        id: true,
        product_id: true,
        size: true,
        color: true,
        stock_quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.variants.delete({
      where: { id }
    })
  }
}

module.exports = new VariantRepository()