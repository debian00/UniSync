const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
require("dotenv").config();
const {User} = require("../../database/db")

passport.use(
  "auth-github",
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:3001/auth/github/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
    const {value} = profile.photos[0]
    console.log(value)
    
      const user = await User.findOne({ where: { githubId: profile.id } });
      if (!user) {
        const newUser = await User.create({
          githubId: profile.id,
          profilePic: value,
          name:profile.username,
          userName: profile.username,
          email: profile.email || null,
        });
        return cb(null, newUser);
      }
      return cb(null, user);
    }
  )
);
