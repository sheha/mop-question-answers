// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// App Imports
import HotQuestionsContainer from '../home/hot-questions/hot-questions-container';
import Loading from '../loading'

class HomeViewContainer extends Component {

  render () {
    return (


          <HotQuestionsContainer />






    );
  }
}

HomeViewContainer.propTypes = {
  user: PropTypes.object.isRequired
}

function homeState (state) {
  return {
    user: state.user
  }
}

export default connect(homeState)(HomeViewContainer)
