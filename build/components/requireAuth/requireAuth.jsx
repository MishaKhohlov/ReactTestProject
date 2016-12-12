import React from 'react';
import {connect} from 'react-redux';

class requireAuth extends React.Component {
  render() {
    const Component = this.props.route.childComponent;
    const access = this.props.user;

    return (
      <div>
        {access ? <Component {...this.props}/> : null}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.userState.isAuthenticated
  }
}

const requireAuthConnect = connect(mapStateToProps)(requireAuth);

export default requireAuthConnect;