const paymentRepository = require('./payment.repository')

class PaymentService {
  async createPayment(data) {
    if (!data.order_id) throw new Error('Order id is required')
    if (!data.payment_method) throw new Error('Payment method is required')
    if (data.amount === undefined || data.amount === null) {
      throw new Error('Amount is required')
    }

    data.order_id = Number(data.order_id)
    data.amount = Number(data.amount)

    if (!data.status) {
      data.status = 'PENDING'
    }

    if (data.paid_at) {
      data.paid_at = new Date(data.paid_at)
    }

    return paymentRepository.create(data)
  }

  getAllPayments() {
    return paymentRepository.findAll()
  }

  async getPaymentById(id) {
    const payment = await paymentRepository.findById(Number(id))

    if (!payment) {
      throw new Error('Payment not found')
    }

    return payment
  }

  getPaymentsByOrderId(order_id) {
    return paymentRepository.findByOrderId(Number(order_id))
  }

  async updatePayment(id, data) {
    const payment = await paymentRepository.findById(Number(id))

    if (!payment) {
      throw new Error('Payment not found')
    }

    if (data.order_id !== undefined) {
      data.order_id = Number(data.order_id)
    }

    if (data.amount !== undefined) {
      data.amount = Number(data.amount)
    }

    if (data.paid_at) {
      data.paid_at = new Date(data.paid_at)
    }

    return paymentRepository.updateById(Number(id), data)
  }

  async deletePayment(id) {
    const payment = await paymentRepository.findById(Number(id))

    if (!payment) {
      throw new Error('Payment not found')
    }

    return paymentRepository.deleteById(Number(id))
  }
  getMyPayments(user_id) {
  return paymentRepository.findByUserId(Number(user_id))
}

async getMyPaymentById(id, user_id) {
  const payment = await paymentRepository.findByIdAndUserId(Number(id), Number(user_id))

  if (!payment) {
    throw new Error('Payment not found')
  }

  return payment
}
}

module.exports = new PaymentService()