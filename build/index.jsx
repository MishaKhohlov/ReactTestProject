import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {createStore, applyMiddleware } from 'redux';
import {Provider, connect} from 'react-redux';
import {VisibilityFilters, selectSubreddit, fetchPosts } from './action/action';
// import {todoAppReducers, rootReducer} from './reduser/reducers';
import {rootReducer} from './reduser/reducers';



const loggerMiddleware = createLogger();

const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

store.dispatch(selectSubreddit('reactjs'));
//
// store.dispatch(fetchPosts('reactjs')).then(() =>
//   console.log(store.getState())
// );




import App from './components/app/app.jsx'

// init data
/*
const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: [
    {text: 'Name1', completed: false},
    {text: 'Name2', completed: false}
  ]
};

let store = createStore(todoAppReducers, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  $('#body')[0]
);
*/
