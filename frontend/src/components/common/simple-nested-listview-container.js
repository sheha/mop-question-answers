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
import moment from 'moment';


import Grid from '@material-ui/core/Grid';
import MyQuestions from '../profile/my-questions';




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
      open: false
    };
  }

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {

    const { classes, containerTitle, allQuestionsAnswers, myQuestions  } = this.props;
    const data = allQuestionsAnswers;

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          {containerTitle}
        </Typography>
        <List disablePadding>
          {data.map(item => (
            <React.Fragment>
              <ListItem
                className={classes.listItem}
                key={item._id}
                dense
                divider
              >
                <ListItemText
                  primary={'Question: ' + item.question}
                  secondary={'Created by user: '+item.user.username}
                />
                <ListItemText
                  primary={'Created on:' + item.created}
                  secondary={"Collapse to see answers"}
                />
                <Typography variant="body2">
                  {"Likes:" + item.likes}
                </Typography>
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItem>
              <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.answers.map(answer => (
                    <ListItem
                      button
                      className={classes.nested}
                      dense
                      divider
                    >
                      <ListItemText inset primary={answer.answer} />
                      <ListItemText inset primary={answer.user} />
                    </ListItem>
                  ))}
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
