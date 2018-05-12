/* global fetch URLSearchParams */
import React, { Component } from 'react'
import { TopBar, MediaCard } from '../components'
import { Divider, Container, Box, Switch, Text, Label, Heading, Image, Spinner } from 'gestalt'
// import { } from '../components'
import { db, auth } from '../firebaseConfigured'
import Spotify from 'spotify-web-api-node'
import qs from 'query-string'

class FrontPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      spotifyOn: false,
      spotifyLoading: false
    }
    this.spotifyChanged = this.spotifyChanged.bind(this)
    this.authenticateSpotify = this.authenticateSpotify.bind(this)
  }

  spotifyChanged() {
    // this.setState({ spotifyOn: true })
    this.authenticateSpotify()
  }

  authenticateSpotify() {
    const scopes = 'user-read-private playlist-read-private'
    const clientId = '14718182058445ce8fa278a04f1fadea'
    const redirectUri = 'http://localhost:3000/dashboard'
    const win = window.open(`https://accounts.spotify.com/authorize?response_type=code&client_id=${clientId}&scope=${encodeURIComponent(scopes)}&redirect_uri=${encodeURIComponent(redirectUri)}`, '_blank')

    win.focus()
  }

  async componentDidMount() {
    try {
      // const results = await db.collection('users').doc(auth.currentUser.uid).collection('platforms').get()
      // console.log(results)

      const spotifyCode = qs.parse(this.props.location.search).code

      const encodedData = new URLSearchParams()
      encodedData.append('grant_type', 'authorization_code')
      encodedData.append('code', spotifyCode)
      encodedData.append('redirect_uri', 'http://localhost:3000/dashboard')
      encodedData.append('client_id', '14718182058445ce8fa278a04f1fadea')
      encodedData.append('client_secret', 'b98a23e1e6944b2192143dea5b1d6cf7')

      if (spotifyCode) {
        this.setState({ spotifyLoading: true })
        try {
          const accessTokenRefreshToken = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: encodedData,
            headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            mode: 'cors'
          })
          console.log(accessTokenRefreshToken)
        } catch (error) {
          console.log(error)
        }
        this.setState({ spotifyLoading: false })
      }
      auth.onAuthStateChanged(async (user) => {
        if (!user) {
          this.props.history.push('/')
          return
        }
        const results = await db.collection('users').doc(user.uid).collection('platforms').where('platform_name', '==', 'spotify').get()
        if (results.empty) {
          this.setState({ spotifyOn: false })
        } else {
          this.setState({ spotifyOn: true })
        }
      })
    } catch (error) {
      console.log(error)
    }

    console.log(this.props)
  }

  render() {
    return (

      <Box marginTop={300} alignItems='center'>
        <Heading size='xs'>Permissions</Heading>

        <Box display='flex' direction='row' alignItems='center'>
          <Box display='flex' direction='row' alignItems='center'>
            <img width='24' src={require('../components/logos/spotify.svg')} />

            <Box paddingX={2} marginY={-1}>
              <Label htmlFor='Spotify'>
                <Text>Spotify</Text>
              </Label>
            </Box>
            <Switch

              onChange={this.spotifyChanged}
              id='Spotify'
              switched={this.state.spotifyOn}
            />
            {this.state.spotifyLoading
              ? <Box display='flex' alignItems='center' direction='row' marginLeft={6}>
                <Box padding={5}><Text>Getting spotify permissions</Text></Box>
                <Spinner show={!this.state.spotifyLoading} />
              </Box> : null
            }
          </Box>

        </Box>
      </Box>

    )
  }
}

export default FrontPage
