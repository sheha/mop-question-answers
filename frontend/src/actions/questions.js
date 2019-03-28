
import config from '../config/index'

//ACTIONS

// home route - get only
export const HOME_GET_LATEST_QUESTIONS = "HOME_GET_LATEST_QUESTIONS";
export const HOME_SET_LATEST_QUESTIONS = "HOME_SET_LATEST_QUESTIONS";
export const HOME_GET_HOT_QUESTIONS = "HOME_GET_HOT_QUESTIONS";
export const HOME_SET_HOT_QUESTIONS = "HOME_SET_HOT_QUESTIONS";
export const HOME_GET_MOST_ACTIVE_USERS = "HOME_GET_MOST_ACTIVE_USERS";
export const HOME_SET_MOST_ACTIVE_USERS = "HOME_SET_MOST_ACTIVE_USERS";

// questions route - get/post
export const QUESTIONS_GET_ALL_Q = "QUESTIONS_GET_ALL_Q";
export const QUESTIONS_SET_ALL_Q = "QUESTIONS_SET_ALL_Q";
export const QUESTIONS_GET_ALL_A = "QUESTIONS_GET_ALL_A";
export const QUESTIONS_SET_ALL_A = "QUESTIONS_SET_ALL_A";




export const SET_QUESTION = 'SET_QUESTION'
export const GET_QUESTION = 'GET_QUESTION'

export function fetchLatestQuestions (skip) {
  return dispatch => {
    dispatch({
      type: HOME_GET_LATEST_QUESTIONS
    });

    return fetch(`/questions/latest/${skip}`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.data.length > 0) {
            dispatch({
              type: HOME_SET_LATEST_QUESTIONS,
              latestQuestions: response.data
            });
          }
        })
      } else {
        console.log('Looks like the response wasn\'t perfect, got status', response.status)
      }
    }, function (e) {
      console.log('Fetch failed!', e)
    })
  }
}

export function fetchHotQuestions(skip) {
  return dispatch => {
    dispatch({
      type: HOME_GET_HOT_QUESTIONS
    });

    return fetch(`/questions/hot/${skip}`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.data.length > 0) {
            dispatch({
              type: HOME_SET_HOT_QUESTIONS,
              hotQuestions: response.data
            });
          }
        })
      } else {
        console.log('Looks like the response wasn\'t perfect, got status', response.status)
      }
    }, function (e) {
      console.log('Fetch failed!', e)
    })
  }
}

export function fetchQuestion (questionId) {
  return dispatch => {
    dispatch({
      type: GET_QUESTION
    })

    return fetch(`${ config.url.api }question/${ questionId }`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.success) {
            dispatch({
              type: SET_QUESTION,
              question: response.data
            })
          }
        })
      } else {
        console.log('Looks like the response wasn\'t perfect, got status', response.status)
      }
    }, function (e) {
      console.log('Fetch failed!', e)
    })
  }
}

export function postQuestion (question) {
  const token = localStorage.getItem('token')

  return dispatch => {
    return fetch(`${ config.url.api }question/add`, {
      method: 'post',

      body: JSON.stringify(question),

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(response => response.json())
  }
}

export function postAnswer (question) {
  const token = localStorage.getItem('token')

  return dispatch => {
    return fetch(`${ config.url.api }question/answer`, {
      method: 'post',

      body: JSON.stringify(question),

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(response => response.json())
  }
}
