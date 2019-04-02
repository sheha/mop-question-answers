// Imports
import isEmpty from 'lodash/isEmpty'
import update from "immutability-helper";

// App Imports
import {
  USER_CURRENT_SET,
  HOME_GET_MOST_ACTIVE_USERS,
  HOME_SET_MOST_ACTIVE_USERS,
  PROFILE_GET_FULL_USER,
  PROFILE_SET_FULL_USER
} from '../actions/user'

const initialState = {
  isAuthenticated: false,
  user: {},
  mostActiveUsers: [],
  userProfile: {},
  error: false,
  loading: false,


}

export function mostActiveUsers(state = {
  mostActiveUsers: [],
  error: false,
  loading:false
}, action = {})  {
  switch (action.type) {
    case HOME_GET_MOST_ACTIVE_USERS:
      return update(state, {
        $merge: {
          mostActiveUsers: [],
          error: false,
          loading: true
        }
      });

    case HOME_SET_MOST_ACTIVE_USERS:
      return update(state, {
        $merge: {
          mostActiveUsers: action.mostActiveUsers,
          error: false,
          loading: false
        }
      });

    default:
      return state;
  }
}

export function userProfile(state = initialState, action = {})  {
  switch (action.type) {
    case PROFILE_GET_FULL_USER:
      return update(state, {
        $merge: {
          userProfile: {},
          error: false,
          loading: true
        }
      });

    case PROFILE_SET_FULL_USER:
      return update(state, {
        $merge: {
          userProfile: action.userProfile,
          error: false,
          loading: false
        }
      });

    default:
      return state;
  }
}



export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_CURRENT_SET:
   return update(state, {
        $merge: {
          isAuthenticated: !isEmpty(action.user),
          user: action.user,
          error: false,
          loading: true
        }
      });

    default:
      return state
  }
}
