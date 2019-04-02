// Imports
import update from 'immutability-helper';

// App Imports
import {
  HOME_GET_LATEST_QUESTIONS,
  HOME_SET_LATEST_QUESTIONS,
  HOME_GET_HOT_QUESTIONS,
  HOME_SET_HOT_QUESTIONS,
  QUESTIONS_GET_ALL_QA,
  QUESTIONS_SET_ALL_QA
} from "../actions/questions";

const initialState = {
  latestQuestions:[],
  hotQuestions:[],
  allQuestionsAnswers: [],
  error: false,
  loading: false
};

export function allQuestionsAnswers(state = {
  allQuestionsAnswers: [],
  error:false,
  loading:false
}, action = {}) {
  switch (action.type) {
    case QUESTIONS_GET_ALL_QA:
      return update(state, {
        $merge: {
          allQuestionsAnswers: [],
          error: false,
          loading: true
        }
      });

    case QUESTIONS_SET_ALL_QA:
      return update(state, {
        $merge: {
          allQuestionsAnswers: action.allQuestionsAnswers,
          error: false,
          loading: false
        }
      });

    default:
      return state;
  }
}

export function latestQuestions(state = {
  latestQuestions: [],
  error: false,
  loading:false
}, action = {}) {
  switch (action.type) {
    case HOME_GET_LATEST_QUESTIONS:
      return update(state, {
        $merge: {
          latestQuestions: [],
          error: false,
          loading: true
        }
      });

    case HOME_SET_LATEST_QUESTIONS:
      return update(state, {
        $merge: {
          latestQuestions: action.latestQuestions,
          error: false,
          loading: false
        }
      });

    default:
      return state;
  }
}

export function hotQuestions(state = {
  hotQuestions: [],
  loading: false,
  error:false
}, action = {}) {
  switch (action.type) {
    case HOME_GET_HOT_QUESTIONS:
      return update(state, {
        $merge: {
          hotQuestions: [],
          error: false,
          loading: true
        }
      });

    case HOME_SET_HOT_QUESTIONS:
      return update(state, {
        $merge: {
          hotQuestions: action.hotQuestions,
          error: false,
          loading: false
        }
      });

    default:
      return state;
  }
}
