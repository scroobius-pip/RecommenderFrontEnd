import React from 'react'
import { Modal, Box } from 'gestalt'
import YouTube from 'react-youtube'
import SpotifyPlayer from 'react-spotify-player'

const platformIframe = (url) => {
  return {
    spotify: <SpotifyPlayer uri='spotify:album:0sNOF9WDwhWunNAHPD3Baj' size='large' theme='black' view='coverart' />,
    youtube: <YouTube videoId={url.split('=')[1]} opts={{
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }} />

  }
}
const Board = ({ heading, platform, url, onClose }) => {
  return (
    <Modal size='xs' onDismiss={onClose} heading={heading} >
      <Box>
        {platformIframe(url)[platform]}
      </Box>
    </Modal>
  )
}
export default Board
