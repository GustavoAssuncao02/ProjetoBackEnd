const saleService = require('./sales.service')

class SaleController {
  async create(req, res) {
    try {
      const sale = await saleService.createSale(req.body)
      res.status(201).json(sale)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const sales = await saleService.getAllSales()
      res.status(200).json(sales)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const sale = await saleService.getSaleById(Number(id))
      res.status(200).json(sale)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getByOrderId(req, res) {
    try {
      const { orderId } = req.params
      const sales = await saleService.getSalesByOrderId(Number(orderId))
      res.status(200).json(sales)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getByCustomerId(req, res) {
    try {
      const { customerId } = req.params
      const sales = await saleService.getSalesByCustomerId(Number(customerId))
      res.status(200).json(sales)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const sale = await saleService.updateSale(Number(id), req.body)
      res.status(200).json(sale)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await saleService.deleteSale(Number(id))
      res.status(200).json({ message: 'Sale deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new SaleController()