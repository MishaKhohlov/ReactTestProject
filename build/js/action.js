/*
 * типы действий
 */

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';


/*
 * другие константы
 */

const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE'
};
/*
 * генераторы действий
 */

function addTodo(text) {
  return { type: ADD_TODO, text }
};

function toggleTodo(index) {
  return { type: TOGGLE_TODO, index }
};

function setVisibilityFilter(filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
};

module.exports = {
  addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters, ADD_TODO, TOGGLE_TODO, SET_VISIBILITY_FILTER
};
