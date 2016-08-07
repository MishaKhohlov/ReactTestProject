let { VisibilityFilters } = require('./action');

let ADD_TODO = require('./action').ADD_TODO;
let TOGGLE_TODO = require('./action').TOGGLE_TODO;
let SET_VISIBILITY_FILTER = require('./action').SET_VISIBILITY_FILTER;

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};

module.exports = function todoApp(state = initialState, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return Object.assign({}, state, {
        visibilityFilter: action.filter
      });
    case ADD_TODO:
      console.log();
      return Object.assign({}, state, {
        todos: [
          ...state.todos,
          {
            text: action.text,
            completed: false
          }
        ]
      });
    case TOGGLE_TODO:
      return Object.assign({}, state, {
        todos: state.todos.map((todo, index) => {
          if (index === action.index) {
            return Object.assign({}, todo, {
              completed: !todo.completed
            })
          }
          return todo
        })
      });
    default:
      return state
  }
};
