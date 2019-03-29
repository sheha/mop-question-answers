// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// UI Imports
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import { blue500, red500 } from '@material-ui/core/colors'
import TextField from '@material-ui/core/TextField'
import { Card, CardText } from '@material-ui/core/Card'

// App Imports
import { postLogin } from '../../actions/user'

class UserLogin extends Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: '',
      isLoading: false,
      isLoggingIn: false,
      notification: false,
      logged: false
    }
  }

  onSubmit (event) {
    event.preventDefault()

    console.log('E - submit #form-user')

    let input = {}
    input.username = this.state.username
    input.password = this.state.password

    if (input.username !== '' && input.password !== '') {
      this.setState({isLoggingIn: true, isLoading: true})

      this.props.postLogin(input).then((response) => {
        if (response.success) {
          this.setState({
            isLoading: false,
            isLoggingIn: false,
            notification: true,
            username: '',
            password: '',
            error: ''
          })

          // Redirect
          setTimeout(() => {
            this.setState({logged: true})
          }, 1000)
        } else {
          this.setState({
            isLoading: false,
            isLoggingIn: false,
            error: response.errors[0].message,
            notification: false
          })
        }
      })
    } else {
      this.setState({
        error: 'Please enter your username and password.',
        notification: false
      })
    }
  }

  onChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render () {
    return (
      <section>
        <h2>Login</h2>

        <br />

        {this.state.error ? (
          <Card>
            <CardText color={red500}>{this.state.error}</CardText>
          </Card>
        ) : (
          ""
        )}

        {this.state.message ? (
          <Card>
            <CardText color={blue500}>{this.state.message}</CardText>
          </Card>
        ) : (
          ""
        )}

        <form id="form-user" onSubmit={this.onSubmit.bind(this)}>
          <TextField
            name="username"
            value={this.state.username}
            onChange={this.onChange.bind(this)}
            floatingLabelText="Username"
            fullWidth={true}
          />

          <TextField
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.onChange.bind(this)}
            floatingLabelText="Password"
            fullWidth={true}
          />

          <br />
          <br />

          <Button type="submit" backgroundColor={blue500}>
            Submit
          </Button>

          <Link to="/user/register">
            <Button>Register</Button>
          </Link>
        </form>

        <Snackbar
          open={this.state.isLoggingIn}
          message="Logging in..."
          autoHideDuration={1000}
        />

        <Snackbar
          open={this.state.notification}
          message="Login successful, redirecting..."
          autoHideDuration={2000}
        />

        {this.state.logged ? <Redirect to="/tweet/add" /> : ""}
      </section>
    );
  }
}

UserLogin.propTypes = {
  postLogin: PropTypes.func.isRequired
}

UserLogin.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, {postLogin})(UserLogin)
