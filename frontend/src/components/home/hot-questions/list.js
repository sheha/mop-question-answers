// Imports
import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import moment from 'moment'

// UI Imports
import { Card, CardTitle } from 'material-ui/Card'

function HotQuestionsList ({questions}) {
  const emptyMessage = (
    <p>No tweets to show.</p>
  )

  const questionsList = (
    questions.map(({_id, question, answers, created, user}) => (
      <Card key={_id}>
        <Link to={`/questions/${ _id }`}><CardTitle title={question} subtitle={moment(created).fromNow()}/></Link>
      </Card>
    ))
  )

  return (
    <div>
      {questions.length === 0 ? emptyMessage : questionsList}
    </div>
  )
}

HotQuestionsList.propTypes = {
  questions: PropTypes.array.isRequired
}

export default HotQuestionsList
