import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitIcon from '@material-ui/icons/ExitToApp';
import BookmarkCollection from '@material-ui/icons/CollectionsBookmark';
import { connect } from 'react-redux';
import { bookSearch, navigate, toggleStyleTheme } from '../redux/actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.primary.lighter,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  switchLabel: {
    fontSize: '1rem',
    padding: '0 8px',
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.secondary.light,
  },
  inputRoot: {
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class Nav extends React.Component {
  state = {
    drawerOpen: false,
    search: '',
  };

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  updateStyleTheme = () => {
    const { dispatch } = this.props;
    dispatch(toggleStyleTheme());
  }

  navigate = (route) => {
    const { dispatch } = this.props;
    dispatch(navigate(route));
  }

  handleSearch = (e) => {
    e.preventDefault();

    const { dispatch } = this.props;
    const { search } = this.state;
    dispatch(bookSearch(search));
  }

  updateSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    const { classes, logout, styleTheme } = this.props;
    const { drawerOpen, search } = this.state;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button key="My Library" onClick={() => this.navigate('/library')}>
            <ListItemIcon><BookmarkCollection /></ListItemIcon>
            <ListItemText primary="My Library" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {/* <ListItem button>
            <FormControlLabel
              classes={{ label: classes.switchLabel }}
              control={(
                <Switch
                  checked={styleTheme === 'dark'}
                  onChange={() => this.updateStyleTheme()}
                />
                )}
              label="Dark Mode"
            />
          </ListItem> */}
          {['Logout'].map(text => (
            <ListItem button key={text} onClick={() => logout()}>
              <ListItemIcon>
                <ExitIcon color="error" />
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Shelf
            </Typography>
            <div className={classes.grow} />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={this.handleSearch} noValidate autoComplete="off">
                <InputBase
                  placeholder="Find books"
                  onChange={this.updateSearch}
                  value={search}
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </form>
            </div>
          </Toolbar>
          <Drawer open={drawerOpen} onClose={this.toggleDrawer(false)}>
            <div
              tabIndex={0}
              role="button"
              onClick={this.toggleDrawer(false)}
              onKeyDown={this.toggleDrawer(false)}
            >
              {sideList}
            </div>
          </Drawer>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(connect()(Nav));
