import React from 'react';

class Todo extends React.Component {
  render() {
    return (
      <li onClick={this.props.onClickProps}
          className={this.props.completed ? 'line-through' : ''}>
        {this.props.text}
      </li>
    );
  }
}

Todo.propTypes = {
  completed: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string.isRequired
};

export default Todo;