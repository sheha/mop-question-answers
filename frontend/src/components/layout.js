// Imports
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// UI Imports
import AppBar from '@material-ui/core/AppBar'
import Drawer from '@material-ui/core/Drawer'
import MenuItem from '@material-ui/core/MenuItem'

import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

// App Imports
import UserButtonLogin from './user/button/login'
import UserButtonLogged from './user/button/logged'
import { withStyles } from '@material-ui/core';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

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
      <div>
        {/* <AppBar
          onLeftIconButtonClick={this.handleDrawerToggle}
          iconElementRight={isAuthenticated ? <UserButtonLogged/> : <UserButtonLogin/>}
        >QuestionsAnswers</AppBar> */}
        <AppBar position="static">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              News
          </Typography>
            {isAuthenticated ? <UserButtonLogged /> : <UserButtonLogin />}
          </Toolbar>
        </AppBar>

        {/* <Drawer
          docked={false}
          width={200}
          open={this.state.drawerOpen}
          onRequestChange={(drawerOpen) => this.setState({drawerOpen})}
        >
          <MenuItem onClick={this.handleDrawerToggle} containerElement={<Link to="/"/>}><span role="img" aria-label="home">🏠</span> Home</MenuItem>
          <MenuItem onClick={this.handleDrawerToggle} containerElement={<Link to="/about"/>}><span role="img" aria-label="info">ℹ️</span> About</MenuItem>

        </Drawer> */}
        <React.Fragment>
          {this.props.children}
          </React.Fragment>
      </div>
    )
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
