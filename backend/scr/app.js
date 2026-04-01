const express = require('express')
const app = express()
const userRoutes = require('./routes/users')
const productRoutes = require('./routes/products')

app.use(express.json())

app.use('/users', userRoutes)
app.use('/products', productRoutes)

module.exports = app