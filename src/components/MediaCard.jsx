import React from 'react'
import { Card, Text, Box, Mask } from 'gestalt'

const platformIcons = {
  'youtube': <img width={24} height={24} src={require('./logos/youtube.svg')} />,
  'spotify': <img width={24} height={24} src={require('./logos/spotify.svg')} />
}

const MediaCard = ({ data: { name, source, url, onClick } }) => {
  const handleClick = () => {
    onClick(source, name, url)
  }

  const getImage = () => {
    switch (source) {
      case 'youtube':
        return `https://i.ytimg.com/vi/${url.split('=')[1]}/hqdefault.jpg`

      default:
        break
    }
  }

  return (
    <div onClick={handleClick.bind(this)}>
      <Box maxWidth={260} padding={2}>
        <Card >

          <Mask height={280} shape='rounded' >
            <img
              src={getImage()}
            />
          </Mask>
          <Box display='flex' direction='row' alignItems='center'>
            <Box padding={2}>
              {platformIcons[source]}
            </Box>
            <Box flex='grow' >
              <Text size='md' bold color='gray'>{name}</Text>
            </Box>
          </Box>
        </Card>

      </Box>
    </div>
  )
}

export default MediaCard
