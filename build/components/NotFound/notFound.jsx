import React, {Component} from 'react'
import {Link} from 'react-router'
// import { hashHistory } from 'react-router'

class NotFound extends React.Component {
  goTo(e) {
    e.preventDefault();
    const value = 'test data from not found page';
    // hashHistory.push(`add/banlist/${value}`);
    this.context.router.push(`add/banlist/${value}`)
  }

  render() {
    return (
      <div>
        Страница не найдена. Вернуться на <Link to='/'>главную</Link>?
        <div>
          <a href="#" onClick={this.goTo.bind(this)}>Go to another page</a>
        </div>
      </div>
    )
  }
}

// this.context можно использовать только при наличии проверки contextTypes.
NotFound.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default NotFound;