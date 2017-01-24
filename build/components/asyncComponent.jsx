import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import Async from './asyncTest.jsx';

class async extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginAsync: null
    };
  }

  componentDidMount() {
    let loginAsync;
    require.ensure([], (require) => {
      loginAsync = require('./asyncTest.jsx');
      this.setState({ loginAsync });
    });
  }

  render() {
    let Comp = this.state.loginAsync;
    console.log(Comp);
    return (
      <div>
        {this.state.loginAsync ? <Comp /> : 'Load Component'}
      </div>
    );
  }
}

const asyncComponent = connect()(async);

export default asyncComponent;

