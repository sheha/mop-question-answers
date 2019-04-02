import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import { useTheme } from "@material-ui/core/styles";

import PersonalInfo from './personal-info';
import MyQuestions from './my-questions';
import {fetchFullUserProfile} from '../../actions/user'

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
    this.props.fetchFullUserProfile(this.props.user.user.username);
  }



  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };



  render() {
    const { classes, userProfile } = this.props;


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
              axis={'x'}
              index={this.state.value}
              onChangeIndex={this.handleChangeIndex}
            >
              <TabContainer dir='rtl'>
                <PersonalInfo userProfile={userProfile}/>
              </TabContainer>
              <TabContainer><MyQuestions myQuestions={userProfile} />
              </TabContainer>

            </SwipeableViews>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

ProfileDetailsContainer.propTypes = {
  user:PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  userProfile: PropTypes.object.isRequired,
  fetchFullUserProfile:PropTypes.func.isRequired

};
function profileState (state) {
  return {
    userProfile: state.userProfile,
    user:state.user
  }
}

export default connect(profileState, {fetchFullUserProfile}) (withStyles(styles)(ProfileDetailsContainer));
