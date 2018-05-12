import React, { Component } from 'react'
import { Box, Divider } from 'gestalt'
import FrontPage from './pages/FrontPage'
import DashBoard from './pages/DashBoard'
import { TopBar } from './components'
import { Switch, Route } from 'react-router-dom'
import { auth, authProvider, db } from './firebaseConfigured'
import addAccessToken from './functions/addAccessToken'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null
    }
    this.login = this.login.bind(this)
    this.notLoggedIn = this.notLoggedIn.bind(this)
    this.loggedIn = this.loggedIn.bind(this)
    this.logout = this.logout.bind(this)
  }

  loggedIn () {
    this.props.history.push('dashboard')
  }

  login () {
    auth.signInWithPopup(authProvider).then(result => {
      const user = result.user
      const refreshToken = user.refreshToken
      const accessToken = result.credential.accessToken // i would probably store it in firestore
      addAccessToken(user.uid, refreshToken, accessToken, 'youtube')
      this.setState({ user })
    })
  }

  logout () {
    auth.signOut()
      .then(() => {
        this.setState({ user: null })
      })
  }

  notLoggedIn () {
    this.login()
  }

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ user })
      }
    })
  }

  render () {
    const { user } = this.state
    return (
      <Box>
        <TopBar loggedIn={user} profileName={user ? user.displayName : ''} callbackLoggedIn={this.loggedIn} callbackNotLoggedIn={this.notLoggedIn} callbackLogout={this.logout} />
        <Divider />
        <Switch>
          <Route path='/' exact component={FrontPage} />
          <Route path='/dashboard' component={DashBoard} />
        </Switch>

      </Box>
    )
  }
}

export default App
