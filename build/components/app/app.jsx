import React from 'react';
import AddTodo from '../addTodo/addTodo.jsx';
import VisibleTodoList from '../visibleTodoList/visibleTodoList.jsx';
import UserListConnect from '../userList/userList.jsx';
import FilterLink from '../filterLink/filterLink.jsx';

// Start App
class App extends React.Component {
  render() {
    return (
      <div>
        <h2>My test app with React and Redux</h2>
        <AddTodo/>
        <VisibleTodoList/>
        <FilterLink/>
        <UserListConnect/>
      </div>
    );
  }
}

export default App;