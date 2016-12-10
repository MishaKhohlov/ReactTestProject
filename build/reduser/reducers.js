import {combineReducers} from 'redux';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  CHANGE_TODO,
  DELETE_ITEM,
  SELECT_SUBREDDIT,
  INVALIDATE_SUBREDDIT,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  VisibilityFilters,
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT_SUCCES
} from './../action/action';

const initialLocalStotage = window.localStorage.getItem('auth_login') || '';

function userState(state = initialLocalStotage, action) {
  switch(action.type) {
    case LOGIN_REQUEST:
      return {};
    case LOGIN_FAIL:
      return {};
    case LOGIN_SUCCESS:
      return Object.assign({}, action.payload);
    case LOGOUT_SUCCES:
      return {};
    default:
      return state
  }
}

// default value important without init state
function visibilityFilter(state = VisibilityFilters.SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state
  }
}

// slice reducer on small parts
function posts(state = {
  isFetching: false,
  didInvalidate: false,
  error: '',
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
      return Object.assign({}, state, {
        didInvalidate: true,
        error: action.error,
        items: []
      });
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        items: []
      });
    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.posts,
        lastUpdated: action.receivedAt
      });
    default:
      return state
  }
}

function selectedSubreddit(state = 'reactjs', action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state
  }
}

function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, posts(state, action));
    default:
      return state
  }
}

// default value important without init state
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ];
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      });
    case CHANGE_TODO:
      let newArray = [...state];
      newArray[action.id].text = action.value;
      return newArray;
    case DELETE_ITEM:
      let newSliceArray = [...state];
      newSliceArray.splice(action.id, 1);
      return newSliceArray;
    default:
      return state
  }
}


const rootReducer = combineReducers({
  visibilityFilter,
  todos,
  postsBySubreddit,
  userState
});


// start state for child reducer get for key in object

/*function todoApp(state, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}
 */

export {rootReducer};
