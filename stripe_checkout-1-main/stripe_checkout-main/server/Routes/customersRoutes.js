const express = require('express')
const { register, login } = require('../Controllers/customersController')

const userRouter = express.Router()
.post("/user/register", register)
.post("/user/login", login)


module.exports = { userRouter }