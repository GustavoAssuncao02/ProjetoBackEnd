const prisma = require('../../database/prisma')

class ProductRepository {
  create(data) {
    return prisma.products.create({
      data,
      select: {
        id: true,
        name: true,
        description: true,
        old_price: true,
        current_price: true,
        stock_quantity: true,
        category_id: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findById(id) {
    return prisma.products.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        old_price: true,
        current_price: true,
        stock_quantity: true,
        category_id: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findAll() {
    return prisma.products.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        old_price: true,
        current_price: true,
        stock_quantity: true,
        category_id: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.products.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        description: true,
        old_price: true,
        current_price: true,
        stock_quantity: true,
        category_id: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.products.delete({
      where: { id }
    })
  }
}

module.exports = new ProductRepository()