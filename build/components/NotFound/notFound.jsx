import React, {Component} from 'react'
import {Link} from 'react-router'

class NotFound extends React.Component {
  render() {
    return (
      <div>
        Страница не найдена. Вернуться на <Link to='/'>главную</Link>?
      </div>
    )
  }
}

export default NotFound;