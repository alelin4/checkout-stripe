const express = require('express')
const { ordersController } = require('../Controllers/ordersController')

const orderRouter = express.Router()
.post("/order-session", ordersController)

module.exports = { orderRouter }