// Imports
import jwtDecode from 'jwt-decode'

// App Imports
import config from '../config'
//profile actions
export const USER_CURRENT_SET = 'USER_CURRENT_SET'
export const USER_CURRENT_ALL_QUESTIONS = "USER_CURRENT_ALL_QUESTIONS";

export const HOME_GET_MOST_ACTIVE_USERS = 'HOME_GET_MOST_ACTIVE_USERS'

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

    return fetch('/user/all').then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.data && response.data.length > 0) {
            dispatch({
              type: HOME_SET_MOST_ACTIVE_USERS,
              mostActiveUsers: response.data
            });
          }else{
            dispatch({
              type: HOME_SET_MOST_ACTIVE_USERS,
              mostActiveUsers: [] // dispatch with empty collection 
            });
          }

        } 
        )
      } else {
        console.log('Looks like the response wasn\'t perfect, got status', response.status)
      }
    }, function (e) {
      console.log('Fetch failed!', e)
    })
  }
}


