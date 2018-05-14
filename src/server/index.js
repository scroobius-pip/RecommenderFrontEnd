const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const db = require('./firebaseConfigured')
const path = require('path')

const app = express()

app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())

let userId = ''

passport.use(new SpotifyStrategy({
  clientID: '14718182058445ce8fa278a04f1fadea',
  clientSecret: 'b98a23e1e6944b2192143dea5b1d6cf7',
  callbackURL: 'http://localhost:3001/callback'
},
  function (accessToken, refreshToken, expires_in, profile, done) {
    process.nextTick(function () {
      db.collection('users').doc(userId).collection('platforms').add({
        platform_name: 'spotify',
        platform_token: accessToken,
        refresh_token: refreshToken
      })
        .then(() => {
          console.log(`accesstoke: ${accessToken} refreshtoke: ${refreshToken}`)
          return done()
        })
        .catch(error => {
          console.log(error)
        })
    })
  }
))

app.get('/auth/spotify',
  function (req, res, next) {
    userId = req.query.userId
    if (!userId) {
      res.send("userid parameter shouldn't be empty")
    }
    console.log(userId)
    next()
  },
  passport.authenticate('spotify',
    {
      scope: ['user-read-private', 'playlist-read-private', 'user-library-read'],
      showDialog: true
    })
)
app.get('/callback',
  passport.authenticate('spotify', { failureRedirect: 'http://localhost:3000/' }),
  function (req, res) {
    res.redirect('http://localhost:3000/dashboard')
  }
)

app.use(express.static(path.join(__dirname, 'build')))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(3001, () => console.log('listening on port 3001'))
