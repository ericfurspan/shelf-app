import React from 'react';
import { Form } from 'formik';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import CustomButton from '../../components/Button';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  card: {
    minWidth: 300,
    maxWidth: 675,
  },
  form: {
    textAlign: 'center',
  },
  errorMessage: {
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing(),
    marginRight: theme.spacing(),
    width: 200,
  },
  pos: {
    marginBottom: 12,
  },
  header: {
    color: '#15202B',
  },
  signUpLink: {
    margin: '24px auto',
    display: 'flex',
    justifyContent: 'center'
  },
  signUpWrapper: {
    position: 'initial',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 325,
    justifyContent: 'flex-start',
    marginTop: 24,
  },
  forgot: {
    display: 'flex',
    justifyContent: 'center',
    padding: 12,
  }
});

const LoginForm = props => {
  const {
    values: { email, password },
    errors,
    touched,
    status,
    dirty,
    handleChange,
    isValid,
    setFieldTouched,
    authLoading,
  } = props;

  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };
  const { classes } = props;

  return (
    <>
      <Fade in timeout={750}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Login" align="center" color="primary" classes={{ title: classes.title }} />
          <CardContent>
            {dirty && <Typography variant="body1" align="center" color="error">{status}</Typography>}
            {authLoading && (
              <div style={{ textAlign: 'center' }}>
                <CircularProgress />
              </div>
            )}
            <Form className={classes.form}>
              <TextField
                id="email-input"
                name="email"
                label="Email"
                helperText={touched.email ? errors.email : ''}
                error={touched.email && Boolean(errors.email)}
                className={classes.textField}
                autoComplete="email"
                value={email}
                onChange={e => change('email', e)}
                margin="normal"
              />
              <br />
              <TextField
                id="password-input"
                name="password"
                label="Password"
                helperText={touched.password ? errors.password : ''}
                error={touched.password && Boolean(errors.password)}
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={e => change('password', e)}
                margin="normal"
              />
              <CardActions style={{ justifyContent: 'center' }}>
                {
                  CustomButton({
                    variant: 'contained',
                    color: 'primary',
                    text: 'Submit',
                    type: 'submit',
                    disabled: !isValid,
                  })
                }
              </CardActions>
            </Form>
          </CardContent>
          <div className={classes.forgot}>
            <Link component={RouterLink} to="/forgotpassword">
              <Button
                variant='text'
                color='primary'
                type='button'
                size='medium'
              >
                Forgot Password
              </Button>
            </Link>
          </div>
        </Card>
      </Fade>
      <Fade in timeout={750}>
        <div className={classes.signUpWrapper}>
          <Typography variant="subtitle1" color="secondary" align="center">Need an account?</Typography>
          <Link component={RouterLink} to="/register">
            <Button
              variant="outlined"
              color="secondary"
              type='button'
              size='large'
              className={classes.signUpLink}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </Fade>      
    </>
  );
}

export default withStyles(styles)(LoginForm);
