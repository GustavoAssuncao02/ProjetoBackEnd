const cartItemService = require('./cartItem.service')

class CartItemController {
  async create(req, res) {
    try {
      const item = await cartItemService.createCartItem(req.body)
      res.status(201).json(item)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const items = await cartItemService.getAllCartItems()
      res.status(200).json(items)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const item = await cartItemService.getCartItemById(Number(id))
      res.status(200).json(item)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getByCartId(req, res) {
    try {
      const { cartId } = req.params
      const items = await cartItemService.getItemsByCartId(Number(cartId))
      res.status(200).json(items)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const item = await cartItemService.updateCartItem(Number(id), req.body)
      res.status(200).json(item)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await cartItemService.deleteCartItem(Number(id))
      res.status(200).json({ message: 'Cart item deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new CartItemController()