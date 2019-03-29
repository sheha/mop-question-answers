// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
// App Imports
import HotQuestionsContainer from '../home/hot-questions/hot-questions-container';
import Loading from '../loading'

const styles = theme => ({
  paper: {
    marginTop: 20,
    display: "flex",
    flexDirection: "column",

    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper
  },
  heroContent: {
    maxWidth: 600,
    margin: "0 auto",
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`
  },
});


class HomeViewContainer extends Component {

  render() {
    const classes = this.props.classes;
    return (
      <React.Fragment>
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Questions and Answers
            </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Assignment
            </Typography>

        </div>
        </div>
        <Paper className={classes.paper}>

        <HotQuestionsContainer />
        </Paper>
        </React.Fragment>
    );
  }
}

HomeViewContainer.propTypes = {
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
)(withStyles(styles)(HomeViewContainer));
