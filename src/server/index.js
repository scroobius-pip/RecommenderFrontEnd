const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const db = require('../firebaseConfigured').db
// const addAccessToken = require('../functions/addAccessToken')
const path = require('path')

const app = express()
// const db = require('./firebaseConfigured')
// app.get('', (req, res) => res.send('Hello World'))
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())

passport.use(new SpotifyStrategy({
  clientID: '14718182058445ce8fa278a04f1fadea',
  clientSecret: 'b98a23e1e6944b2192143dea5b1d6cf7',
  callbackURL: 'http://localhost:3000/dashboard'
},
  function (accessToken, refreshToken, expires_in, profile, done) {
    // addAccessToken('qqEvPnmivVR7oI4mzBsGtA9NuTy2', refreshToken, accessToken, 'spotify')
    // console.log(`access token: ${accessToken} refreshToken: ${refreshToken}`)
    // done()

    // console.log(accessToken, refreshToken)
    db.collection('user').doc('qqEvPnmivVR7oI4mzBsGtA9NuTy2').collection('platforms').add({
      platform_name: 'spotify',
      platform_token: accessToken,
      refresh_token: refreshToken
    }).then(() => {
      done()
    })
      .catch(error => {
        console.log(error)
      })
    // done()
  }
))

app.get('/auth/spotify',
  passport.authenticate('spotify', { failureRedirect: '/dashboard', scope: ['user-read-private', 'playlist-read-private'], showDialog: true }),
  function (req, res) {
    // res.redirect('/dashboard')
  }
)

app.use(express.static(path.join(__dirname, 'build')))
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(3001, () => console.log('listening on port 3001'))
