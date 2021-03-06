import React from 'react';
import Todo from '../todo/todo.jsx';


class TodoList extends React.Component {
  componentWillReceiveProps() {
   // console.log(this.props.todos);
  }

  render() {
    let listTodo;
    let data = this.props.todos;

    if (data.length > 0) {
      listTodo = data.map((item, i) => {
        return (
          <Todo
            onClickProps={() => this.props.onTodoClick(i)}
            key = {i}
            id = {i}
            {...item}
          />
        )
      })
    } else {
      listTodo = <p>К сожалению список задач пуст</p>
    }

    return (
      <ul>
        {listTodo}
        <p className={listTodo.length > 0 ? 'lenght-news' : 'none'}>
          Count Todo: {listTodo.length}
        </p>
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: React.PropTypes.arrayOf(React.PropTypes.shape({
    text: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onTodoClick: React.PropTypes.func.isRequired
};


export default TodoList;