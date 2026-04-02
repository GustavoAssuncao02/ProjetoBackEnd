const paymentService = require('./payment.service')

class PaymentController {
  async create(req, res) {
    try {
      const payment = await paymentService.createPayment(req.body)
      res.status(201).json(payment)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const payments = await paymentService.getAllPayments()
      res.status(200).json(payments)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const payment = await paymentService.getPaymentById(id)
      res.status(200).json(payment)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getByOrderId(req, res) {
    try {
      const { orderId } = req.params
      const payments = await paymentService.getPaymentsByOrderId(orderId)
      res.status(200).json(payments)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const payment = await paymentService.updatePayment(id, req.body)
      res.status(200).json(payment)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await paymentService.deletePayment(id)
      res.status(200).json({ message: 'Payment deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new PaymentController()