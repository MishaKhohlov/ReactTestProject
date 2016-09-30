import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {VisibilityFilters} from './action/action';
import {todoAppReducers} from './reduser/reducers';

import App from './components/app/app.jsx'

// init data
const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: [
    {text: 'Name 1', completed: false},
    {text: 'Name 2', completed: false}
  ]
};

let store = createStore(todoAppReducers, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  $('#body')[0]
);
