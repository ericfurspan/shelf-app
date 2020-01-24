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
import Button from '../../components/Button';

const styles = theme => ({
  card: {
    minWidth: 275,
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
    <Card className={classes.card}>
      <CardHeader className={classes.header} title="Sign Up" action={<Link component={RouterLink} to="/login">I want to Login</Link>} classes={{ title: classes.title }} />
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
              Button({
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
  );
}

export default withStyles(styles)(RegisterForm);
