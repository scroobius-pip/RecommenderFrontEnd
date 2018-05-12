import React, { Component } from 'react'
import { TopBar, MediaCard, Modal } from '../components'
import { Divider, Container, Masonry } from 'gestalt'
import getMedia from '../functions/api'

class FrontPage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalIsVisible: false,
      modalPlatform: '',
      modalUrl: ''
    }
  }
  openModal (platform, name, url) {
    this.setState({ modalIsVisible: true, modalPlatform: platform, modalUrl: url })
  }

  closeModal (platform, name, url) {
    this.setState({ modalIsVisible: false })
  }

  getMediaWithCallback () {
    const media = getMedia()
    const mediaWithCallback = media.map(m => {
      m.onClick = this.openModal.bind(this)
      return m
    })

    return mediaWithCallback
  }

  render () {
    return (
      <div>

        <Masonry items={this.getMediaWithCallback()} comp={MediaCard} />
        {this.state.modalIsVisible ? <Modal onClose={this.closeModal.bind(this)} width={300} platform={this.state.modalPlatform} url={this.state.modalUrl} /> : null}

      </div>
    )
  }
}

export default FrontPage
