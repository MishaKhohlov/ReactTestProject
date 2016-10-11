import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleSubmit(ev) {
    ev.preventDefault();
    const value = ev.target.elements[0].value;
    window.localStorage.setItem('auth_login', value)
  }

  static checkLogin(nextState, replace, callback) {
  const login = window.localStorage.getItem('auth_login');
  if (login === 'hello') {
    setTimeout(callback, 1000);
    console.log('пропусти');
  } else {
    replace('/');
    console.log('не пропускай');
  }
}

  static change(prevState, nextState, replace, callback) {}

  static leave(prevState) {}

  render() {
    return (
      <div>
        <h4>Пожалуйста, введите логин:</h4>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' placeholder='login'/>
          <button type='submit'>Войти</button>
        </form>
      </div>
    );
  }
}

export default Login;