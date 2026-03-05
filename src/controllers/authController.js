const authService = require("../services/authService")

async function register(req,res){

 try{

  const {name,email,password} = req.body

  const user = await authService.registerUser(name,email,password)

  res.status(201).json(user)

 }catch(err){

  res.status(400).json({error:err.message})

 }

}

async function login(req,res){

 try{

  const {email,password} = req.body

  const tokens = await authService.loginUser(email,password)

  res.json(tokens)

 }catch(err){

  res.status(401).json({error:err.message})

 }

}

async function refresh(req,res){

 try{

  const {refreshToken} = req.body

  const token = await authService.refreshAccessToken(refreshToken)

  res.json(token)

 }catch(err){

  res.status(401).json({error:err.message})

 }

}
module.exports = {
 register,
 login,
 refresh
}