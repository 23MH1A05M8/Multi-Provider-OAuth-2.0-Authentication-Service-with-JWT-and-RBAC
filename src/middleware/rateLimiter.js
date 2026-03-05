const rateLimit = require("express-rate-limit")

const loginLimiter = rateLimit({

 windowMs: 60 * 1000,
 max: 10,

 message:{
  error:"Too many login attempts. Try again later."
 }

})

module.exports = loginLimiter