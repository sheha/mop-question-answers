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
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from '@material-ui/core/Paper';

import { postLogin } from "../../actions/user";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});



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

  render() {
    const classes = this.props.classes;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Card raised className={classes.card}>
            <CardContent>
              <Typography
                className={classes.title}
                color="textSecondary"
                gutterBottom
              >
                LOGIN
            </Typography>

              {this.state.error ? (
                <Card>
                  <CardContent color={red500}>{this.state.error}</CardContent>
                </Card>
              ) : (
                  ""
                )}

              {this.state.message ? (
                <Card>
                  <CardContent color={blue500}>
                    {this.state.message}
                  </CardContent>
                </Card>
              ) : (
                  ""
                )}

              <form id="form-user" onSubmit={this.onSubmit.bind(this)}>
                <TextField
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange.bind(this)}
                  label="Username"
                  fullWidth={true}
                />

                <TextField
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange.bind(this)}
                  label="Password"
                  fullWidth={true}
                />

                <br />
                <br />

                <Button type="submit" color="secondary">
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

              {this.state.logged ? <Redirect to="/questions" /> : ""}
            </CardContent>
          </Card>

        </Paper>

      </main>



    );
  }
}

UserLogin.propTypes = {
  postLogin: PropTypes.func.isRequired
}

UserLogin.contextTypes = {
  router: PropTypes.object.isRequired
}

export default
connect(
  null,
  { postLogin}
)(withStyles(styles)(UserLogin));
