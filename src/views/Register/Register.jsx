import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';
import RegisterForm from './RegisterForm';
import { registerUser } from '../../redux/actions';
import Branding from '../../components/Branding';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: '#15202B',
  },
});

const validationSchema = Yup.object({
  name: Yup.string('Enter your Name')
    .required('Name is required'),
  username: Yup.string('Enter your Username')
    .required('Username is required'),
  password: Yup.string('Enter your Password')
    .min(6, 'Password must contain at least 6 characters')
    .required('Password is required'),
});

const Register = props => {
  const submitRegistration = (values, actions) => {
    const { dispatch } = props;
    dispatch(registerUser(values, actions));
  }

    const { authLoading } = props;
    const classes = useStyles();

    const initialValues = {
      name: '', username: '', password: '',
    };

  return (
    <>
      <Branding />
      <Grid container justify="center" className={classes.root}>
        <Slide direction="up" in timeout={750}>
          <Grid item style={{ marginTop: 75 }}>
            <Formik
              render={props => <RegisterForm {...props} authLoading={authLoading} />}
              validationSchema={validationSchema}
              initialValues={initialValues}
              onSubmit={(values, actions) => submitRegistration(values, actions)}
            />
          </Grid>
        </Slide>
      </Grid>
    </>
  );
}

export default connect()(Register);
