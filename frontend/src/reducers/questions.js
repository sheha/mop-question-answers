// Imports
import update from 'immutability-helper'

// App Imports
import {
  HOME_GET_LATEST_QUESTIONS,
  HOME_SET_LATEST_QUESTIONS,
  HOME_GET_HOT_QUESTIONS,
  HOME_SET_HOT_QUESTIONS
} from "../actions/questions";

export function latestQuestions (state = {list: [], error: false, loading: false}, action = {}) {
  switch (action.type) {
    case HOME_GET_LATEST_QUESTIONS:
      return update(state, {
        $merge: {
          list: [],
          error: false,
          loading: true
        }
      });

    case HOME_SET_LATEST_QUESTIONS:
      return update(state, {
        $merge: {
          list: action.questions,
          error: false,
          loading: false
        }
      });

    default:
      return state;
  }
}

export function hotQuestions (state = {list: [], error: false, loading: false}, action = {}) {
  switch (action.type) {
    case HOME_GET_HOT_QUESTIONS:
      return update(state, {
        $merge: {
          list: [],
          error: false,
          loading: true
        }
      });

    case HOME_SET_HOT_QUESTIONS:
      return update(state, {
        $merge: {
          list: action.questions,
          error: false,
          loading: false
        }
      });

    default:
      return state;
  }
}

