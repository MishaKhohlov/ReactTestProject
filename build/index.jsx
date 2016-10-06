import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {logger, timeoutScheduler} from './middleware/middleware'
import {createStore, applyMiddleware} from 'redux';
import {Provider, connect} from 'react-redux';
import {VisibilityFilters, selectSubreddit, fetchPosts} from './action/action';
import {rootReducer} from './reduser/reducers';

// funny logs
const loggerMiddleware = createLogger();

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: [
    {text: 'Name1', completed: false},
    {text: 'Name2', completed: false}
  ]
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    timeoutScheduler, // timeuot in meta {delay: N}
    // logger // my logs action
    // loggerMiddleware // neat middleware that logs actions
  )
);

store.dispatch(fetchPosts('exampleServerData')).then((data) => {
  }
  // console.log(store.getState())
);

import App from './components/app/app.jsx'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  $('#body')[0]
);

