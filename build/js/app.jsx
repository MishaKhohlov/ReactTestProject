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
      {id: 0, text: 'Name 1', completed: false},
      {id: 1, text: 'Name 2', completed: false}
    ];

    return (
      <div>
        <TodoList todos={data}/>
        <Footer/>
      </div>
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
      <li className={this.props.completed ? 'line-through' : ''}>
        {this.props.text}
      </li>
    );
  }
}

Todo.propTypes = {
  completed: React.PropTypes.bool.isRequired,
  text: React.PropTypes.string.isRequired
};

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: 'SHOW_ALL'
    };

    this.clickLink = this.clickLink.bind(this);
  }

  clickLink(type_filter) {
    this.setState({
      active: type_filter
    });
  }

  render() {
    return (
      <footer>
        <ul>
          <p>Отфильтровать</p>
          <Link filter="SHOW_ALL"
                active={this.state.active}
                clickLink={this.clickLink}>
            All
          </Link>
          <Link filter="SHOW_ACTIVE"
                active={this.state.active}
                clickLink={this.clickLink}>
            Active
          </Link>
          <Link filter="SHOW_COMPLETED"
                active={this.state.active}
                clickLink={this.clickLink}>
            Completed
          </Link>
        </ul>
      </footer>
    );
  }
}

class Link extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const filter = this.props.filter;
    let active = filter === this.props.active;

    if (active) {
      return ( <li><span>{this.props.children}</span></li> );
    }

    return (
      <li
        onClick={e => {
        e.preventDefault();
        this.props.clickLink(filter)
      }}>
        <a href="#">{this.props.children}</a>
      </li>
    );
  }
}

Link.propTypes = {
  active: React.PropTypes.string.isRequired,
  children: React.PropTypes.string.isRequired,
  clickLink: React.PropTypes.func.isRequired
};

ReactDOM.render(
  <App />,
  $('#body')[0]
);
