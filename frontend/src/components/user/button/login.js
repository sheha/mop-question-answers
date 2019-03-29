// Imports
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// UI Imports
import Button from '@material-ui/core/Button'

class UserButtonLogin extends Component {
  render () {
    return (
      <Link to="/user/login"><Button {...this.props} variant="outlined" color="secondary" >Login</Button></Link>
    )
  }
}

export default UserButtonLogin
