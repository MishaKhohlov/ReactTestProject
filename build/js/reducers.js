let combineReducers  = require('Redux').combineReducers;

let VisibilityFilters = require('./action').VisibilityFilters;

let ADD_TODO = require('./action').ADD_TODO;
let TOGGLE_TODO = require('./action').TOGGLE_TODO;
let SET_VISIBILITY_FILTER = require('./action').SET_VISIBILITY_FILTER;

// default value important without init state
function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state
  }
}

// default value important without init state
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      });
    default:
      return state
  }
}

// start state for child reducer get for key in object
const todoApp = combineReducers({
  visibilityFilter,
  todos
});
/*function todoApp(state, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}*/

module.exports = todoApp;
