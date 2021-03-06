// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Loading from '../loading'
// App Imports
import HotQuestionsContainer from './hot-questions/hot-questions-container';
import LatestQuestionsContainer from './latest-questions/latest-list-container'
import MostActiveUsersContainer from './most-active-user/most-active-users-container'


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



class HomeViewContainer extends Component {

  render() {
    const classes = this.props.classes;
    return (
      <React.Fragment>
      <div className={classes.heroUnit}>
        <div className={classes.heroContent}>
          <Typography component="h1" variant="h5" align="center" color="textPrimary" gutterBottom>
            Home Page
            </Typography>
          <Typography variant="h6" align="center" color="textSecondary" paragraph>
            Display wrapper around Latest Answers, Hottest Questions, Most Active Users components.
            The endpoints for the components are public, no auth needed here.
            </Typography>

        </div>

        <Paper className={classes.paper}>
        <LatestQuestionsContainer label={"Latest Questions"} />
        <HotQuestionsContainer label={"Hottest Questions"}/>
        <MostActiveUsersContainer label={"Most Active Users"}/>
        
          </Paper>
        </div>
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
