import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Formik } from 'formik';
import * as Yup from 'yup';
import LoginForm from './LoginForm';
import { login } from '../../redux/actions';
import Branding from '../../components/Branding';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: '#15202B',
  },
});

const validationSchema = Yup.object({
  email: Yup.string('Enter your Email')
    .required('Email is required'),
  password: Yup.string('Enter your Password')
    .required('Password is required'),
});

const Login = (props) => {
  const submitLogin = (values, actions) => {
    const { dispatch } = props;
    dispatch(login(values, actions));
  }

  const { authLoading } = props;
  const classes = useStyles();
  const initialValues = { email: '', password: '' };

  return (
    <>
      <Branding />
      <Grid container justify="center" className={classes.root}>
        <Grid item style={{ marginTop: 48 }}>
          <Formik
            render={props => <LoginForm {...props} authLoading={authLoading} />}
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={(values, actions) => submitLogin(values, actions)}
          />
        </Grid>
      </Grid>
    </>
  );
}

const mapStateToProps = state => ({
  authLoading: state.authLoading,
  isLoggedIn: state.token && state.currentUser !== null,
});

export default connect(mapStateToProps)(Login);
