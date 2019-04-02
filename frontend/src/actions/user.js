// Imports
import jwtDecode from 'jwt-decode'

// App Imports
import config from '../config'
//profile actions
export const USER_CURRENT_SET = 'USER_CURRENT_SET'
export const USER_CURRENT_ALL_QUESTIONS = "USER_CURRENT_ALL_QUESTIONS";

export const HOME_GET_MOST_ACTIVE_USERS = 'HOME_GET_MOST_ACTIVE_USERS'
export const HOME_SET_MOST_ACTIVE_USERS = 'HOME_SET_MOST_ACTIVE_USERS'

export const PROFILE_GET_FULL_USER = 'PROFILE_GET_FULL_USER'
export const PROFILE_SET_FULL_USER = 'PROFILE_SET_FULL_USER'

export function postLogin (credentials) {
  return dispatch => {
    return fetch(`${ config.url.api }user/login`, {
      method: 'post',

      body: JSON.stringify(credentials),

      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.ok) {
          return response.json()
        }
      })
      .then(response => {
        if (response.success) {
          const token = response.data.token

          localStorage.setItem('token', token)

          dispatch(setCurrentUser(jwtDecode(token)))
        }

        return response
      })
  }
}

export function postRegister (credentials) {
  return dispatch => {
    return fetch(`${ config.url.api }user/register`, {
      method: 'post',

      body: JSON.stringify(credentials),

      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
  }
}

export function setCurrentUser (user) {
  return {
    type: USER_CURRENT_SET,
    user
  }
}

export function userLogout () {
  return dispatch => {
    localStorage.removeItem('token')

    dispatch(setCurrentUser({}))

    return {success: true}
  }
}

export function fetchMostActiveUsers () {
  return dispatch => {
    dispatch({
      type: HOME_GET_MOST_ACTIVE_USERS
    });

    return fetch(`${config.url.api}user/all`).then(
      function(response) {
        if (response.ok) {
          response.json().then(function(response) {
            if (response.data && response.data.length > 0) {
              dispatch({
                type: HOME_SET_MOST_ACTIVE_USERS,
                mostActiveUsers: response.data
              });
            } else {
              dispatch({
                type: HOME_SET_MOST_ACTIVE_USERS,
                mostActiveUsers: [] // dispatch with empty collection
              });
            }
          });
        } else {
          console.log(
            "Looks like the response wasn't perfect, got status",
            response.status
          );
        }
      },
      function(e) {
        console.log("Fetch failed!", e);
      }
    );
  }
}

export function fetchFullUserProfile(credentials) {
  return dispatch => {
    dispatch({
      type: PROFILE_GET_FULL_USER
    });

    return fetch(`${config.url.api}user/info`, {
      method: 'post',

      body: JSON.stringify({ "username":credentials }),

      headers: {
        'Content-Type': 'application/json'
      }
    }).then(
      function(response) {
        if (response.ok) {
          response.json().then(function(response) {
            if (response.data && response.data.length >= 0) {
              dispatch({
                type: PROFILE_GET_FULL_USER,
                mostActiveUsers: response.data || []
              });
            } else {
              dispatch({
                type: PROFILE_SET_FULL_USER,
                mostActiveUsers: [] // dispatch with empty collection
              });
            }
          });
        } else {
          console.log(
            "Looks like the response wasn't perfect, got status",
            response.status
          );
        }
      },
      function(e) {
        console.log("Fetch failed!", e);
      }
    );
  }
}
