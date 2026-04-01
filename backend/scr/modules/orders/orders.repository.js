const prisma = require('../../database/prisma')

class OrderRepository {
  create(data) {
    return prisma.orders.create({
      data,
      select: {
        id: true,
        user_id: true,
        status: true,
        total_amount: true,
        payment_method: true,
        installment_quantity: true,
        shipping_address: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findById(id) {
    return prisma.orders.findUnique({
      where: { id },
      select: {
        id: true,
        user_id: true,
        status: true,
        total_amount: true,
        payment_method: true,
        installment_quantity: true,
        shipping_address: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findAll() {
    return prisma.orders.findMany({
      select: {
        id: true,
        user_id: true,
        status: true,
        total_amount: true,
        payment_method: true,
        installment_quantity: true,
        shipping_address: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.orders.update({
      where: { id },
      data,
      select: {
        id: true,
        user_id: true,
        status: true,
        total_amount: true,
        payment_method: true,
        installment_quantity: true,
        shipping_address: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.orders.delete({
      where: { id }
    })
  }
}

module.exports = new OrderRepository()