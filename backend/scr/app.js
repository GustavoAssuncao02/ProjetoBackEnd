const express = require('express')
const app = express()

const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')
const categoryRoutes = require('./routes/categories')
const cartRoutes = require('./routes/carts')
const orderRoutes = require('./routes/Orders')




app.use(express.json())

app.use('/users', userRoutes)
app.use('/products', productRoutes)
app.use('/categories', categoryRoutes)
app.use('/carts', cartRoutes)
app.use('/orders', orderRoutes)

module.exports = app