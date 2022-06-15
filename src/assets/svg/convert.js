import React from 'react'

class ConvertSvg extends React.Component {
  static defaultProps = {
    size: 32,
    fill: '#4D4D4D'
  }
  render () {
    return (
      <svg t="1649670975865" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3182" width={this.props.size} height={this.props.size}>
        <path fill={this.props.fill} d="M42.073656 647.681604a41.638378 41.638378 0 0 0 41.518036-41.638378V312.047393c0-50.904723 42.360431-87.849758 100.606024-87.849757h710.620299l-70.520491 70.159464a41.277352 41.277352 0 0 0 0 58.726961 42.480773 42.480773 0 0 0 58.726962 0l116.972553-116.130159a76.657939 76.657939 0 0 0 0-109.029973L882.783801 12.034454a41.75872 41.75872 0 0 0-29.483822-12.034213 41.518036 41.518036 0 0 0-29.002455 71.001859l70.520491 70.159463h-710.018589a192.547414 192.547414 0 0 0-127.923688 45.730011A164.026328 164.026328 0 0 0 0.314935 312.047393v293.995833a41.518036 41.518036 0 0 0 41.758721 41.638378zM982.186404 376.310093a41.638378 41.638378 0 0 0-41.638379 41.638378v270.529116c0 59.20833-47.053774 111.316474-100.606023 111.316474H127.997939l70.520491-70.159464a41.518036 41.518036 0 0 0-28.882113-71.001859 40.675641 40.675641 0 0 0-29.604164 12.034213l-116.972554 116.130159a76.657939 76.657939 0 0 0 0 109.029973l116.972554 116.130159a41.518036 41.518036 0 1 0 58.486277-58.967645l-70.520491-70.159464h711.944063a176.301226 176.301226 0 0 0 131.41361-60.89312A202.295127 202.295127 0 0 0 1023.223071 688.477587V417.948471a41.638378 41.638378 0 0 0-41.036667-41.638378z" p-id="3183"></path>
      </svg>
    )
  }
}

export default ConvertSvg