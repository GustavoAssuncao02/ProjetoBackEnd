const prisma = require('../../database/prisma')

class OrderRepository {
  create(data) {
    return prisma.orders.create({
      data,
      select: {
        id: true,
        user_id: true,
        address_id: true,
        status: true,
        total_amount: true,
        payment_method: true,
        installment_quantity: true,
        shipping_address: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findById(id) {
    return prisma.orders.findUnique({
      where: { id },
      select: {
        id: true,
        user_id: true,
        address_id: true,
        status: true,
        total_amount: true,
        payment_method: true,
        installment_quantity: true,
        shipping_address: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  findAll() {
    return prisma.orders.findMany({
      select: {
        id: true,
        user_id: true,
        address_id: true,
        status: true,
        total_amount: true,
        payment_method: true,
        installment_quantity: true,
        shipping_address: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  updateById(id, data) {
    return prisma.orders.update({
      where: { id },
      data,
      select: {
        id: true,
        user_id: true,
        address_id: true,
        status: true,
        total_amount: true,
        payment_method: true,
        installment_quantity: true,
        shipping_address: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  deleteById(id) {
    return prisma.orders.delete({
      where: { id }
    })
  }

  async checkout(data) {
    const {
      user_id,
      cart_id,
      address_id,
      payment_method,
      installment_quantity,
      transaction_id
    } = data

    return prisma.$transaction(async (tx) => {
      const cart = await tx.carts.findUnique({
        where: { id: cart_id }
      })

      if (!cart) {
        throw new Error('Cart not found')
      }

      if (cart.user_id !== user_id) {
        throw new Error('Cart does not belong to this user')
      }

      const address = await tx.addresses.findUnique({
        where: { id: address_id }
      })

      if (!address) {
        throw new Error('Address not found')
      }

      if (address.user_id !== user_id) {
        throw new Error('Address does not belong to this user')
      }

      const cartItems = await tx.cart_items.findMany({
        where: { cart_id }
      })

      if (!cartItems.length) {
        throw new Error('Cart is empty')
      }

      const productIds = cartItems.map(item => item.product_id)

      const products = await tx.products.findMany({
        where: {
          id: { in: productIds }
        },
        include: {
          subcategory: true
        }
      })

      const productMap = new Map(products.map(product => [product.id, product]))

      let totalAmount = 0

      const preparedItems = cartItems.map(item => {
        const product = productMap.get(item.product_id)

        if (!product) {
          throw new Error(`Product ${item.product_id} not found`)
        }

        const unitPrice = Number(product.price)
        const totalPrice = Number((unitPrice * item.quantity).toFixed(2))

        totalAmount += totalPrice

        return {
          product_id: item.product_id,
          variant_id: item.variant_id ?? null,
          product_name: product.name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          unit_price: unitPrice,
          total_price: totalPrice
        }
      })

      const shippingAddress = `${address.street}, ${address.number}${address.complement ? ' - ' + address.complement : ''}, ${address.neighborhood}, ${address.city} - ${address.state}, ${address.zip_code}, ${address.country}`

      const order = await tx.orders.create({
        data: {
          user_id,
          address_id,
          status: 'PENDING',
          total_amount: totalAmount,
          payment_method,
          installment_quantity,
          shipping_address: shippingAddress
        }
      })

      await tx.order_items.createMany({
        data: preparedItems.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          variant_id: item.variant_id,
          product_name: item.product_name,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price
        }))
      })

      const paymentStatus = payment_method === 'PIX' ? 'APPROVED' : 'PENDING'

      const payment = await tx.payments.create({
        data: {
          order_id: order.id,
          payment_method,
          amount: totalAmount,
          status: paymentStatus,
          transaction_id: transaction_id || null,
          paid_at: paymentStatus === 'APPROVED' ? new Date() : null
        }
      })

      await tx.sales.createMany({
        data: preparedItems.map(item => ({
          order_id: order.id,
          product_id: item.product_id,
          variant_id: item.variant_id,
          product_name: item.product_name,
          product_category: null,
          size: item.size,
          color: item.color,
          quantity: item.quantity,
          unit_price: item.unit_price,
          total_price: item.total_price,
          customer_id: user_id
        }))
      })

      for (const item of cartItems) {
        const product = productMap.get(item.product_id)

        await tx.products.update({
          where: { id: item.product_id },
          data: {
            stock_quantity: product.stock_quantity - item.quantity
          }
        })
      }

      await tx.cart_items.deleteMany({
        where: { cart_id }
      })

      await tx.carts.update({
        where: { id: cart_id },
        data: {
          status: 'CLOSED'
        }
      })

      return {
        order,
        payment
      }
    })
  }
}

module.exports = new OrderRepository()