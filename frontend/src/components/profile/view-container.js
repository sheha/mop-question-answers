import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';

import PersonalInfo from './personal-info';
import MyQuestions from './my-questions';
import {fetchFullUserProfile} from '../../actions/user'
import { connect } from 'tls';

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({

  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});


class ProfileDetailsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  componentDidMount() {
    this.props.fetchFullUserProfile();
  }



  handleTab = (event, value) => {
    this.setState(state => ({
      activeTab: value,
    }));
  };



  render() {
    const { classes, userFull } = this.props;
    const { activeTab } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <AppBar position="static" color="default">
              <Tabs
                value={this.state.value}
                onChange={this.handleChange}
                indicatorColor="secondary"
                textColor="primary"
                variant="fullWidth"
              >
                <Tab label="Personal Info" />
                <Tab label="My Questions" />

              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir={theme.direction}>
                <PersonalInfo userFull={userFull}/>
              </TabContainer>
              <TabContainer><MyQuestions myQuestions={userFull} />
              </TabContainer>

            </SwipeableViews>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

ProfileDetailsContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  userFull:PropTypes.object.isRequired

};
function profileState (state) {
  return {
    userFull: state.userFull
  }
}

export default connect(profileState, {}) (withStyles(styles)(ProfileDetailsContainer));