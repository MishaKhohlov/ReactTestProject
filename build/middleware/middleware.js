import * as Action from '../action/action';
import {hashHistory} from 'react-router'

// example middleware
const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result
};

const timeoutScheduler = store => next => action => {
  if (!action.meta || !action.meta.delay) {
    return next(action)
  }

  let timeoutId = setTimeout(
    () => next(action),
    action.meta.delay
  );

  return function cancel() {
    clearTimeout(timeoutId)
  }
};


const readyStatePromise = store => next => action => {
  if (!action.promise) {
    return next(action)
  }

  function makeAction(done, data) {
    let newAction = Object.assign({}, action, {done}, data);
    delete newAction.promise;
    return newAction
  }

  return action.promise().then(
    result => next(makeAction(true, {result})),
    error => next(makeAction(false, {error}))
  )
};

const authUser = store => next => action => {
  if(!action.password || action.type !== Action.LOGIN_REQUEST) {
    return next(action)
  }
  window.localStorage.setItem('auth_login', action.password);
};

const loginSuccess = store => next => action => {
  if(action.type !== Action.LOGIN_SUCCESS) {
    return next(action)
  }

  if(!action.payload.isAuthenticated) {
    window.localStorage.removeItem('auth_login');
    hashHistory.replace('/');
  } else {
    hashHistory.push('/add');
  }

  return next(action)
};

const logout = store => next => action => {
  if(action.type !== Action.LOGOUT_SUCCES) {
    return next(action)
  }

  hashHistory.replace('/');
  window.localStorage.removeItem('auth_login');

  return next(action)
};

const router = store => next => action => {
  if(action.type !== Action.ROUTING) {
    return next(action)
  }

  hashHistory[action.method](action.url)
};


export {
  logger,
  timeoutScheduler,
  readyStatePromise,
  authUser,
  loginSuccess,
  logout,
  router
}