import React from 'react'

export default class ClearSvg extends React.Component {
  static defaultProps = {
    size: 32,
    fill: '#4D4D4D'
  }
  render () {
    return (
      <svg t="1649729794036" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3262" width={this.props.size} height={this.props.size}>
        <path fill={this.props.fill} d="M868.9 301.2H622.4V197.8c0-31.7-26.1-57.5-58.1-57.5H459.7c-32 0-58.1 25.8-58.1 57.5v103.4H155.1c-32 0-58.1 25.8-58.1 57.5v103.7c0 31.7 26.1 57.5 58.1 57.5h2.9V826.2c0 31.7 26.1 57.5 58.1 57.5h592c32 0 58.1-25.8 58.1-57.5V521.4 520h2.9c32 0 58.1-25.8 58.1-57.5V358.7c-0.2-31.7-26.3-57.5-58.3-57.5z m-61.2 524.7h-104v-93.5c0-16-13.1-28.9-29.2-28.9s-29.2 13-29.2 28.9v93.5h-104v-93.8c0-16-13.1-28.9-29.2-28.9s-29.2 13-29.2 28.9v93.8h-104v-93.5c0-16-13.1-28.9-29.2-28.9s-29.2 13-29.2 28.9v93.5h-104V521.7h591.4v304.2z m60.9-363.8H155.4V359h246.5c32 0 58.1-25.8 58.1-57.5V198.1h104v103.4c0 31.7 26.1 57.5 58.1 57.5h246.5v103.1z" p-id="3263"></path>
      </svg>
    )
  }
}