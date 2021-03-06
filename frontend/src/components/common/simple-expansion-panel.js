import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";

import SimpleListItem from './simple-list-item';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(13),
    fontWeight: theme.typography.fontWeightRegular,
  },
});


function SimpleExpansionPanel(props) {
  const { classes, latestQuestions, hotQuestions, label, mostActiveUsers } = props;


  const latestQuestionsDisplay =
    latestQuestions && latestQuestions.map(({ _id, question, answers, created }) => (
      <SimpleListItem
        key={_id}
        question={question}
        created={created}
      />));


  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMore />}>
          <Typography className={classes.heading}>{label}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <List className={classes.root}>
            {latestQuestionsDisplay}


            {/* {hotQuestions &&
              hotQuestions.map(({ _id, question, answers, created, user }) => (
                <SimpleListItem
                  key={_id}
                  question={question}
                  created={created}
                  user={user}
                />
              ))} */}
            {/* {mostActiveUsers && mostActiveUsers.map(({ _id, user }) => (
              <SimpleListItem
                key={_id}
                mostActiveUser={user}
              />
            ))} */}
          </List>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
