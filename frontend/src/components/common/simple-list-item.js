import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';

import Divider from '@material-ui/core/Divider';

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
    const { classes, question, user, created, mostActiveUser } = this.props;


    return (
      <React.Fragment>
        <ListItem variant="inset">
          <Avatar>
            <HelpOutline />
          </Avatar>
          <ListItemText primary={mostActiveUser} secondary={created} />
        </ListItem>
        <Divider variant="inset" />
      </React.Fragment>
    );
  }
}

SimpleListItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleListItem);
