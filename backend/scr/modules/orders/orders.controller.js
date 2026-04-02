const orderService = require('./orders.service')

class OrderController {
  async create(req, res) {
    try {
      const order = await orderService.createOrder(req.body)
      res.status(201).json(order)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const orders = await orderService.getAllOrders()
      res.status(200).json(orders)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const order = await orderService.getOrderById(Number(id))
      res.status(200).json(order)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const order = await orderService.updateOrder(Number(id), req.body)
      res.status(200).json(order)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await orderService.deleteOrder(Number(id))
      res.status(200).json({ message: 'Order deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async checkout(req, res) {
    try {
      const result = await orderService.checkout(req.body)
      res.status(201).json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new OrderController()