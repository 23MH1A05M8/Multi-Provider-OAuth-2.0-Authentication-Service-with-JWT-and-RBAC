require("dotenv").config()

const express = require("express")
const passport = require("./services/passport")

const authRoutes = require("./routes/authRoutes")
const userRoutes = require("./routes/userRoutes")

const app = express()

app.use(express.json())

app.use(passport.initialize())

app.get("/health",(req,res)=>{
 res.json({status:"OK"})
})

app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)


module.exports = app