import React from 'react';
import AddTodo from '../addTodo/addTodo.jsx';
import VisibleTodoList from '../visibleTodoList/visibleTodoList.jsx';
import FilterLink from '../filterLink/filterLink.jsx';

// Start App
class AddTodoPage extends React.Component {
  render() {
    return (
      <div>
        <AddTodo/>
        <VisibleTodoList/>
        <FilterLink/>
      </div>
    );
  }
}

export default AddTodoPage;

