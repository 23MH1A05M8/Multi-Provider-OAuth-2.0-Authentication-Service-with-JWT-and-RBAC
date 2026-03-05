const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const GitHubStrategy = require("passport-github2").Strategy
const pool = require("../db/db")

passport.use(
 new GoogleStrategy(
  {
   clientID: process.env.GOOGLE_CLIENT_ID,
   clientSecret: process.env.GOOGLE_CLIENT_SECRET,
   callbackURL: "/api/auth/google/callback"
  },
  async (accessToken,refreshToken,profile,done)=>{
   try{

    const email = profile.emails[0].value
    const name = profile.displayName

    let user = await pool.query(
     "SELECT * FROM users WHERE email=$1",
     [email]
    )

    if(user.rows.length === 0){

     const newUser = await pool.query(
      "INSERT INTO users (email,name) VALUES ($1,$2) RETURNING *",
      [email,name]
     )

     user = newUser
    }

    return done(null,user.rows[0])

   }catch(err){
    return done(err,null)
   }
  }
 )
)

passport.use(
 new GitHubStrategy(
  {
   clientID: process.env.GITHUB_CLIENT_ID,
   clientSecret: process.env.GITHUB_CLIENT_SECRET,
   callbackURL: "/api/auth/github/callback"
  },
  async (accessToken,refreshToken,profile,done)=>{
   try{

    const email = profile.emails ? profile.emails[0].value : null
    const name = profile.username

    let user = await pool.query(
     "SELECT * FROM users WHERE email=$1",
     [email]
    )

    if(user.rows.length === 0){

     const newUser = await pool.query(
      "INSERT INTO users (email,name) VALUES ($1,$2) RETURNING *",
      [email,name]
     )

     user = newUser
    }

    return done(null,user.rows[0])

   }catch(err){
    return done(err,null)
   }
  }
 )
)

module.exports = passport