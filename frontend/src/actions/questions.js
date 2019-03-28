
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




export const SET_TWEET = 'SET_TWEET'
export const FETCH_TWEET_BEGIN = 'FETCH_TWEET_BEGIN'

export function fetchLatestQuestions (skip) {
  return dispatch => {
    dispatch({
      type: HOME_GET_LATEST_QUESTIONS
    });

    return fetch(`/questions/${skip}`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.data.length > 0) {
            dispatch({
              type: HOME_SET_LATEST_QUESTIONS,
              questions: response.data
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

    return fetch(`/questions/${skip}`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.data.length > 0) {
            dispatch({
              type: HOME_SET_HOT_QUESTIONS,
              questions: response.data
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

export function fetchTweet (tweetId) {
  return dispatch => {
    dispatch({
      type: FETCH_TWEET_BEGIN
    })

    return fetch(`${ config.url.api }tweet/${ tweetId }`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.success) {
            dispatch({
              type: SET_TWEET,
              tweet: response.data
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

export function postTweet (tweet) {
  const token = localStorage.getItem('token')

  return dispatch => {
    return fetch(`${ config.url.api }tweet/add`, {
      method: 'post',

      body: JSON.stringify(tweet),

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(response => response.json())
  }
}
