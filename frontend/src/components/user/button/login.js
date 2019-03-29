// Imports
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// UI Imports
import Button from '@material-ui/core/Button'

class UserButtonLogin extends Component {
  render () {
    return (
      <Link to="/user/login"><Button {...this.props} label="Login" /></Link>
    )
  }
}

export default UserButtonLogin
