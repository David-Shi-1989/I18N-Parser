import React from 'react'

export default class ClockSvg extends React.Component {
  static defaultProps = {
    size: 32,
    fill: '#4D4D4D'
  }
  render () {
    return (
      <svg t="1649754476103" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4330" width={this.props.size} height={this.props.size}>
        <path fill={this.props.fill} d="M509.2 129.9c209.6-1.3 381.2 168.2 382.5 377.8S723.6 888.8 514 890.1 132.8 722 131.5 512.4s168.1-381.2 377.7-382.5m-0.4-66.1c-246.4 1.5-444.9 202.5-443.4 449s202.5 444.9 449 443.4c246.4-1.5 444.9-202.5 443.4-449S755.3 62.3 508.8 63.8z" p-id="4331"></path>
        <path fill={this.props.fill} d="M485.2 234.4c-16.1 0.1-29.1 13.3-29 29.4l1.8 285.7c0.1 16.1 13.3 29.1 29.4 29l285.7-1.8c16.1-0.1 29.1-13.3 29-29.4-0.1-16.1-13.3-29.1-29.4-29l-256.5 1.6-1.6-256.5c-0.1-16.1-13.4-29.1-29.4-29z" p-id="4332"></path>
      </svg>
    )
  }
}