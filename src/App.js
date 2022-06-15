import React from 'react'
import './scss/App.scss';
import RouterList from './router/index'
import MyHeader from './components/header/index'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      menus: [
        {title: 'Home', path: '/'},
        {title: 'About', path: '/about'}
      ]
    };
  }
  componentDidMount () {
  }
  render () {
    return (
      <div className="App">
        <MyHeader menus={this.state.menus}></MyHeader>
        <div id="main">
          {RouterList}
        </div>
      </div>
    );
  }
}

export default App;
