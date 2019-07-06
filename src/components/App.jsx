import React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Library from './Library';
import Login from './Auth/Login';
import Explore from './Explore';
import Register from './Auth/Register';
import Notification from './Notification';
import history from '../history';
import { clearNotification } from '../redux/actions';
import './App.css';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
  />
);

class App extends React.Component {
  handleClearNotification = () => {
    const { dispatch } = this.props;
    dispatch(clearNotification());
  }

  render() {
    const { styleTheme, isLoggedIn, notification } = this.props;

    const theme = createMuiTheme({
      palette: {
        type: styleTheme,
        primary: {
          main: '#f1f3f4',
          light: '#fafafa',
          lighter: '#ffffff',
          dark: '#333333',
        },
        secondary: {
          main: '#1976d2',
          light: '#63a4ff',
          dark: '#004ba0',
        },
      },
      typography: {
        useNextVariants: true,
        fontFamily: 'Open Sans, sans-serif',
      },
    });

    let notificationSnackbar;
    if (notification) {
      notificationSnackbar = (
        <Notification
          notification={notification}
          handleClearNotification={this.handleClearNotification}
        />
      );
    }

    return (
      <Router history={history}>
        <MuiThemeProvider theme={theme}>
          {notificationSnackbar}
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/explore" component={Explore} />
            <ProtectedRoute isLoggedIn={isLoggedIn} path="/library" component={Library} />
            <Route path="/" render={() => <Redirect to="/library" />} />
          </Switch>
        </MuiThemeProvider>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.token && state.currentUser !== null,
  styleTheme: state.styleTheme,
  notification: state.notification,
});

export default connect(mapStateToProps)(App);
