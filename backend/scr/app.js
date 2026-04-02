const express = require('express')
const app = express()

const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/categories')
const cartRoutes = require('./routes/carts')
const orderRoutes = require('./routes/Orders')
const reviewRoutes = require('./routes/reviews')
const variantRoutes = require('./routes/variants')
const cartItemRoutes = require('./routes/cart_items')
const orderItemRoutes = require('./routes/orderitems')

app.use('/order-items', orderItemRoutes)
app.use(express.json())
app.use('/reviews', reviewRoutes)
app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/carts', cartRoutes)
app.use('/orders', orderRoutes)
app.use('/variants', variantRoutes)
app.use('/cart-items', cartItemRoutes)


module.exports = app