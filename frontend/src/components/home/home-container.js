// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import Loading from '../loading'
import TweetView from './view'

class HomeContainer extends Component {

  render () {
    return (
      <section>
        <h2> HOME-CONTAINER</h2>

        <br/>

        {this.props.tweet.loading ? <Loading/> : <TweetView tweet={this.props.tweet.details}/>}
      </section>
    )
  }
}

HomeContainer.propTypes = {
  tweet: PropTypes.object.isRequired,
  fetchTweet: PropTypes.func.isRequired
}

function tweetState (state) {
  return {
    tweet: state.tweet
  }
}

export default connect(tweetState, {fetchTweet})(TweetViewContainer)
