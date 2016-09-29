/*
 * типы действий
 */
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
const CHANGE_TODO = 'CHANGE_TODO';


/*
 * другие константы
 */
const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',

};


/*
 * генераторы действий
 */
function addTodo(text) {
  return {
    type: ADD_TODO,
    text
  }
}

function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
}

function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}

function setNewValueItem(id, val) {
  return {type: CHANGE_TODO, id: id, value: val}
}

export {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  setNewValueItem,
  VisibilityFilters,
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  CHANGE_TODO
};
