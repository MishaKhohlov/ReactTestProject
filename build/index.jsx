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
    {text: 'Name1', completed: false},
    {text: 'Name2', completed: false}
  ],
  selectedSubreddit: 'frontend',
  postsBySubreddit: {
    frontend: {
      isFetching: true,
      didInvalidate: false,
      items: []
    },
    reactjs: {
      isFetching: false,
      didInvalidate: false,
      lastUpdated: 1439478405547,
      items: [ 42, 100 ]
    }
  },
  /*entities: {
    users: {
      2: {
        id: 2,
        name: 'Andrew'
      }
    },
    posts: {
      42: {
        id: 42,
        title: 'Confusion about Flux and Relay',
        author: 2
      },
      100: {
        id: 100,
        title: 'Creating a Simple Application Using React JS and Flux Architecture',
        author: 2
      }
    }
  }*/
};

let store = createStore(todoAppReducers, initialState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  $('#body')[0]
);
