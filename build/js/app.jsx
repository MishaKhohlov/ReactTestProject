let $ = require('jquery');
let React = require('react');
let ReactDOM = require('react-dom');
let Redux = require('redux');
let { Provider, connect } = require('react-redux');
let Action = require('./action');
let todoAppReducers = require('./reducers');

//let unsubscribe = store.subscribe(() =>
//  console.log(store.getState())
//);
// unsubscribe();

const initialState = {
  visibilityFilter: Action.VisibilityFilters.SHOW_ALL,
  todos: [
    {id: 0, text: 'Name 1', completed: false},
    {id: 1, text: 'Name 2', completed: false}
  ]
};

let store = Redux.createStore(todoAppReducers, initialState);

// Start App
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <h2>My test app with React and Redux</h2>
        <Add/>
        <VisibleTodoList/>
        <FilterLink/>
      </div>
    );
  }
}
/*<TodoList todos={data}/>*/

class Add extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };
    this.addNewItem = this.addNewItem.bind(this);
    this.validInput = this.validInput.bind(this);
  }

  addNewItem() {
    let val = this.state.value;
    if (val.trim().length > 0) {
      console.log(val);
    }
  }

  validInput(e) {
    this.setState({
      value: e.target.value
    })
  }

  render() {
    return (
      <div>
        <input type="text"
               placeholder="add new item"
               value={this.props.value}
               onChange={this.validInput}/>
        <button onClick={this.addNewItem}>Add item</button>
      </div>
    );
  }
}


// TODO LIST ---------------


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
  }).isRequired).isRequired
  // onTodoClick: React.PropTypes.func.isRequired
};

// TODO ----------------------

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

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

// VISIBLE TODO LIST ---------------

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


// FOOTER -------------------------


class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <footer>
        <ul>
          <p>Отфильтровать</p>
          <Link filter="SHOW_ALL"
                active={this.props.active}
                clickLink={this.props.clickLink}>
            All
          </Link>
          <Link filter="SHOW_ACTIVE"
                active={this.props.active}
                clickLink={this.props.clickLink}>
            Active
          </Link>
          <Link filter="SHOW_COMPLETED"
                active={this.props.active}
                clickLink={this.props.clickLink}>
            Completed
          </Link>
        </ul>
      </footer>
    );
  }
}


// Links -----------------


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
  active: React.PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_COMPLETED',
    'SHOW_ACTIVE'
  ]).isRequired,
  children: React.PropTypes.string.isRequired,
  clickLink: React.PropTypes.func.isRequired
};

const mapStateToProps1 = (state) => {
  return {
    active: state.visibilityFilter
  }
};

const mapDispatchToProps1 = (dispatch) => {
  return {
    clickLink: (typeFilter) => {
      dispatch(Action.setVisibilityFilter(typeFilter))
    }
  }
};

const FilterLink = connect(
  mapStateToProps1,
  mapDispatchToProps1
)(Footer);


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  $('#body')[0]
);
