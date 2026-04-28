const variantRepository = require('./variant.repository')
const prisma = require('../../database/prisma')
const { uploadImageToDrive } = require('../../services/googleDrive.service')

class VariantService {
  async syncProductStock(product_id) {
    const totalStock = await variantRepository.getTotalStockByProductId(Number(product_id))
    await variantRepository.updateProductStock(Number(product_id), totalStock)
  }

  async createVariant(data, files) {
    if (!data.product_id) {
      throw new Error('Product id is required')
    }

    if (!data.size) {
      throw new Error('Size is required')
    }

    if (!data.color) {
      throw new Error('Color is required')
    }

    if (data.stock_quantity === undefined || data.stock_quantity === null) {
      throw new Error('Stock quantity is required')
    }

    if (!files || files.length === 0) {
      throw new Error('At least one image is required')
    }

    data.product_id = Number(data.product_id)
    data.stock_quantity = Number(data.stock_quantity)

    const product = await prisma.products.findUnique({
      where: { id: data.product_id }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    const variant = await variantRepository.create({
      product_id: data.product_id,
      size: data.size,
      color: data.color,
      stock_quantity: data.stock_quantity
    })

    const images = []

    for (let index = 0; index < files.length; index++) {
      const uploadedImage = await uploadImageToDrive(files[index], {
        productName: product.name,
        color: data.color,
        size: data.size,
        index
      })

      const image = await variantRepository.createImage({
        variant_id: variant.id,
        image_url: uploadedImage.url,
        color: data.color,
        display_order: index
      })

      images.push(image)
    }

    await this.syncProductStock(data.product_id)

    return {
      ...variant,
      product_images: images
    }
  }

  getAllVariants() {
    return variantRepository.findAll()
  }

  async getVariantById(id) {
    const variant = await variantRepository.findById(Number(id))

    if (!variant) {
      throw new Error('Variant not found')
    }

    return variant
  }

  getVariantsByProductId(product_id) {
    return variantRepository.findByProductId(Number(product_id))
  }

  async updateVariant(id, data) {
    const oldVariant = await variantRepository.findById(Number(id))

    if (!oldVariant) {
      throw new Error('Variant not found')
    }

    const updateData = {}

    if (data.product_id !== undefined && data.product_id !== '') {
      updateData.product_id = Number(data.product_id)
    }

    if (data.size !== undefined) {
      updateData.size = data.size
    }

    if (data.color !== undefined) {
      updateData.color = data.color
    }

    if (data.stock_quantity !== undefined && data.stock_quantity !== '') {
      updateData.stock_quantity = Number(data.stock_quantity)
    }

    const updatedVariant = await variantRepository.updateById(Number(id), updateData)

    await this.syncProductStock(oldVariant.product_id)

    if (updateData.product_id && updateData.product_id !== oldVariant.product_id) {
      await this.syncProductStock(updateData.product_id)
    }

    return updatedVariant
  }

  async deleteVariant(id) {
    const variant = await variantRepository.findById(Number(id))

    if (!variant) {
      throw new Error('Variant not found')
    }

    await variantRepository.deleteById(Number(id))
    await this.syncProductStock(variant.product_id)

    return { message: 'Variant deleted successfully' }
  }
}

module.exports = new VariantService()