import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider'

import HelpOutline from '@material-ui/icons/HelpOutline';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class SimpleListItem extends React.Component {
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };
  // todo : collapsable

  render() {
    const { classes, displayItem } = this.props;

    return (
        <List
          subheader={<ListSubheader component="div">LATEST QUESTIONS</ListSubheader>}
          className={classes.root}
        >
          <ListItem button>
            <ListItemIcon>
            <HelpOutline />
            </ListItemIcon>
            <ListItemText inset primary="Sent mail" />
          </ListItem>
          <Divider/>
          
        </List>
      );
  }
}

SimpleListItem.propTypes = {
  displayItem:propTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleListItem);
