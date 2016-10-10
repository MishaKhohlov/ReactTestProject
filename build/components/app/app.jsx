import React from 'react';
import {Link} from 'react-router'

// Start App
class App extends React.Component {
  render() {
    return (
      <div>
        <h2>My test app with React and Redux</h2>
        <ul>
          <li><Link activeClassName='load-data' onlyActiveOnIndex={true} to='/'>Home</Link></li>
          <li><Link activeClassName='load-data' onlyActiveOnIndex={true} to='/add'>Add</Link></li>
          <li><Link activeClassName='load-data' to='/add/banlist'>Banlist</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;


