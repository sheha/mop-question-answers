// Imports
import { combineReducers } from 'redux'

// App Imports
import user, { mostActiveUsers, userProfile} from './user'
import { latestQuestions, hotQuestions, allQuestionsAnswers } from './questions'

export default combineReducers({
  user,
  mostActiveUsers,
  userProfile,
  latestQuestions,
  hotQuestions,
  allQuestionsAnswers
})
