const orderRepository = require('./orders.repository')

class OrderService {
  async createOrder(data) {
    if (!data.user_id) {
      throw new Error('User id is required')
    }

    if (!data.address_id) {
      throw new Error('Address id is required')
    }

    if (data.total_amount === undefined || data.total_amount === null) {
      throw new Error('Total amount is required')
    }

    if (!data.payment_method) {
      throw new Error('Payment method is required')
    }

    data.user_id = Number(data.user_id)
    data.address_id = Number(data.address_id)
    data.total_amount = Number(data.total_amount)

    if (data.installment_quantity === undefined || data.installment_quantity === null) {
      data.installment_quantity = 1
    }

    data.installment_quantity = Number(data.installment_quantity)

    if (!data.status) {
      data.status = 'PENDING'
    }

    return orderRepository.create(data)
  }

  getAllOrders() {
    return orderRepository.findAll()
  }

  async getOrderById(id) {
    const order = await orderRepository.findById(id)

    if (!order) {
      throw new Error('Order not found')
    }

    return order
  }

  async updateOrder(id, data) {
    const order = await orderRepository.findById(id)

    if (!order) {
      throw new Error('Order not found')
    }

    if (data.user_id !== undefined) {
      data.user_id = Number(data.user_id)
    }

    if (data.address_id !== undefined) {
      data.address_id = Number(data.address_id)
    }

    if (data.total_amount !== undefined) {
      data.total_amount = Number(data.total_amount)
    }

    if (data.installment_quantity !== undefined) {
      data.installment_quantity = Number(data.installment_quantity)
    }

    return orderRepository.updateById(id, data)
  }

  async deleteOrder(id) {
    const order = await orderRepository.findById(id)

    if (!order) {
      throw new Error('Order not found')
    }

    return orderRepository.deleteById(id)
  }

  async checkout(data) {
    if (!data.user_id) {
      throw new Error('User id is required')
    }

    if (!data.cart_id) {
      throw new Error('Cart id is required')
    }

    if (!data.address_id) {
      throw new Error('Address id is required')
    }

    if (!data.payment_method) {
      throw new Error('Payment method is required')
    }

    data.user_id = Number(data.user_id)
    data.cart_id = Number(data.cart_id)
    data.address_id = Number(data.address_id)

    if (!data.installment_quantity) {
      data.installment_quantity = 1
    }

    data.installment_quantity = Number(data.installment_quantity)

    return orderRepository.checkout(data)
  }
}

module.exports = new OrderService()