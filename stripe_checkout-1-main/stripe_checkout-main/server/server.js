require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieSession = require('cookie-session')
const { checkoutRouter } = require("./Routes/checkoutRoutes")
const { userRouter } = require("./Routes/customersRoutes");
const { productRouter } = require('./Routes/productsRoutes');
const { orderRouter } = require("./Routes/orderRoutes");


const app = express();
app.use(express.json());


//Middlewares
app.use(
  cors({
    origin: "*",
  })
  );
  
  app.use(
    cookieSession({
      name: "session",
      keys: ["aVeryS3cr3tK3y"],
      maxAge: 1000 * 60 * 60 * 24, // 24 Hours
      sameSite: "strict",
      httpOnly: true,
      secure: false,
    })
    );
    
  app.use("/api", userRouter)
  app.use("/api", userRouter)
  app.use("/api", productRouter)
  app.use("/api", checkoutRouter)
  app.use("/api", orderRouter)


app.listen(3000, () => console.log("Server is up and running port 3000.."));
