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

// async
function deleteItem(id) {
  return {type: DELETE_ITEM, id: id}
}

function selectSubreddit(subreddit) {
  return {type: SELECT_SUBREDDIT, subreddit}
}

function invalidateSubreddit(subreddit) {
  return {type: INVALIDATE_SUBREDDIT, subreddit}
}

function requestPosts(subreddit) {
  return {type: REQUEST_POSTS, subreddit}
}

function receivePosts(subreddit, json) {
  return {
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  }
}

export {
  addTodo,
  toggleTodo,
  setVisibilityFilter,
  setNewValueItem,
  deleteItem,
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
