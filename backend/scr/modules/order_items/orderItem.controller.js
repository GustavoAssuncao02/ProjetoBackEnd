const orderItemService = require('./orderItem.service')

class OrderItemController {
  async create(req, res) {
    try {
      const item = await orderItemService.createOrderItem(req.body)
      res.status(201).json(item)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const items = await orderItemService.getAllOrderItems()
      res.status(200).json(items)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const item = await orderItemService.getOrderItemById(Number(id))
      res.status(200).json(item)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getByOrderId(req, res) {
    try {
      const { orderId } = req.params
      const items = await orderItemService.getItemsByOrderId(Number(orderId))
      res.status(200).json(items)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const item = await orderItemService.updateOrderItem(Number(id), req.body)
      res.status(200).json(item)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await orderItemService.deleteOrderItem(Number(id))
      res.status(200).json({ message: 'Order item deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new OrderItemController()