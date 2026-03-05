const express = require("express")
const loginLimiter = require("../middleware/rateLimiter")
const router = express.Router()
const passport = require("../services/passport")
const jwt = require("jsonwebtoken")

const authController = require("../controllers/authController")

router.post("/register",authController.register)

router.post("/login",
 loginLimiter,
 authController.login
)

router.post("/refresh",authController.refresh)
router.get(
 "/google",
 passport.authenticate("google",{scope:["profile","email"]})
)

router.get(
 "/google/callback",
 passport.authenticate("google",{session:false}),
 (req,res)=>{

  const token = jwt.sign(
   {id:req.user.id,role:req.user.role},
   process.env.JWT_SECRET,
   {expiresIn:process.env.JWT_EXPIRATION}
  )

  res.json({accessToken:token})
 }
)

router.get(
 "/github",
 passport.authenticate("github",{scope:["user:email"]})
)

router.get(
 "/github/callback",
 passport.authenticate("github",{session:false}),
 (req,res)=>{

  const token = jwt.sign(
   {id:req.user.id,role:req.user.role},
   process.env.JWT_SECRET,
   {expiresIn:process.env.JWT_EXPIRATION}
  )

  res.json({accessToken:token})
 }
)

module.exports = router