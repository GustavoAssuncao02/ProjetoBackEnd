const productService = require('./product.service')

class ProductController {
  async create(req, res) {
    try {
      const product = await productService.createProduct(req.body)
      res.status(201).json(product)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const products = await productService.getAllProducts()
      res.status(200).json(products)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const product = await productService.getProductById(Number(id))
      res.status(200).json(product)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const product = await productService.updateProduct(Number(id), req.body)
      res.status(200).json(product)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await productService.deleteProduct(Number(id))
      res.status(200).json({ message: 'Product deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new ProductController()