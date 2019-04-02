
import config from '../config/index'

//REDUX ACTIONS

// home route - get only
export const HOME_GET_LATEST_QUESTIONS = "HOME_GET_LATEST_QUESTIONS";
export const HOME_SET_LATEST_QUESTIONS = "HOME_SET_LATEST_QUESTIONS";
export const HOME_GET_HOT_QUESTIONS = "HOME_GET_HOT_QUESTIONS";
export const HOME_SET_HOT_QUESTIONS = "HOME_SET_HOT_QUESTIONS";
export const HOME_GET_MOST_ACTIVE_USERS = "HOME_GET_MOST_ACTIVE_USERS";
export const HOME_SET_MOST_ACTIVE_USERS = "HOME_SET_MOST_ACTIVE_USERS";

// questions route - get/post
export const QUESTIONS_GET_ALL_QA = "QUESTIONS_GET_ALL_Q";
export const QUESTIONS_SET_ALL_QA = "QUESTIONS_SET_ALL_Q";





export const SET_QUESTION = 'SET_QUESTION'
export const GET_QUESTION = 'GET_QUESTION'

export function fetchAllQuestionsAnswers (skip) {
  return dispatch => {
    dispatch({
      type: QUESTIONS_GET_ALL_QA
    });

    return fetch(`${config.url.api }questions/all/${skip}`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.data) {

              dispatch({
                type: QUESTIONS_SET_ALL_QA,
                allQuestionsAnswers: response.data
              });




          }else{
            dispatch({
              type: QUESTIONS_SET_ALL_QA,
              allQuestionsAnswers: [] // dispatch with empty collection, it's okay to receive []
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

export function fetchLatestQuestions (skip) {
  return dispatch => {
    dispatch({
      type: HOME_GET_LATEST_QUESTIONS
    });

    return fetch(`${config.url.api }questions/latest/${skip}`).then(function (response) {

      if (response.ok) {
        console.log("ssssss", response)
        response.json().then(function (response) {
          if (response.data && response.data.length > 0) {
            dispatch({
              type: HOME_SET_LATEST_QUESTIONS,
              latestQuestions: response.data
            });
          }else{
            dispatch({
              type: HOME_SET_LATEST_QUESTIONS,
              latestQuestions: [] // dispatch with empty collection
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

export function fetchHotQuestions(skip) {
  return dispatch => {
    dispatch({
      type: HOME_GET_HOT_QUESTIONS
    });

    return fetch(`${config.url.api }questions/hot/${skip}`).then(function (response) {
      if (response.ok) {
        return response.json().then(function (json) {

          if (response.data && response.data.length > 0) {
            dispatch({
              type: HOME_SET_HOT_QUESTIONS,
              hotQuestions: response.data
            });
          } else {
            dispatch({
              type: HOME_SET_HOT_QUESTIONS,
              hotQuestions: []
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
