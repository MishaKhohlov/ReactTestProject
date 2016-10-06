import fetch from 'isomorphic-fetch'
/*
 * типы действий
 */
const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';
const CHANGE_TODO = 'CHANGE_TODO';
const DELETE_ITEM = 'DELETE_ITEM';
const RECEIVE_POSTS = 'RECEIVE_POSTS';

// async
const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT';
const REQUEST_POSTS = 'REQUEST_POSTS';


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
    text,
    promise: () => {
      return new Promise(function (resolve, reject) {
        setTimeout(() => {
          resolve('Prooomise')
        }, 2000)
      });
    }
  }
}

function toggleTodo(index) {
  return {type: TOGGLE_TODO, index}
}

function setVisibilityFilter(filter) {
  return {type: SET_VISIBILITY_FILTER, filter}
}

function setNewValueItem(id, val) {
  return {type: CHANGE_TODO, id: id, value: val}
}


function deleteItem(id) {
  return {type: DELETE_ITEM, id: id}
}

// async

function selectSubreddit() {
  return {type: SELECT_SUBREDDIT}
}

function invalidateSubreddit(error) {
  return {type: INVALIDATE_SUBREDDIT, error}
}

function requestPosts() {
  return {type: REQUEST_POSTS}
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.user,
    receivedAt: Date.now(),
    meta: {delay: 4000}
  }
}

function fetchPosts(subreddit) {
  return function (dispatch) {
    dispatch(requestPosts(subreddit));
    return fetch(`${subreddit}.json`)
      .then(respond => respond.json())
      .then(json => {
          dispatch(receivePosts(subreddit, json))
        },
        error => {
          dispatch(invalidateSubreddit(error))
        }
      )
  }
}

export {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  setNewValueItem,
  deleteItem,
  selectSubreddit,
  invalidateSubreddit,
  requestPosts,
  receivePosts,
  fetchPosts,
  VisibilityFilters,
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  CHANGE_TODO,
  DELETE_ITEM,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS
};
