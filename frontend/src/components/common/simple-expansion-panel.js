import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/core/styles';
import ExpansionPanel from 'material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from 'material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from 'material-ui/core/ExpansionPanelDetails';
import Typography from 'material-ui/core/Typography';
import ExpandMoreIcon from 'material-ui/icons/ExpandMore';

import SimpleListItem from './simple-list-item';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightBold,
  },
});

function SimpleExpansionPanel(props) {
  const { classes, itemsColl } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className={classes.heading}>Expansion Panel 1</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        itemsColl.map(({_id, question, answers, created, user}) => (
      <SimpleListItem key={_id} displayItem={question}>
    
      </SimpleListItem>
    ))
        
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  itemsColl:PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleExpansionPanel);