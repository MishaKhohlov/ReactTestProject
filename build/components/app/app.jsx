import React from 'react';
import {Link} from 'react-router'

// Start App
class App extends React.Component {
  render() {
    return (
      <div>
        <h2>My test app with React and Redux</h2>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/add'>Add</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;


