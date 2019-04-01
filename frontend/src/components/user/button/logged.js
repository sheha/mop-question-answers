// // Imports
// import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
// import { connect } from 'react-redux'
// import PropTypes from 'prop-types'

// // UI Imports
// import MenuItem from '@material-ui/core/MenuItem'
// import IconButton from '@material-ui/core/IconButton'
// import Menu from '@material-ui/core/Menu'
// import MoreVert from '@material-ui/icons/MoreVert'

// // App Imports
// import { userLogout } from '../../../actions/user'

// class UserButtonLogged extends Component {
//   constructor () {
//     super()

//     this.state = {
//       notification: false,
//       loggedOut: false
//     }
//   }

//   logout (event) {
//     event.preventDefault()

//     this.props.userLogout()
//   }

//   render () {
//     return (
//       <Menu
//         iconButtonElement={
//           <IconButton><MoreVert /></IconButton>
//         }
//         targetOrigin={{horizontal: 'right', vertical: 'top'}}
//         anchorOrigin={{horizontal: 'right', vertical: 'top'}}
//       >
//         <Link to="/questions/add"><MenuItem primaryText="Ask a Question"/></Link>
//         <MenuItem primaryText="Sign out" onClick={this.logout.bind(this)}/>
//       </Menu>
//     )
//   }
// }

// UserButtonLogged.propTypes = {
//   userLogout: PropTypes.func.isRequired,
// }

// export default connect(null, {userLogout})(UserButtonLogged)


import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AccountCircle from '@material-ui/core/AccountCircle'

// App Imports
import { userLogout } from '../../../actions/user'

class UserButtonLogged extends React.Component {
  state = {
    anchorEl: null,

      notification: false,
      loggedOut: false

  };

  
  logout (event) {
    event.preventDefault()
    this.setState({ anchorEl: null });
    this.props.userLogout()
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;

    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'user-logged-in' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          color="secondary"
        >
          <AccountCircle/>
        </Button>
        <Menu
          id="user-logged-in"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <Link to="/user"><MenuItem onClick={this.handleClose}>Profile</MenuItem></Link>
          <Link to="/questions"><MenuItem onClick={this.handleClose}>Add New Question</MenuItem></Link>
          <MenuItem onClick={this.logout.bind(this)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  }
}

UserButtonLogged.propTypes = {
  userLogout: PropTypes.func.isRequired,
}

export default connect(null, {userLogout})(UserButtonLogged)

