const { Router } = require('express')
const passport = require('passport')

const githubLogin = Router()

githubLogin.get("/github", passport.authenticate("auth-github", {
  scope:["user:email"],
  session:false
}))

githubLogin.get("/github/callback", passport.authenticate("auth-github", {
  scope:["user:email"],
  session:false
}),async (req, res) => {
  const user = JSON.stringify(req.user)

  res.status(200).send(`<!DOCTYPE html>
   <html lang="es">
   <body>
   <script>
   window.opener.postMessage(${user}, "http://localhost:5173")
   </script
   </body>
  `)
})



module.exports = githubLogin