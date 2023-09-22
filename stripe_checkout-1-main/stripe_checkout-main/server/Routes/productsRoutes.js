
const express = require('express')
const { getAllProducts } = require('../Controllers/productsContollers')


    const productRouter = express.Router()
    .get("/all-products", getAllProducts)

    module.exports = { productRouter }