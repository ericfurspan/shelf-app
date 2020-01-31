import React, { useState } from 'react';
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
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import CustomButton from '../../components/Button';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Branding from '../../components/Branding';
import Spinner from '../../components/Spinner';

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
  loginWrapper: {
    position: 'absolute',
    right: 6,
    top: 6,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    minWidth: 175,
    justifyContent: 'space-around',
  },
  loginLink: {
    margin: '24px auto',
    display: 'flex',
    justifyContent: 'center',
  },
});

const validationSchema = Yup.object({
  email: Yup.string('Enter your Email')
    .required('Email is required')
    .email(),
});

const ForgotPassword = props => {
  const [state, setState] = useState({
    showSuccess: false,
    showError: false,
    messageFromServer: '',
    isLoading: false,
  });

  const submitEmail = async formValues => {
    const { email } = formValues;

    try {
      setState({ isLoading: true });

      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/auth/forgotPassword`,
        { email: email },
      );
      if (response.status === 200) {
        setState({
          showSuccess: true,
          showError: false,
          messageFromServer: response.data,
          isLoading: false,
        });
      }
    } catch (error) {
      setState({
        showSuccess: false,
        showError: true,
        messageFromServer: error.response.data,
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
  const { showError, showSuccess, isLoading, messageFromServer } = state;

  return (
    <>
      <Branding />      
      <Grid container justify="center" className={classes.root}>     
        <Grid item style={{ marginTop: 48 }}>                   
          <Formik
            validationSchema={validationSchema}
            onSubmit={formValues => submitEmail(formValues)}          
            render={formProps => (
              <>
                <div className={classes.loginWrapper}>
                  <Link component={RouterLink} to="/login">
                    <Button
                      variant='outlined'
                      color='secondary'
                      type='button'
                      size='large'
                      className={classes.loginLink}
                    >
                      Login
                    </Button>
                  </Link>
                </div>
                <Fade in timeout={750}>
                  <Card className={classes.card}>
                    <CardHeader className={classes.header} title="Forgot Password?" align="center" classes={{ title: classes.title }} />
                    <CardContent>
                      {showError && (
                        <Typography variant="subtitle1" color="error" align="center">{messageFromServer}</Typography>
                      )}
                      {showSuccess && (
                        <Typography variant="subtitle1" align="center" style={{ color: 'green' }}>{messageFromServer}</Typography>
                      )}
                      {isLoading && (<Spinner size={25} />)}                    
                      {formProps.dirty && <Typography variant="body1" align="center" color="error">{formProps.status}</Typography>}
                      <Form className={classes.form}>
                        <TextField
                          id="email-input"
                          name="email"
                          label="Email"
                          className={classes.textField}
                          helperText={formProps.touched.email ? formProps.errors.email : ''}
                          error={formProps.touched.email && Boolean(formProps.errors.email)}
                          onChange={e => change('email', e, formProps)}
                          value={formProps.email}
                          margin="normal"
                        />
                        <CardActions style={{ justifyContent: 'center' }}>
                          {
                            CustomButton({
                              variant: 'contained',
                              color: 'secondary',
                              text: 'Submit',
                              type: 'submit',
                              disabled: !formProps.isValid || isLoading || showSuccess,
                            })
                          }
                        </CardActions>
                      </Form>
                    </CardContent>
                  </Card>
                </Fade>                
              </>
            )}
          />
        </Grid>
      </Grid>      
    </>
  );
}

export default withStyles(styles)(connect()(ForgotPassword));
