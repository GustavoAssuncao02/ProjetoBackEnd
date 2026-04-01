const cartService = require('./cart.service')

class CartController {
  async create(req, res) {
    try {
      const cart = await cartService.createCart(req.body)
      res.status(201).json(cart)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getAll(req, res) {
    try {
      const carts = await cartService.getAllCarts()
      res.status(200).json(carts)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getById(req, res) {
    try {
      const { id } = req.params
      const cart = await cartService.getCartById(Number(id))
      res.status(200).json(cart)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params
      const cart = await cartService.updateCart(Number(id), req.body)
      res.status(200).json(cart)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params
      await cartService.deleteCart(Number(id))
      res.status(200).json({ message: 'Cart deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async addItem(req, res) {
    try {
      const item = await cartService.addItem(req.body)
      res.status(201).json(item)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async getItemsByCartId(req, res) {
    try {
      const { cartId } = req.params
      const items = await cartService.getItemsByCartId(Number(cartId))
      res.status(200).json(items)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async updateItem(req, res) {
    try {
      const { id } = req.params
      const item = await cartService.updateItem(Number(id), req.body)
      res.status(200).json(item)
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }

  async deleteItem(req, res) {
    try {
      const { id } = req.params
      await cartService.deleteItem(Number(id))
      res.status(200).json({ message: 'Cart item deleted successfully' })
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  }
}

module.exports = new CartController()