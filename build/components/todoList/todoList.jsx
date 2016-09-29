import React from 'react';
import Todo from '../todo/todo.jsx';


class TodoList extends React.Component {

  componentWillReceiveProps() {
    console.log(this.props.todos);
  }

  render() {
    let listTodo;
    let data = this.props.todos;

    if (data.length > 0) {
      listTodo = data.map(item => {
        return (
          <Todo
            onClickProps={() => this.props.onTodoClick(item.id)}
            key={item.id}
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
    id: React.PropTypes.number.isRequired,
    text: React.PropTypes.string.isRequired,
    completed: React.PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onTodoClick: React.PropTypes.func.isRequired
};


export default TodoList;