const pool = require("../db/db")

async function getProfile(req,res){

 const userId = req.user.id

 const result = await pool.query(
  "SELECT id,email,name,role FROM users WHERE id=$1",
  [userId]
 )

 res.json(result.rows[0])
}

async function updateProfile(req,res){

 const userId = req.user.id

 const {name} = req.body

 const result = await pool.query(
  `UPDATE users
   SET name=$1
   WHERE id=$2
   RETURNING id,email,name,role`,
  [name,userId]
 )

 res.json(result.rows[0])
}

async function getAllUsers(req,res){

 const result = await pool.query(
  "SELECT id,email,name,role FROM users"
 )

 res.json(result.rows)
}

module.exports = {
 getProfile,
 updateProfile,
 getAllUsers
}