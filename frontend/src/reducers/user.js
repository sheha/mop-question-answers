// Imports
import isEmpty from 'lodash/isEmpty'

// App Imports
import { USER_CURRENT_SET, HOME_GET_MOST_ACTIVE_USERS, HOME_SET_MOST_ACTIVE_USERS } from '../actions/user'

const initialState = {
  isAuthenticated: false,
  user: {}
}

export function  mostActiveUsers(state = {mostActiveUsers: [], error: false, loading: false}, action = {})  {
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



export default (state = initialState, action = {}) => {
  switch (action.type) {
    case USER_CURRENT_SET:
      return {
        isAuthenticated: !isEmpty(action.user),
        user: action.user
      }

    default:
      return state
  }
}
