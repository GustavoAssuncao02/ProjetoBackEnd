const variantService = require('./variant.service')

class VariantController {
  async create(req, res) {
    try {
      const variant = await variantService.createVariant(req.body, req.files)
      res.status(201).json(variant)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const variants = await variantService.getAllVariants()
      res.status(200).json(variants)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const variant = await variantService.getVariantById(id)
      res.status(200).json(variant)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getByProductId(req, res) {
    try {
      const { productId } = req.params
      const variants = await variantService.getVariantsByProductId(productId)
      res.status(200).json(variants)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const variant = await variantService.updateVariant(id, req.body)
      res.status(200).json(variant)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      const result = await variantService.deleteVariant(id)
      res.status(200).json(result)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new VariantController()