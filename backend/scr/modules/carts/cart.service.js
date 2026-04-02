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
  getMyCarts(user_id) {
  return cartRepository.findCartsByUserId(Number(user_id))
}

async getMyCartById(id, user_id) {
  const cart = await cartRepository.findCartByIdAndUserId(Number(id), Number(user_id))

  if (!cart) {
    throw new Error('Cart not found')
  }

  return cart
}

async updateMyCart(id, user_id, data) {
  const cart = await cartRepository.findCartByIdAndUserId(Number(id), Number(user_id))

  if (!cart) {
    throw new Error('Cart not found')
  }

  delete data.user_id

  return cartRepository.updateCartById(Number(id), data)
}

async deleteMyCart(id, user_id) {
  const cart = await cartRepository.findCartByIdAndUserId(Number(id), Number(user_id))

  if (!cart) {
    throw new Error('Cart not found')
  }

  return cartRepository.deleteCartById(Number(id))
}
}

module.exports = new CartController()