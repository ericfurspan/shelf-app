import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { Form } from 'formik';
import CustomButton from '../../components/Button';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
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
  pos: {
    marginBottom: 12,
  },
  loginLink: {
    margin: '36px auto',
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    color: '#15202B',
  },
  loginWrapper: {
    position: 'absolute',
    right: 12,
    top: 12,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 350,
    justifyContent: 'space-around',
  }
});

function RegisterForm(props) {
  const {
    values: { name, username, password },
    errors,
    touched,
    status,
    dirty,
    handleChange,
    isValid,
    setFieldTouched,
    authLoading,
  } = props;

  const change = (value, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(value, true, false);
  };

  const { classes } = props;

  return (
    <>
      <Slide direction="down" in timeout={750}>
        <div className={classes.loginWrapper}>
          <Typography variant="subtitle1" color="secondary" align="center">Already have an account?</Typography>
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
      </Slide>
      <Slide direction="down" in timeout={750}>
        <Card className={classes.card}>
          <CardHeader className={classes.header} title="Sign Up" align="center" classes={{ title: classes.title }} />
          <CardContent>
            {dirty && <Typography variant="body1" align="center" color="error">{status}</Typography>}
            {authLoading && (
              <div style={{ textAlign: 'center' }}>
                <CircularProgress />
              </div>
            )}
            <Form className={classes.form}>
              <TextField
                id="name-input"
                name="name"
                label="Name"
                className={classes.textField}
                helperText={touched.name ? errors.name : ''}
                error={touched.name && Boolean(errors.name)}
                onChange={e => change('name', e)}
                value={name}
                margin="normal"
              />
              <br />
              <TextField
                id="username-input"
                name="username"
                label="Username"
                className={classes.textField}
                autoComplete="username"
                helperText={touched.username ? errors.username : ''}
                error={touched.username && Boolean(errors.username)}
                onChange={e => change('username', e)}
                value={username}
                margin="normal"
              />
              <br />
              <TextField
                id="password-input"
                name="password"
                label="Password"
                className={classes.textField}
                type="password"
                autoComplete="current-password"
                helperText={touched.password ? errors.password : ''}
                error={touched.password && Boolean(errors.password)}
                onChange={e => change('password', e)}
                value={password}
                margin="normal"
              />
              <CardActions style={{ justifyContent: 'center' }}>
                {
                  CustomButton({
                    variant: 'contained',
                    color: 'secondary',
                    text: 'Submit',
                    type: 'submit',
                    disabled: !isValid,
                  })
                }
              </CardActions>
            </Form>
          </CardContent>
        </Card>
      </Slide>
    </>
  );
}

export default withStyles(styles)(RegisterForm);
