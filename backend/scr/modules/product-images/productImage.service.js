const fs = require('fs')
const path = require('path')
const productImageRepository = require('./productImage.repository')
const prisma = require('../../database/prisma')

class ProductImageService {
  async createImage(data) {
    if (!data.product_id) {
      throw new Error('Product id is required')
    }

    if (!data.image_url) {
      throw new Error('Image url is required')
    }

    data.product_id = Number(data.product_id)

    const product = await prisma.products.findUnique({
      where: { id: data.product_id }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    if (data.display_order !== undefined) {
      data.display_order = Number(data.display_order)
    } else {
      data.display_order = 0
    }

    return productImageRepository.create(data)
  }

  async uploadMany(product_id, files, color, display_order = 0) {
    product_id = Number(product_id)

    const product = await prisma.products.findUnique({
      where: { id: product_id }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    if (!files || files.length === 0) {
      throw new Error('No images sent')
    }

    const baseOrder = Number(display_order) || 0

    const data = files.map((file, index) => ({
      product_id,
      image_url: `/uploads/products/${file.filename}`,
      color: color || null,
      display_order: baseOrder + index
    }))

    await productImageRepository.createMany(data)

    return productImageRepository.findByProductId(product_id)
  }

  getAllImages() {
    return productImageRepository.findAll()
  }

  async getImageById(id) {
    const image = await productImageRepository.findById(Number(id))

    if (!image) {
      throw new Error('Image not found')
    }

    return image
  }

  getImagesByProductId(product_id) {
    return productImageRepository.findByProductId(Number(product_id))
  }

  getImagesByProductIdAndColor(product_id, color) {
    return productImageRepository.findByProductIdAndColor(Number(product_id), color)
  }

  async updateImage(id, data) {
    const image = await productImageRepository.findById(Number(id))

    if (!image) {
      throw new Error('Image not found')
    }

    if (data.product_id !== undefined) {
      data.product_id = Number(data.product_id)
    }

    if (data.display_order !== undefined) {
      data.display_order = Number(data.display_order)
    }

    return productImageRepository.updateById(Number(id), data)
  }

  async deleteImage(id) {
    const image = await productImageRepository.findById(Number(id))

    if (!image) {
      throw new Error('Image not found')
    }

    const filePath = path.resolve(__dirname, '../../../uploads/products', path.basename(image.image_url))

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath)
    }

    return productImageRepository.deleteById(Number(id))
  }
}

module.exports = new ProductImageService()