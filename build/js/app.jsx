let React = require('react');
let ReactDOM = require('react-dom');
let $ = require('jquery');

// Start App
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let data = [
      {id: 0, text: 'Name 1', completed: true},
      {id: 1, text: 'Name 2', completed: true}
    ];

    return (
      <TodoList todos={data}/>
    );
  }
}

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    // let data = this.props.data;
    let listTodo;
    // test
    let data = this.props.todos;

    if (data.length > 0) {
      listTodo = data.map(item => {
        return (
          <Todo
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
  }).isRequired).isRequired
  // onTodoClick: React.PropTypes.func.isRequired
};

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <li>{this.props.text}</li>
    );
  }
}

ReactDOM.render(
  <App />,
  $('#body')[0]
);
