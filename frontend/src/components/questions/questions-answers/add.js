// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// UI Imports
import Snackbar from '@material-ui/Snackbar'
import Button from '@material-ui/core/Button'
import { blue500, red500 } from '@material-ui/styles/colors'
import TextField from '@material-ui/TextField'
import { Card, CardText } from '@material-ui/Card'

// App Imports
import { postQuestion } from '../../../actions/questions'
import AuthRedirect from '../../user/auth-redirect'
import Loading from '../../loading'

class QuestionAdd extends Component {
  constructor (props) {
    super(props)

    this.state = {
      question: '',
      isLoading: false,
      error: '',
      notification: false,
      viewTweet: false,
      questionId: '',
      userId:''
    }
  }

  onSubmit (event) {
    event.preventDefault()


    this.setState({isLoading: true})

    let input = {}
    input.question = this.state.question
    input.user = this.user;

    if (input.question !== '') {
      this.props.postQuestion(input).then((response) => {
        if (response.success) {
          this.setState({isLoading: false, notification: true, text: '', error: '', questionId: response.data.questionId})
        } else {
          this.setState({isLoading: false, error: response.errors[0].message})
        }
      })
    } else {
      this.setState({isLoading: false, error: 'Question cannot be empty.', notification: false})
    }
  }

  onChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <section>
        <h2><span role="img" aria-label="tweet">💭</span> Tweet to the world</h2>

        <br/>

        {this.state.error ? <Card><CardText color={red500}>{this.state.error}</CardText></Card> : ''}

        {this.state.message ? <Card><CardText color={blue500}>{this.state.message}</CardText></Card> : ''}

        <form id="form-add" onSubmit={this.onSubmit.bind(this)}>
          <TextField
            name="question"
            value={this.state.question}
            onChange={this.onChange.bind(this)}
            label="Please enter your question."
            multiLine={true}
            rows={2}
            fullWidth={true}
          />

          <br/>
          <br/>

          {this.state.isLoading ? <Loading/> : <Button  type="submit" color="secondary" >Submit</Button>}
        </form>

        <Snackbar
          open={this.state.notification}
          message="Question has been added!"
          autoHideDuration={4000}
          action="View Question"
          onActionClick={() => (this.setState({viewTweet: true}))}
        />

        {this.state.viewTweet ? <Redirect to={`/questions/${ this.state.questionId }`}/> : ''}

        <AuthRedirect/>
      </section>
    )
  }
}

TweetAdd.propTypes = {
  postTweet: PropTypes.func.isRequired
}

export default connect(null, {postTweet})(TweetAdd)
