import React from 'react'
import { Box, Text, IconButton, Link } from 'gestalt'

const TopBar = ({ loggedIn, profileName, callbackLoggedIn, callbackNotLoggedIn, callbackLogout }) => {
  const topBarTextClicked = () => {
    if (loggedIn) {
      callbackLoggedIn()
    } else {
      callbackNotLoggedIn()
    }
  }

  return (
    <Box color='white' shape='rounded' padding={3} display='flex' direction='row' justifyContent='around' alignItems='center'>
      <Box>
        <Text color='darkGray' bold size='xl'>Recommender System</Text>
      </Box>

      <Box alignItems='center' display='flex' paddingX={2} >

        {loggedIn ? <IconButton accessibilityLabel='Profile' icon='person' size='md' /> : null}
        {
          <Link href={loggedIn ? 'dashboard' : '#'} onClick={topBarTextClicked}>
            <Text align='center' bold color='darkGray'>{loggedIn ? profileName : 'login'}</Text>
          </Link>
        }

      </Box>
      {loggedIn ? <Box><Link href='#' onClick={callbackLogout}><Text align='' italics color='darkGray'>logout</Text></Link></Box> : null}
    </Box >
  )
}

export default TopBar
