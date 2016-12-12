import React, {Component, PropTypes} from 'react';
import * as Action from '../../action/action';
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux';

class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pathname: null,
      confirmModal: false
    };
    this.routerWillLeave = this.routerWillLeave.bind(this)
  }

  routerWillLeave(ev) {
    console.log(ev);
    if(ev.pathname !== '/add') {
      if (!this.state.pathname) {
        this.setState({
          pathname: ev.pathname
        });
        return false
      } else {
        this.setState({
          pathname: false
        });
        return true
      }
    }

    return true
  }

  willLeave(ev) {
    if(ev) {
      this.context.router.push(this.state.pathname)
    } else {
      this.setState({
        pathname: false
      });
    }
  }

  componentDidMount() {
    this.context.router.setRouteLeaveHook(this.props.route, this.routerWillLeave)
  }

  handleSubmit(ev) {
    ev.preventDefault();

    const value = ev.target.elements[0].value.trim();
    if (value.length > 3) {
      // similar on this.props.dispatch
      bindActionCreators(Action, this.props.dispatch).login({
        name: 'Misha',
        value
      });
    }
  }

  logout() {
    bindActionCreators(Action, this.props.dispatch).logout({})
  }

  static change(prevState, nextState, replace, callback) {
    callback()
  }

  render() {
    return (
      <div>
        <h4>Пожалуйста, введите логин:</h4>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' placeholder='login'/>
          <button type='submit'>Войти</button>
        </form>
        <button onClick={this.logout.bind(this)}>Logout</button>
        <div className={this.state.pathname ? '' : 'hide'}>
          <h5>Are you sure?</h5>
          <button onClick={this.willLeave.bind(this, true)}>Yes</button>
          <button onClick={this.willLeave.bind(this, false)}>No</button>
        </div>
      </div>
    );
  }
}

LoginPage.contextTypes = {
  router: PropTypes.object.isRequired
};

const Login = connect()(LoginPage);

export default Login;