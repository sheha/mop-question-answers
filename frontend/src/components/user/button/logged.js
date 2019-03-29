// Imports
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

// UI Imports
import MenuItem from '@material-ui/core/MenuItem'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MoreVert from '@material-ui/icons/MoreVert'

// App Imports
import { userLogout } from '../../../actions/user'

class UserButtonLogged extends Component {
  constructor () {
    super()

    this.state = {
      notification: false,
      loggedOut: false
    }
  }

  logout (event) {
    event.preventDefault()

    this.props.userLogout()
  }

  render () {
    return (
      <Menu
        iconButtonElement={
          <IconButton><MoreVert /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
      >
        <Link to="/questions/add"><MenuItem primaryText="Ask a Question"/></Link>
        <MenuItem primaryText="Sign out" onClick={this.logout.bind(this)}/>
      </Menu>
    )
  }
}

UserButtonLogged.propTypes = {
  userLogout: PropTypes.func.isRequired,
}

export default connect(null, {userLogout})(UserButtonLogged)
