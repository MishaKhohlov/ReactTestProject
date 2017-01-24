import React from 'react';
import {Link} from 'react-router';

// Start App
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      propsDefault: {
        activeClassName: 'load-data'
      }
    }
  }

  render() {
    let prop = this.state.propsDefault;
    return (
      <div>
        <h2>My test app with React and Redux</h2>
        <ul>
          <li><Link {...prop} onlyActiveOnIndex={true} to='/'>Home</Link></li>
          <li><Link {...prop} to='/add'>Add</Link></li>
          <li><Link {...prop} to='/async'>Async</Link></li>
          <li><Link {...prop} to='/add/banlist/testData'>Banlist</Link></li>
          <li><Link {...prop} to='/login'>login</Link></li>
        </ul>
        {this.props.children}
      </div>
    );
  }
}

export default App;


