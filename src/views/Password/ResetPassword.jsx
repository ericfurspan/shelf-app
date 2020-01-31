import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Spinner from '../../components/Spinner';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import CustomButton from '../../components/Button';
import Button from '@material-ui/core/Button';
import Branding from '../../components/Branding';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    backgroundColor: '#15202B',
  },
  card: {
    minWidth: 300,
    maxWidth: 675,
  },
  form: {
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 200,
  },
  errorWrapper: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
  },
  errorControl: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 78,
    alignItems: 'center',
    height: 100,
    justifyContent: 'space-between',
  },
  tokenValidator: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12
  }
});

const validationSchema = Yup.object({
  password: Yup.string('Enter your Password')
    .required('Password is required')
    .min(6, 'Password must contain at least 6 characters'),
});

const ResetPassword = props => {
  const [state, setState] = useState({
    email: '',
    isLoading: true,
    error: false,
    tokenValidated: false,
    passwordUpdated: false,
  });

  useEffect(() => {
    const { match: { params: { token } } } = props;
    submitValidateResetToken(token);
  }, []);

  const submitValidateResetToken = async resetToken => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/verifyPasswordResetToken`, {
        params: { resetPasswordToken: resetToken },
      });
      if (response.status === 200) {
        setState({
          email: response.data.email,
          isLoading: false,
          error: false,
          tokenValidated: true,
        });
      }
    } catch (error) {
      setState({
        tokenValidated: false,
        error: error.response.data,
        isLoading: false,
      });
    }      
  }

  const submitUpdatePassword = async formValues => {
    const { match: { params: { token } } } = props;
    const { email } = state;

    try {
      setState({ isLoading: true });

      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/auth/updatePasswordViaToken`,
        {
          email,
          password: formValues.password,
          resetPasswordToken: token,
        },
      );
      if (response.status === 200) {
        setState({
          error: false,
          passwordUpdated: true,
          isLoading: false,
        });
      }
    } catch (error) {
      setState({
        passwordUpdated: false,
        error: error.response.data,
        isLoading: false,
      });
    }
  }

  const change = (value, e, formProps) => {
    e.persist();
    formProps.handleChange(e);
    formProps.setFieldTouched(value, true, false);
  };


  const { classes } = props;
  const { error, isLoading, tokenValidated, passwordUpdated } = state;

  if (isLoading) { return ( <Spinner /> ) }

  if (error) {
    return (
      <div className={classes.root}>
        <div className={classes.errorWrapper}>
          <Typography variant="h6" align="center" color="secondary">{error}</Typography>
          <div className={classes.errorControl}>
          <Typography variant="subtitle1" color="secondary">Need to reset your password?</Typography>
            <Link component={RouterLink} to="/forgotpassword">
              <Button
                variant='outlined'
                color='secondary'
                type='button'
                size='large'
              >
                Get a reset link
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Branding />
      <Grid container justify="center" className={classes.root}>
        <Grid item style={{ marginTop: 48 }}>
          <Formik
            validationSchema={validationSchema}
            onSubmit={(formValues, actions) => submitUpdatePassword(formValues, actions)}          
            render={formProps => (
              <Fade in timeout={750}>
                <Card className={classes.card}>
                {passwordUpdated ? (
                  <div style={{ padding: 12, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 125 }}>
                    <Typography variant="body1" align="center" style={{ color: 'green' }}>Password Changed!</Typography>
                    <Link component={RouterLink} to="/login">
                      <Button
                        variant='contained'
                        color='primary'
                        type='button'
                        size='large'
                      >
                        Login
                      </Button>
                    </Link>
                  </div>
                ) : (
                   <>
                    <CardHeader className={classes.header} title="Reset Password" align="center" classes={{ title: classes.title }} />
                    <CardContent>
                      {formProps.dirty && <Typography variant="body1" align="center" color="error">{formProps.status}</Typography>}
                      <Form className={classes.form}>
                        <TextField
                          id="password-input"
                          name="password"
                          label="New Password"
                          helperText={formProps.touched.password ? formProps.errors.password : ''}
                          error={formProps.touched.password && Boolean(formProps.errors.password)}
                          className={classes.textField}
                          type="password"
                          value={formProps.password}
                          onChange={e => change('password', e, formProps)}
                          margin="normal"
                        />                        
                        <CardActions style={{ justifyContent: 'center' }}>
                          {
                            CustomButton({
                              variant: 'contained',
                              color: 'secondary',
                              text: 'Submit',
                              type: 'submit',
                              disabled: !formProps.isValid,
                            })
                          }
                        </CardActions>
                      </Form>
                      {tokenValidated && (<div className={classes.tokenValidator}><CheckCircleIcon style={{ color: 'green' }} /><Typography variant="caption" style={{ marginLeft: 4 }}>Validated! You may change your password</Typography></div>)}
                    </CardContent>
                   </>
                  )}
                </Card>
              </Fade>                
            )}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default withStyles(styles)(connect()(ResetPassword));
