import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { withStyles, fade } from '@material-ui/core/styles';

const styles = theme => ({
  search: {
    position: 'relative',
    backgroundColor: fade(theme.palette.primary.main, 0.85),
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.65),
    },
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(),
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 150,
      '&:focus': {
        width: 280,
      },
    },
  },
});

const SearchBar = (props) => {
  const { handleSearch, updateSearch, search, classes } = props;

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <form onSubmit={e => handleSearch(e, search)} noValidate autoComplete="off">
          <InputBase
            placeholder="Find books"
            onChange={updateSearch}
            value={search}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </form>
      </div>
    </div>
  );
};

export default withStyles(styles)(SearchBar);
