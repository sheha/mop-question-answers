import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import StarBorder from "@material-ui/icons/StarBorder";


import Grid from '@material-ui/core/Grid';




const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SimpleNestedListViewer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      open: true
    };
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {

    const { classes, containerTitle, allQuestionsAnswers, myQuestions  } = this.props;
    const data = [];

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          {containerTitle}
        </Typography>
        <List disablePadding>
          {data.map(item => (
            <React.Fragment>
              <ListItem className={classes.listItem} key={item.name}>
                <ListItemText primary={item.name} secondary={item.desc} />
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
                <Typography variant="body2">{item.price}</Typography>
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem button className={classes.nested}>
                    <ListItemIcon>
                      <StarBorder />
                    </ListItemIcon>
                    <ListItemText inset primary="Starred" />
                  </ListItem>
                </List>
              </Collapse>
            </React.Fragment>
          ))}

        </List>
      </React.Fragment>
    );

  }
}


SimpleNestedListViewer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleNestedListViewer);
