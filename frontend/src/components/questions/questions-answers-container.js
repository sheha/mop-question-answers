// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Loading from '../loading'
// App Imports
// import HotQuestionsContainer from './hot-questions/hot-questions-container';
// import LatestQuestionsContainer from './latest-questions/latest-list-container'

import QuestionsAnswersDetails from './questions-answers/questions-answers-details'



const styles = theme => ({
  paper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",

    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  heroUnit: {
    marginTop: 20,
    padding:20,
    backgroundColor: theme.palette.background.paper,
    height:"100%"
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto"
  },
});


class QuestionsAnswersViewContainer extends Component {

  render() {
    const {classes, user} = this.props.classes;
    return (
      <React.Fragment>
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>

          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Display wrapper around QuestionsAnswersDetails and QuestionAdd components.
            Authenticated users can add questions and answers, and like or dislike questions.
            Anonymous users can view the listing, but adding is disabled.
            </Typography>

        </div>

        <Paper className={classes.paper}>

        <QuestionsAnswersDetails user={user} />
          </Paper>
        </div>
        </React.Fragment>
    );
  }
}

QuestionsAnswersViewContainer.propTypes = {
  classes:PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

function homeState (state) {
  return {
    user: state.user
  }
}

export default connect(
  homeState,
  {}
)(withStyles(styles)(QuestionsAnswersViewContainer));
