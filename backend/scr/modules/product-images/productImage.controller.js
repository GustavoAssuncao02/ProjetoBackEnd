const productImageService = require('./productImage.service')

class ProductImageController {
  async create(req, res) {
    try {
      const image = await productImageService.createImage(req.body)
      res.status(201).json(image)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async uploadMany(req, res) {
    try {
      const { productId } = req.params
      const { color, display_order } = req.body

      const images = await productImageService.uploadMany(
        productId,
        req.files,
        color,
        display_order
      )

      res.status(201).json(images)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const images = await productImageService.getAllImages()
      res.status(200).json(images)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const image = await productImageService.getImageById(id)
      res.status(200).json(image)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getByProductId(req, res) {
    try {
      const { productId } = req.params
      const images = await productImageService.getImagesByProductId(productId)
      res.status(200).json(images)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getByProductIdAndColor(req, res) {
    try {
      const { productId, color } = req.params
      const images = await productImageService.getImagesByProductIdAndColor(productId, color)
      res.status(200).json(images)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const image = await productImageService.updateImage(id, req.body)
      res.status(200).json(image)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await productImageService.deleteImage(id)
      res.status(200).json({ message: 'Image deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new ProductImageController()