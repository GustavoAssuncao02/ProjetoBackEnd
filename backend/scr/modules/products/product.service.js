const productRepository = require('./product.repository')

class ProductService {
  async createProduct(data) {
    if (!data.name) {
      throw new Error('Name is required')
    }

    if (data.current_price === undefined || data.current_price === null) {
      throw new Error('Current price is required')
    }

    if (data.category_id === undefined || data.category_id === null) {
      throw new Error('Category id is required')
    }

    if (data.material_id === undefined || data.material_id === null || data.material_id === '') {
      throw new Error('Material id is required')
    }

    delete data.material
    data.current_price = Number(data.current_price)
    data.category_id = Number(data.category_id)
    data.material_id = Number(data.material_id)

    if (data.subcategory_id !== undefined && data.subcategory_id !== null && data.subcategory_id !== '') {
      data.subcategory_id = Number(data.subcategory_id)
    } else {
      data.subcategory_id = null
    }

    if (data.old_price !== undefined && data.old_price !== null && data.old_price !== '') {
      data.old_price = Number(data.old_price)
    } else {
      data.old_price = null
    }

    data.stock_quantity = 0

    return productRepository.create(data)
  }

  getAllProducts() {
    return productRepository.findAll()
  }

  async getProductById(id) {
    const product = await productRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    return product
  }

  async updateProduct(id, data) {
    const product = await productRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    if (data.current_price !== undefined) {
      data.current_price = Number(data.current_price)
    }

    if (data.old_price !== undefined) {
      if (data.old_price === '' || data.old_price === null) {
        data.old_price = null
      } else {
        data.old_price = Number(data.old_price)
      }
    }

    if (data.category_id !== undefined) {
      data.category_id = Number(data.category_id)
    }

    if (data.subcategory_id !== undefined) {
      data.subcategory_id =
        data.subcategory_id === '' || data.subcategory_id === null ? null : Number(data.subcategory_id)
    }

    if (data.material_id !== undefined) {
      if (data.material_id === '' || data.material_id === null) {
        throw new Error('Material id is required')
      }

      data.material_id = Number(data.material_id)
    }

    delete data.material
    delete data.stock_quantity

    return productRepository.updateById(id, data)
  }

  async deleteProduct(id) {
    const product = await productRepository.findById(id)

    if (!product) {
      throw new Error('Product not found')
    }

    return productRepository.deleteById(id)
  }
}

module.exports = new ProductService()
