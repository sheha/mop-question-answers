// Imports
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'

// UI Imports
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


// App Imports
//import registerServiceWorker from './registerServiceWorker'
import { setCurrentUser } from './actions/user'
import rootReducer from './reducers/root'
import App from './app'
import './index.css'


const theme = createMuiTheme(
  {
    typography: {  // fix for outdated typography elements
      useNextVariants: true,
    },
    palette: {
      "common": {
        "black": "rgba(110, 107, 107, 1)",
        "white": "rgba(215, 255, 255, 1)"
      },
      "background": {
        "paper": "rgba(239, 242, 244, 1)",
        "default": "rgba(184, 186, 181, 1)"
      },
      "primary": {
        "light": "rgba(140, 140, 140, 1)",
        "main": "rgba(66, 69, 66, 1)",
        "dark": "rgba(51, 169, 103, 1)",
        "contrastText": "rgba(246, 157, 9, 1)"
      },
      "secondary": {
        "light": "#ff4081",
        "main": "rgba(234, 151, 28, 1)",
        "dark": "#c51162",
        "contrastText": "#fff"
      },
      "error": {
        "light": "#e57373",
        "main": "rgba(196, 26, 13, 1)",
        "dark": "#d32f2f",
        "contrastText": "#fff"
      },
      "text": {
        "primary": "rgba(19, 16, 16, 1)",
        "secondary": "rgba(245, 166, 35, 100)",
        "disabled": "rgba(0, 0, 0, 0.38)",
        "hint": "rgba(0, 0, 0, 0.38)"
      }
    }
  }
);
// Store
const store = createStore(
  rootReducer,

  compose(
    applyMiddleware(thunk)
  )
)

// User Authentication
const token = localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
  store.dispatch(setCurrentUser(jwtDecode(token)))
}

// Render App
ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router>
        <App/>
      </Router>
    </MuiThemeProvider>
  </Provider>,

  document.getElementById('root')
)

// Service Worker
//registerServiceWorker()
