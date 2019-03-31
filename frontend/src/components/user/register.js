// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// UI Imports
import Snackbar from "@material-ui/core/Snackbar";
import Button from "@material-ui/core/Button";
import { blue500, red500 } from "@material-ui/core/colors";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";


// App Imports
import { postRegister } from '../../actions/user'

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




class UserRegister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
      error: '',
      isLoading: false,
      isLoggingIn: false,
      notification: false,
      registered: false
    }
  }

  onSubmit(event) {
    event.preventDefault()

    console.log('E - submit #form-user')

    let input = {}
    input.username = this.state.username
    input.password = this.state.password

    if (input.username !== '' && input.password !== '') {
      this.setState({ isLoggingIn: true, isLoading: true })

      this.props.postRegister(input).then((response) => {
        if (response.success) {
          this.setState({
            isLoading: false,
            isLoggingIn: false,
            notification: true,
            firstname: '',
            lastname: '',
            email: '',
            address: '',
            city: '',
            zip: '',
            country: '',
            username: '',
            password: '',
            error: ''
          })

          // Redirect
          setTimeout(() => {
            this.setState({ registered: true })
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

  onChange(event) {
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
                REGISTER
              </Typography>

              {this.state.error ? (
                <Card>
                  <CardContent color={red500}>
                    {this.state.error}
                  </CardContent>
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
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.onChange.bind(this)}
                  label="First Name"
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.onChange.bind(this)}
                  label="Last Name"
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                />


                <TextField
                  name="username"
                  value={this.state.username}
                  onChange={this.onChange.bind(this)}
                  label="Username"
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                />

                <TextField
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={this.onChange.bind(this)}
                  label="Password"
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                />
                <TextField
                  name="email"
                  value={this.state.email}
                  onChange={this.onChange.bind(this)}
                  label="Email"
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                />

                <TextField
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange.bind(this)}
                  label="Adress"
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                />


                <TextField
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange.bind(this)}
                  label="City"
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                />

                <TextField
                  name="zip"
                  value={this.state.zip}
                  onChange={this.onChange.bind(this)}
                  label="Zip"
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                />


                <TextField
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange.bind(this)}
                  label="Adress"
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                />

                <TextField
                  name="zip"
                  value={this.state.zip}
                  onChange={this.onChange.bind(this)}
                  label="Zip"
                  fullWidth={true}
                  variant="outlined"
                  margin="dense"
                />



                <br />
                <br />

                <Button type="submit" color="secondary">
                  Submit
                </Button>

                <Link to="/user/login">
                  <Button>Login</Button>
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

              {this.state.registered ? <Redirect to="/user/login" /> : ""}
            </CardContent>
          </Card>
        </Paper>
      </main>
    );
  }
}

UserRegister.propTypes = {
  postRegister: PropTypes.func.isRequired
}

export default connect(null, { postRegister })(withStyles(styles)(UserRegister))
