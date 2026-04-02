const prisma = require('../../database/prisma')

class PaymentRepository {
  create(data) {
    return prisma.payments.create({
      data,
      select: {
        id: true,
        order_id: true,
        payment_method: true,
        amount: true,
        status: true,
        transaction_id: true,
        paid_at: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findById(id) {
    return prisma.payments.findUnique({
      where: { id },
      select: {
        id: true,
        order_id: true,
        payment_method: true,
        amount: true,
        status: true,
        transaction_id: true,
        paid_at: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findAll() {
    return prisma.payments.findMany({
      select: {
        id: true,
        order_id: true,
        payment_method: true,
        amount: true,
        status: true,
        transaction_id: true,
        paid_at: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findByOrderId(order_id) {
    return prisma.payments.findMany({
      where: { order_id },
      select: {
        id: true,
        order_id: true,
        payment_method: true,
        amount: true,
        status: true,
        transaction_id: true,
        paid_at: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.payments.update({
      where: { id },
      data,
      select: {
        id: true,
        order_id: true,
        payment_method: true,
        amount: true,
        status: true,
        transaction_id: true,
        paid_at: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.payments.delete({
      where: { id }
    })
  }
  findByIdAndUserId(id, user_id) {
  return prisma.payments.findFirst({
    where: {
      id,
      orders: {
        user_id
      }
    },
    select: {
      id: true,
      order_id: true,
      payment_method: true,
      amount: true,
      status: true,
      transaction_id: true,
      paid_at: true,
      created_at: true,
      updated_at: true
    }
  })
}

findByUserId(user_id) {
  return prisma.payments.findMany({
    where: {
      orders: {
        user_id
      }
    },
    select: {
      id: true,
      order_id: true,
      payment_method: true,
      amount: true,
      status: true,
      transaction_id: true,
      paid_at: true,
      created_at: true,
      updated_at: true
    }
  })
}
}

module.exports = new PaymentRepository()