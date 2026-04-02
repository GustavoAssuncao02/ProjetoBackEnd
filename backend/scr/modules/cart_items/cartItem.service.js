const cartItemRepository = require('./cartItem.repository')

class CartItemService {
  async createCartItem(data) {
    if (!data.cart_id) {
      throw new Error('Cart id is required')
    }

    if (!data.product_id) {
      throw new Error('Product id is required')
    }

    if (!data.color) {
      throw new Error('Color is required')
    }

    if (!data.size) {
      throw new Error('Size is required')
    }

    if (data.quantity === undefined || data.quantity === null) {
      throw new Error('Quantity is required')
    }

    data.cart_id = Number(data.cart_id)
    data.product_id = Number(data.product_id)
    data.quantity = Number(data.quantity)

    if (data.quantity < 1) {
      throw new Error('Quantity must be at least 1')
    }

    return cartItemRepository.create(data)
  }

  getAllCartItems() {
    return cartItemRepository.findAll()
  }

  async getCartItemById(id) {
    const item = await cartItemRepository.findById(id)

    if (!item) {
      throw new Error('Cart item not found')
    }

    return item
  }

  getItemsByCartId(cart_id) {
    return cartItemRepository.findByCartId(Number(cart_id))
  }

  async updateCartItem(id, data) {
    const item = await cartItemRepository.findById(id)

    if (!item) {
      throw new Error('Cart item not found')
    }

    if (data.cart_id !== undefined) {
      data.cart_id = Number(data.cart_id)
    }

    if (data.product_id !== undefined) {
      data.product_id = Number(data.product_id)
    }

    if (data.quantity !== undefined) {
      data.quantity = Number(data.quantity)

      if (data.quantity < 1) {
        throw new Error('Quantity must be at least 1')
      }
    }

    return cartItemRepository.updateById(id, data)
  }

  async deleteCartItem(id) {
    const item = await cartItemRepository.findById(id)

    if (!item) {
      throw new Error('Cart item not found')
    }

    return cartItemRepository.deleteById(id)
  }
}

module.exports = new CartItemService()