import React from 'react'

export default class SuccessCheckSvg extends React.Component {
  static defaultProps = {
    size: 32,
    fill: '#52c41a'
  }
  render () {
    return (
      <svg t="1649755495742" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5307" width={this.props.size} height={this.props.size}>
        <path fill={this.props.fill} d="M511.434623 63.564711c-247.428276 0-448.010617 200.582341-448.010617 448.01164 0 247.430322 200.581318 448.01164 448.010617 448.01164 247.432369 0 448.012663-200.581318 448.012663-448.01164C959.447287 264.147052 758.865969 63.564711 511.434623 63.564711zM773.519714 382.576325 447.871959 704.039781 245.771031 507.044128l63.996546-68.093864 138.15964 138.15964 261.086343-261.087367L773.519714 382.576325z" p-id="5308"></path>
      </svg>
    )
  }
}