import React from 'react';
import {connect} from 'react-redux';
import * as Action from '../../action/action';

class requireAuth extends React.Component {

  componentWillMount() {
    this.checkAuth(this.props.user)
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps.user)
  }

  checkAuth(user) {
    if(!user) {
      setTimeout(()=> {
        this.props.dispatch(Action.redirect({
          method: 'replace',
          url: '/'
        }))
      }, 1000);
    }
  }

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