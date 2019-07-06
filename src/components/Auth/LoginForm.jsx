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
import { Link } from 'react-router-dom';
import CustomButton from '../Button';

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 675,
  },
  form: {
    textAlign: 'center',
  },
  header: {
    backgroundColor: theme.palette.primary.main,
  },
  errorMessage: {
    color: 'red',
    textAlign: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  pos: {
    marginBottom: 12,
  },
});

function LoginForm(props) {
  const {
    values: { username, password },
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
    <Card className={classes.card}>
      <CardHeader className={classes.header} title="Login" action={<Link to="/register">Register</Link>} classes={{ title: classes.title }} />
      <CardContent>
        {dirty && <Typography variant="body1" align="center" color="error">{status}</Typography>}
        {authLoading && (
          <div style={{ textAlign: 'center' }}>
            <CircularProgress />
          </div>
        )}
        <Form className={classes.form}>
          <TextField
            id="username-input"
            name="username"
            label="Username"
            helperText={touched.username ? errors.username : ''}
            error={touched.username && Boolean(errors.username)}
            className={classes.textField}
            autoComplete="username"
            value={username}
            onChange={e => change('username', e)}
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
    </Card>
  );
}

export default withStyles(styles)(LoginForm);
