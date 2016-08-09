let createStore  = require('redux').createStore;
let todoApp = require('./reducers') ;

let {addTodo, toggleTodo, setVisibilityFilter, VisibilityFilters} = require('./action');


const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: []
};
// connect store with global reducer
let store = createStore(todoApp, initialState);

/*
 let state = todoApp(state, setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));
 state = todoApp(state, addTodo('Hello world'));
 state = todoApp(state, toggleTodo(0));
 */

function init() {
  // console.log('start state',store.getState());
  let unsubscribe = store.subscribe(() =>
    console.log(store.getState())
  );

  // dispatch action => action describe changes then reducer changed data(immutable) and save in store
  store.dispatch(addTodo('Learn about actions'));
  store.dispatch(addTodo('Learn about reducers'));
  store.dispatch(addTodo('Learn about store'));
  store.dispatch(toggleTodo(0));
  store.dispatch(toggleTodo(1));
  store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));

  unsubscribe();
}

module.exports = init;
