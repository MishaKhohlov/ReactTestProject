import * as Action from '../../action/action';
import {connect} from 'react-redux';
import TodoList from '../todoList/todoList.jsx';

// convert redux view in state
const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos;
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed);
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed);
  }
};

// return props
const mapStateToProps = (state) => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoClick: (id) => {
      dispatch(Action.toggleTodo(id))
    }
  }
};

const VisibleTodoList = connect(
 mapStateToProps,
 mapDispatchToProps
)(TodoList);

export default VisibleTodoList;