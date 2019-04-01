import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const questions = [
  { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
  { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
  { name: 'Product 3', desc: 'Something else', price: '$6.51' },
  { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
  { name: 'Shipping', desc: '', price: 'Free' },
];


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
  state = {
    open: true,
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {

    const { classes, containerTitle, allQuestionsAnswers, myQuestions  } = props;
    const data = questions;
  
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