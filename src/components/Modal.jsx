import React from 'react'
import { Modal, Box } from 'gestalt'
import YouTube from 'react-youtube'

const platformIframe = (url) => {
  return {
    spotify: <iframe src={url} width='300' height='80' frameborder='0' allowtransparency='true' allow='encrypted-media' />,
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
    <Modal size='lg' onDismiss={onClose} heading={heading} >
      <Box>
        {platformIframe(url)[platform]}
      </Box>
    </Modal>
  )
}
export default Board
