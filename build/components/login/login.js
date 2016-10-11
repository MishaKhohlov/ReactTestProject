import React, {Component, PropTypes} from 'react';

class Login extends Component {
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
      window.localStorage.setItem('auth_login', value);
      this.context.router.push('/add')
    }
  }

  static checkLogin(nextState, replace, callback) {
    const login = window.localStorage.getItem('auth_login');
    if (login === 'hello') {
      setTimeout(callback, 1000);
      console.log('пропусти');
    } else {
      replace('/');
    }
  }

  static change(prevState, nextState, replace, callback) {
    callback()
  }

  static leave(prevState) {
  }

  render() {
    return (
      <div>
        <h4>Пожалуйста, введите логин:</h4>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' placeholder='login'/>
          <button type='submit'>Войти</button>
        </form>
        <div className={this.state.pathname ? '' : 'hide'}>
          <h5>Are you sure?</h5>
          <button onClick={this.willLeave.bind(this, true)}>Yes</button>
          <button onClick={this.willLeave.bind(this, false)}>No</button>
        </div>
      </div>
    );
  }
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Login;