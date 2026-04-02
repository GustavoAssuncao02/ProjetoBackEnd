const prisma = require('../../database/prisma')

class CartItemRepository {
  create(data) {
    return prisma.cart_items.create({
      data,
      select: {
        id: true,
        cart_id: true,
        product_id: true,
        color: true,
        size: true,
        quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findById(id) {
    return prisma.cart_items.findUnique({
      where: { id },
      select: {
        id: true,
        cart_id: true,
        product_id: true,
        color: true,
        size: true,
        quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findAll() {
    return prisma.cart_items.findMany({
      select: {
        id: true,
        cart_id: true,
        product_id: true,
        color: true,
        size: true,
        quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findByCartId(cart_id) {
    return prisma.cart_items.findMany({
      where: { cart_id },
      select: {
        id: true,
        cart_id: true,
        product_id: true,
        color: true,
        size: true,
        quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.cart_items.update({
      where: { id },
      data,
      select: {
        id: true,
        cart_id: true,
        product_id: true,
        color: true,
        size: true,
        quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.cart_items.delete({
      where: { id }
    })
  }
}

module.exports = new CartItemRepository()