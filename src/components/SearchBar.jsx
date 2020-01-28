import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import CancelIcon from '@material-ui/icons/Cancel';
import InputBase from '@material-ui/core/InputBase';
import { withStyles, fade } from '@material-ui/core/styles';

const styles = theme => ({
  search: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
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
  cancelIcon: {
    display: 'flex',
    justifyContent: 'center',
    cursor: 'pointer',
    width: theme.spacing(4),
    height: '100%',

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
  const { handleSearch, updateSearch, searchTerm, classes } = props;

  return (
    <div>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <form onSubmit={e => handleSearch(e, searchTerm)} noValidate autoComplete="off">
          <InputBase
            placeholder="Find books"
            onChange={e => updateSearch(e.target.value)}
            value={searchTerm}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </form>
        {searchTerm && (
          <div className={classes.cancelIcon} onClick={() => updateSearch('')}>
            <CancelIcon fontSize="small" />
          </div>
        )}
      </div>
    </div>
  );
};

export default withStyles(styles)(SearchBar);
