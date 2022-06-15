import React from 'react'
import './header.scss'
// import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import HomeSvg from '../../assets/svg/home.svg'

class myHeader extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      activeIdx: 0,
      menus: [
        {title: 'Home', path: '/', icon: HomeSvg},
      ],
      title: 'Zoom I18N Tools'
    };
  }
  onMenuClick (idx) {
    this.setState({activeIdx: idx})
  }
  render () {
    let menus = null
    if (this.state.menus) {
      menus = (
        <ul>
          {this.state.menus.map((item, idx) => 
            <li key={idx} className={this.state.activeIdx===idx? 'active':''} onClick={() => this.onMenuClick(idx)}>
              <Link to={item.path} className="header-menu"><div style={{backgroundImage: `url('${item.icon}')`}}></div></Link>
            </li>
          )}
        </ul>
      )
    }
    return (
      <div className='my-header'>
        <div className='d-flex'>
          <div className='logo'></div>
          <div className='title'>{this.state.title}</div>
        </div>
        {menus}
      </div>
    )
  }
}

export default myHeader