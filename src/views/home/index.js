import React from 'react'
import ConvertIcon from '../../assets/svg/convert'
import FetchIcon from '../../assets/svg/fetch'
import './home.scss'
import {Link} from 'react-router-dom'

class Home extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modules: [
        {title: 'Unicode Convert', path: '/tools/unicode-convert', icon: <ConvertIcon size="16"/>},
        {title: 'I18N Fetch', path: '/tools/auto-fetch', icon: <FetchIcon size="16"/>}
      ]
    }
  }
  render () {
    return (
      <div className='home-wrap'>
        <ul className='home-module-list'>
          {this.state.modules.map(item => <li key={item.title}>
            <Link to={item.path}>{item.icon}<p>{item.title}</p></Link>
          </li>)}
        </ul>
      </div>
    )
  }
}

export default Home