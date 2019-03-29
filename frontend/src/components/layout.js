// Imports
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// UI Imports
import AppBar from '@material-ui/core/AppBar'

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import UserButtonLogin from './user/button/login'
import UserButtonLogged from './user/button/logged'
import { withStyles } from '@material-ui/core';

import CssBaseline from "@material-ui/core/CssBaseline";

//main layout theme styles setup
const styles = theme => ({


  root: { flexGrow: 1 },
  grow: { flexGrow: 1 },
  appBar: {
    position: 'relative',
  },
  toolbarTitle: {
    flex: 1,
  },

  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  icon: {
    marginRight: theme.spacing.unit * 2,
  },
  heroUnit: {
    backgroundColor: theme.palette.background.paper,
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },


  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },

  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing.unit * 6,
  },
});

class Layout extends Component {
  constructor (props) {
    super(props)
    this.state = {
      drawerOpen: false
    }
  }

  handleDrawerToggle = () => this.setState({drawerOpen: !this.state.drawerOpen})

  render() {
    const classes = this.props.classes;
    const { isAuthenticated } = this.props.user;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar
          position="static"
          color="primary"
          className={classes.appBar}
        >
          <Toolbar>
            <Typography
              variant="h6"
              color="inherit"
              noWrap
              className={classes.toolbarTitle}
            >
              Questionairre
            </Typography>

            <Button color="secondary">Home</Button>
            <Button color="secondary">Questions</Button>
            <Button color="secondary">Profile</Button>
            {isAuthenticated ? <UserButtonLogged /> : <UserButtonLogin />}
          </Toolbar>
        </AppBar>

        <React.Fragment>
          <main className={classes.main}>{this.props.children}</main>
        </React.Fragment>
      </React.Fragment>
    );
  }
}

Layout.propTypes = {
  user: PropTypes.object.isRequired,
  classes:PropTypes.object.isRequired
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}


export default connect(mapStateToProps, {})(withStyles(styles)(Layout));
