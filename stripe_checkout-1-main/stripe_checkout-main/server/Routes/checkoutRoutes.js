
const express = require('express')
const { checkoutController } = require('../Controllers/checkoutController')

const checkoutRouter = express.Router()
.post("/create-checkout-session", checkoutController)

module.exports = { checkoutRouter }