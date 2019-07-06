import React from 'react';
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import RegisterForm from './RegisterForm';
import { registerUser } from '../../redux/actions';

const styles = () => ({
  root: {
    flexGrow: 1,
  },
});

const validationSchema = Yup.object({
  fullname: Yup.string('Enter your Full name')
    .required('Full name is required'),
  username: Yup.string('Enter your Username')
    .required('Username is required'),
  password: Yup.string('Enter your Password')
    .min(6, 'Password must contain at least 6 characters')
    .required('Password is required'),
});

class Register extends React.Component {
  submitRegistration = (values, actions) => {
    const { dispatch } = this.props;
    dispatch(registerUser(values, actions));
  }

  render() {
    const { authLoading } = this.props;

    const initialValues = {
      fullname: '', username: '', password: '',
    };

    return (
      <div className={styles.root}>
        <Grid container justify="center">
          <Slide direction="down" in timeout={750}>
            <Grid item style={{ marginTop: 100 }}>
              <Formik
                render={props => <RegisterForm {...props} authLoading={authLoading} />}
                validationSchema={validationSchema}
                initialValues={initialValues}
                onSubmit={(values, actions) => this.submitRegistration(values, actions)}
              />
            </Grid>
          </Slide>
        </Grid>
      </div>
    );
  }
}

export default connect()(Register);
