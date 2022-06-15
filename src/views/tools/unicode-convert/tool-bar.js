import React from 'react'
import ClearSvg from '../../../assets/svg/clear'
import CopySvg from '../../../assets/svg/copy'
import './toolbar.scss'

const iconSize = 18
const iconColor = '#555'
class UnicodeConvertToolBar extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menus: [
        {title: 'clear', icon: <ClearSvg size={iconSize} fill={iconColor}/>},
        {title: 'copy', icon: <CopySvg size={iconSize} fill={iconColor}/>},
      ]
    }
  }
  render () {
    return (
      <ul className='unicode-convert-toolbar'>
        {this.state.menus.map(menu => {
          return (
            <li key={menu.title} title={menu.title} onClick={() => this.props.onToolbarClick(menu.title)}>{menu.icon}</li>
          )
        })}
      </ul>
    )
  }
}

export default UnicodeConvertToolBar