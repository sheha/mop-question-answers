// Imports
import { combineReducers } from 'redux'

// App Imports
import user from './user'
import { latestQuestions, hotQuestions } from './questions'

export default combineReducers({
  user,
  latestQuestions,
  hotQuestions
})
