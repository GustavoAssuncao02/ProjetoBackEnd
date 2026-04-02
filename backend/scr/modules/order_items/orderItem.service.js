const orderItemRepository = require('./orderItem.repository')

class OrderItemService {
  async createOrderItem(data) {
    if (!data.order_id) {
      throw new Error('Order id is required')
    }

    if (!data.product_id) {
      throw new Error('Product id is required')
    }

    if (!data.product_name) {
      throw new Error('Product name is required')
    }

    if (data.quantity === undefined || data.quantity === null) {
      throw new Error('Quantity is required')
    }

    if (data.unit_price === undefined || data.unit_price === null) {
      throw new Error('Unit price is required')
    }

    data.order_id = Number(data.order_id)
    data.product_id = Number(data.product_id)
    data.quantity = Number(data.quantity)
    data.unit_price = Number(data.unit_price)

    if (data.variant_id !== undefined && data.variant_id !== null && data.variant_id !== '') {
      data.variant_id = Number(data.variant_id)
    } else {
      delete data.variant_id
    }

    if (Number.isNaN(data.quantity) || data.quantity <= 0) {
      throw new Error('Quantity must be greater than 0')
    }

    if (Number.isNaN(data.unit_price) || data.unit_price < 0) {
      throw new Error('Unit price must be valid')
    }

    data.total_price = data.quantity * data.unit_price

    return orderItemRepository.create(data)
  }

  getAllOrderItems() {
    return orderItemRepository.findAll()
  }

  async getOrderItemById(id) {
    const item = await orderItemRepository.findById(id)

    if (!item) {
      throw new Error('Order item not found')
    }

    return item
  }

  getItemsByOrderId(order_id) {
    return orderItemRepository.findByOrderId(Number(order_id))
  }

  async updateOrderItem(id, data) {
    const existingItem = await orderItemRepository.findById(id)

    if (!existingItem) {
      throw new Error('Order item not found')
    }

    if (data.order_id !== undefined) {
      data.order_id = Number(data.order_id)
    }

    if (data.product_id !== undefined) {
      data.product_id = Number(data.product_id)
    }

    if (data.variant_id !== undefined) {
      if (data.variant_id === null || data.variant_id === '') {
        data.variant_id = null
      } else {
        data.variant_id = Number(data.variant_id)
      }
    }

    if (data.quantity !== undefined) {
      data.quantity = Number(data.quantity)

      if (Number.isNaN(data.quantity) || data.quantity <= 0) {
        throw new Error('Quantity must be greater than 0')
      }
    }

    if (data.unit_price !== undefined) {
      data.unit_price = Number(data.unit_price)

      if (Number.isNaN(data.unit_price) || data.unit_price < 0) {
        throw new Error('Unit price must be valid')
      }
    }

    const quantity = data.quantity !== undefined ? data.quantity : existingItem.quantity
    const unitPrice = data.unit_price !== undefined ? data.unit_price : Number(existingItem.unit_price)

    data.total_price = quantity * unitPrice

    return orderItemRepository.updateById(id, data)
  }

  async deleteOrderItem(id) {
    const item = await orderItemRepository.findById(id)

    if (!item) {
      throw new Error('Order item not found')
    }

    return orderItemRepository.deleteById(id)
  }
}

module.exports = new OrderItemService()