import {combineReducers} from 'redux';
import { ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER, CHANGE_TODO, DELETE_ITEM, VisibilityFilters } from './../action/action';

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
          id: state.length,
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
    case CHANGE_TODO:
      let newArray = [...state];
      newArray[action.id].text = action.value;
      return newArray;
    case DELETE_ITEM:
      let newSliceArray = [...state];
      console.log(newSliceArray);
      newSliceArray.splice(action.id, 1);
      console.log(newSliceArray);
      return newSliceArray;
    default:
      return state
  }
}

// start state for child reducer get for key in object
const todoAppReducers = combineReducers({
  visibilityFilter,
  todos
});


/*function todoApp(state, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
 */

export {todoAppReducers};
