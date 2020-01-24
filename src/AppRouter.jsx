import React from 'react';
import {
  Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Library from './views/Library';
import Login from './views/Login/Login';
import Explore from './views/Explore';
import Register from './views/Register/Register';
import Notification from './views/Notification';
import Dashboard from './views/Dashboard';
import history from './history';
import { clearNotification } from './redux/actions';

const ProtectedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props => (isLoggedIn === true
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />)}
  />
);

class AppRouter extends React.Component {
  handleClearNotification = () => {
    const { dispatch } = this.props;
    dispatch(clearNotification());
  }

  render() {
    const { isLoggedIn, notification } = this.props;
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
        {notificationSnackbar}
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/register" component={Register} />
          <Route path="/explore" component={Explore} />
          <ProtectedRoute isLoggedIn={isLoggedIn} path="/library" component={Library} />
          <Route path="/" render={() => <Redirect to="/library" />} />
        </Switch>
      </Router>
    );
  }
}

const mapStateToProps = state => ({
  isLoggedIn: state.token && state.currentUser !== null,
  styleTheme: state.styleTheme,
  notification: state.notification,
});

export default connect(mapStateToProps)(AppRouter);
