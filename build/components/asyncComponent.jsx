import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

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
      loginAsync = require('./' + this.props.route.page + '.jsx');
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

