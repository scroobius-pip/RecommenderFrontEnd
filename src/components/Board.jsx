import React from 'react'
import { Masonry } from 'gestalt'

const Board = class extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const { item } = this.props
    return (
      <Masonry comp={item} items={[1, 2, 3, 4, 4, 5]} />
    )
  }
}

export default Board
