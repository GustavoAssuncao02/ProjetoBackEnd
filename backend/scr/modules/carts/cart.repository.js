const prisma = require('../../database/prisma')

class CartRepository {
  createCart(data) {
    return prisma.carts.create({
      data,
      select: {
        id: true,
        user_id: true,
        status: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findCartById(id) {
    return prisma.carts.findUnique({
      where: { id },
      select: {
        id: true,
        user_id: true,
        status: true,
        created_at: true,
        updated_at: true,
        cart_items: {
          select: {
            id: true,
            product_id: true,
            color: true,
            size: true,
            quantity: true,
            created_at: true,
            updated_at: true
          }
        }
      }
    })
  }

  findAllCarts() {
    return prisma.carts.findMany({
      select: {
        id: true,
        user_id: true,
        status: true,
        created_at: true,
        updated_at: true,
        cart_items: {
          select: {
            id: true,
            product_id: true,
            color: true,
            size: true,
            quantity: true,
            created_at: true,
            updated_at: true
          }
        }
      }
    })
  }

  updateCartById(id, data) {
    return prisma.carts.update({
      where: { id },
      data,
      select: {
        id: true,
        user_id: true,
        status: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteCartById(id) {
    return prisma.carts.delete({
      where: { id }
    })
  }

  createCartItem(data) {
    return prisma.cart_items.create({
      data,
      select: {
        id: true,
        cart_id: true,
        product_id: true,
        color: true,
        size: true,
        quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findCartItemById(id) {
    return prisma.cart_items.findUnique({
      where: { id },
      select: {
        id: true,
        cart_id: true,
        product_id: true,
        color: true,
        size: true,
        quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findCartItemsByCartId(cart_id) {
    return prisma.cart_items.findMany({
      where: { cart_id },
      select: {
        id: true,
        cart_id: true,
        product_id: true,
        color: true,
        size: true,
        quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateCartItemById(id, data) {
    return prisma.cart_items.update({
      where: { id },
      data,
      select: {
        id: true,
        cart_id: true,
        product_id: true,
        color: true,
        size: true,
        quantity: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteCartItemById(id) {
    return prisma.cart_items.delete({
      where: { id }
    })
  }
  findCartByIdAndUserId(id, user_id) {
  return prisma.carts.findFirst({
    where: {
      id,
      user_id
    },
    select: {
      id: true,
      user_id: true,
      status: true,
      created_at: true,
      updated_at: true,
      cart_items: {
        select: {
          id: true,
          product_id: true,
          variant_id: true,
          color: true,
          size: true,
          quantity: true,
          created_at: true,
          updated_at: true
        }
      }
    }
  })
}

findCartsByUserId(user_id) {
  return prisma.carts.findMany({
    where: { user_id },
    select: {
      id: true,
      user_id: true,
      status: true,
      created_at: true,
      updated_at: true,
      cart_items: {
        select: {
          id: true,
          product_id: true,
          variant_id: true,
          color: true,
          size: true,
          quantity: true,
          created_at: true,
          updated_at: true
        }
      }
    }
  })
}
}

module.exports = new CartRepository()