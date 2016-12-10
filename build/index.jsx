import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {
  Router,
  Route,
  Redirect,
  IndexRedirect,
  IndexRoute,
  browserHistory,
  hashHistory
} from 'react-router'
import {VisibilityFilters, fetchPosts} from './action/action';
import {rootReducer} from './reduser/reducers';

import UserListConnect from './components/userList/userList.jsx';
import AddTodoHome from './components/addTodoPage/addTodoPage.jsx';
import BanList from './components/banList/banList.jsx';
import NotFound from './components/notFound/notFound.jsx';
import Login from './components/login/login'

// Redux мидлвэры Они предоставляют стороннюю точку расширения между отправкой действия и моментом,
// когда это действие достигает редюсера.
import {logger, timeoutScheduler, readyStatePromise} from './middleware/middleware'

// funny logs
const loggerMiddleware = createLogger();

const initialState = {
  visibilityFilter: VisibilityFilters.SHOW_ALL,
  todos: [
    {text: 'Name1', completed: false},
    {text: 'Name2', completed: false}
  ],
  userState: {
    name: '',
    isAuthenticated: false
  }
};

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    timeoutScheduler, // timeout in meta {delay: N}
    readyStatePromise, // promises
    logger // my logs action
    // loggerMiddleware // neat middleware that logs actions
  )
);

store.dispatch(fetchPosts('exampleServerData')).then((data) => {
    // console.log(store.getState())
  }
);

import App from './components/app/app.jsx'

// hashHistory - work with browser sync
// browserHistory - work on server


const routes = (
  <div>
    <Route path='/' component={App}>
      <IndexRoute component={UserListConnect}/>
      <Route path='/login' component={Login}/>
      <Route path='add' components={AddTodoHome}
             onEnter={Login.checkLogin}
             onChange={Login.change}
             onLeave={Login.leave}>
        <Route path='banlist/:data' component={BanList}/>
      </Route>
    </Route>
    <Route path='*' component={NotFound}/>
  </div>
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory} routes={routes}/>
  </Provider>,
  $('#body')[0]
);

