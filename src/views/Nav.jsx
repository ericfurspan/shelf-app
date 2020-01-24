import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { withStyles, fade } from '@material-ui/core/styles';
import SvgIcon from '@material-ui/core/SvgIcon';
import MenuIcon from '@material-ui/icons/Menu';
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
import {
  bookSearch,
  navigate,
  toggleStyleTheme,
  logout,
} from '../redux/actions';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  drawerRoot: {
    backgroundColor: '#dcdcdc',
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
  logo: {
    position: 'absolute',
    left: '45%',
    display: 'flex',
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
    search: '',
  };

  toggleDrawer = open => () => {
    this.setState({
      drawerOpen: open,
    });
  };

  updateSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    const {
      classes,
      _logout,
      _navigate,
      handleSearch,
    } = this.props;
    const { drawerOpen, search } = this.state;

    const sideList = (
      <div className={classes.list}>
        <List>
          <ListItem button key="Library" onClick={() => _navigate('/library')}>
            <ListItemIcon><BookmarkCollection /></ListItemIcon>
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
          <Toolbar style={{ minHeight: '78px' }}>
            <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              Shelf
            </Typography>
            <div className={classes.logo}>
              <SvgIcon
                viewBox="0 0 96 96"
                htmlColor="#d4edff"
                style={{ width: '60px', height: '60px' }}
              >
                <path d="m93.642856,72.633205l-15.699234,0l5.558082,-1.681075c0.9215,-0.277585 1.675684,-0.885833 2.123541,-1.712209c0.447857,-0.826189 0.535878,-1.77204 0.247969,-2.662937l-20.713296,-64.124298c-0.472673,-1.467072 -1.855408,-2.452685 -3.441714,-2.452685c-0.365459,0 -0.728592,0.054016 -1.077959,0.159986l-12.733296,3.848673c-0.122143,0.036761 -0.240408,0.079899 -0.355378,0.127914l0,-0.507155c0,-1.924899 -1.618102,-3.491002 -3.606898,-3.491002l-13.424081,0c-0.85151,0 -1.633612,0.28865 -2.251112,0.767859c-0.618663,-0.479209 -1.402316,-0.767859 -2.255378,-0.767859l-13.440173,0c-1.990929,0 -3.610969,1.566102 -3.610969,3.491002l0,69.003785l-7.605816,0c-0.749531,0 -1.357143,0.587804 -1.357143,1.3129c0,0.725096 0.607612,1.3129 1.357143,1.3129l92.285713,0c0.749531,0 1.357143,-0.587804 1.357143,-1.3129c0,-0.725096 -0.607612,-1.3129 -1.357143,-1.3129zm-10.4215,-4.612406c-0.110898,0.204812 -0.29799,0.355608 -0.528316,0.424817l-12.731939,3.850736c-0.086857,0.026446 -0.176041,0.039575 -0.265224,0.039575c-0.388337,0 -0.740612,-0.250764 -0.856551,-0.609748l-15.269796,-47.276412l14.442326,-4.363893l15.270571,47.274349c0.071735,0.221317 0.049827,0.455951 -0.061071,0.660576zm-16.018939,-50.441064l-14.442326,4.363893l-1.651449,-5.112809l14.441939,-4.364643l1.651837,5.113559zm-18.486612,-11.064373l12.735234,-3.849236c0.087633,-0.026633 0.177592,-0.040137 0.267163,-0.040137c0.391633,0 0.733051,0.244199 0.850541,0.608998l2.172398,6.72505l-14.441939,4.364643l-2.170459,-6.720174c-0.147153,-0.458577 0.116133,-0.946976 0.587061,-1.089145zm17.57849,66.117843l-18.742918,0l0,-58.011434l18.742918,58.011434zm-36.66651,-42.017309l15.209306,0l0,3.655864l-15.209306,0l0,-3.655864zm15.2095,-2.6258l-15.209306,0l0,-12.84973l15.209306,0l0,12.84973zm-17.923785,-9.363417l-15.236255,0l0,-3.486313l15.236255,0l0,3.486313zm-15.236255,2.6258l15.236255,0l0,3.488376l-15.236255,0l0,-3.488376zm17.950541,15.645082l15.209306,0l0,35.735831l-15.209306,0l0,-35.735831zm0.892806,-34.133343l13.424081,0c0.492061,0 0.892612,0.388056 0.892612,0.865201l0,8.884959l-15.209306,0l0,-8.884771c-0.000194,-0.477145 0.400357,-0.865389 0.892612,-0.865389zm-17.946663,0l13.439979,0c0.496133,0 0.899592,0.388056 0.899592,0.865201l0,8.884959l-15.236255,0l0,-8.884771c0,-0.477145 0.40249,-0.865389 0.896684,-0.865389zm-0.896684,24.602437l15.236255,0l0,45.266737l-15.236255,0l0,-45.266737z"/>
              </SvgIcon>
            </div>
            <div className={classes.grow} />
            <div className={classes.search}>
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
            </div>
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
