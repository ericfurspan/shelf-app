import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles, fade } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitIcon from '@material-ui/icons/ExitToApp';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { connect } from 'react-redux';
import {
  bookSearch,
  navigate,
  toggleStyleTheme,
  logout,
} from '../redux/actions';
import Logo from '../components/Logo';
import SearchBar from '../components/SearchBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  drawerRoot: {
    color: '#333333',
    backgroundColor: theme.palette.secondary.main,
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
  navMid: {
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
    left: '45%',
    display: 'flex',
    flexDirection: 'column',
  },
  logo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '125px',
    justifyContent: 'space-around',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  search: {
    position: 'relative',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
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
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    width: '100%',
    color: '#FFFFFF',
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
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
    searchTerm: '',
  };

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  updateSearch = (value) => {
    this.setState({
      searchTerm: value,
    }); 
  }

  render() {
    const {
      classes,
      _logout,
      _navigate,
      handleSearch,
    } = this.props;
    const { drawerOpen, searchTerm } = this.state;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button key="Library" onClick={() => _navigate('/library')}>
            <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
            <ListItemText primary="Library" />
          </ListItem>
          <ListItem button key="Explore" onClick={() => _navigate('/explore')}>
            <ListItemIcon><SearchIcon /></ListItemIcon>
            <ListItemText primary="Explore" />
          </ListItem>
        </List>
        <Divider />
        <List>
          {['Logout'].map(text => (
            <ListItem button key={text} onClick={() => _logout()}>
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
          <Toolbar style={{ minHeight: '86px' }}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer(true)}>
              <MenuIcon fontSize="large" />
            </IconButton>
            <div className={classes.navMid}>
              <div className={classes.logo}>
                <Logo />
                <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                  Shelf
                </Typography>
              </div>
            </div>
            <div className={classes.grow} />
            <SearchBar
              handleSearch={handleSearch}
              updateSearch={this.updateSearch}
              searchTerm={searchTerm}
            />
            {/*<div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <form onSubmit={e => handleSearch(e, search)} noValidate autoComplete="off">
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
            </div>*/}
          </Toolbar>
          <Drawer open={drawerOpen} onClose={this.toggleDrawer(false)} classes={{paper: classes.drawerRoot}}>
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

const mapDispatchToProps = dispatch => ({
  _navigate: route => dispatch(navigate(route)),
  _logout: () => dispatch(logout()),
  updateStyleTheme: () => dispatch(toggleStyleTheme()),
  handleSearch: (e, search) => {
    e.preventDefault();
    dispatch(bookSearch(search));
  },
});

export default withStyles(styles)(connect(null, mapDispatchToProps)(Nav));
