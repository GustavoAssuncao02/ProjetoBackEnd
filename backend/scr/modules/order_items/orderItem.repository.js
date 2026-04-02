const prisma = require('../../database/prisma')

class OrderItemRepository {
  create(data) {
    return prisma.order_items.create({
      data,
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        created_at: true
      }
    })
  }

  findById(id) {
    return prisma.order_items.findUnique({
      where: { id },
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        created_at: true
      }
    })
  }

  findAll() {
    return prisma.order_items.findMany({
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        created_at: true
      }
    })
  }

  findByOrderId(order_id) {
    return prisma.order_items.findMany({
      where: { order_id },
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        created_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.order_items.update({
      where: { id },
      data,
      select: {
        id: true,
        order_id: true,
        product_id: true,
        variant_id: true,
        product_name: true,
        size: true,
        color: true,
        quantity: true,
        unit_price: true,
        total_price: true,
        created_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.order_items.delete({
      where: { id }
    })
  }
}

module.exports = new OrderItemRepository()