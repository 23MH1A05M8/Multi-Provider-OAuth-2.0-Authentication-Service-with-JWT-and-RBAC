const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const pool = require("../db/db")

async function registerUser(name, email, password) {

 const hashedPassword = await bcrypt.hash(password, 10)

 const result = await pool.query(
  `INSERT INTO users (name,email,password_hash)
   VALUES ($1,$2,$3)
   RETURNING id,email,name,role`,
  [name,email,hashedPassword]
 )

 return result.rows[0]
}

async function loginUser(email,password){

 const result = await pool.query(
  `SELECT * FROM users WHERE email=$1`,
  [email]
 )

 const user = result.rows[0]

 if(!user){
  throw new Error("Invalid credentials")
 }

 const valid = await bcrypt.compare(password,user.password_hash)

 if(!valid){
  throw new Error("Invalid credentials")
 }

 const accessToken = jwt.sign(
  { id:user.id, role:user.role },
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_EXPIRATION }
 )

 const refreshToken = jwt.sign(
  { id:user.id },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: process.env.JWT_REFRESH_EXPIRATION }
 )

 return {accessToken,refreshToken}
}

async function refreshAccessToken(refreshToken){

 const jwt = require("jsonwebtoken")

 try{

  const decoded = jwt.verify(
   refreshToken,
   process.env.JWT_REFRESH_SECRET
  )

  const accessToken = jwt.sign(
   { id: decoded.id },
   process.env.JWT_SECRET,
   { expiresIn: process.env.JWT_EXPIRATION }
  )

  return { accessToken }

 }catch(err){
  throw new Error("Invalid refresh token")
 }

}

module.exports = {
 registerUser,
 loginUser,
  refreshAccessToken
}