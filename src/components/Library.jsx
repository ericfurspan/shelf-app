import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Nav from './Nav';
import BooksGrid from './BooksGrid';
import {
  getSavedBooks,
  removeBook,
  navigate,
  logout,
} from '../redux/actions';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Library extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getSavedBooks());
  }

  removeBookFromShelf = (book) => {
    const { dispatch } = this.props;
    dispatch(removeBook(book));
  }

  logout = () => {
    const { dispatch } = this.props;
    dispatch(logout());
  }

  navigate = (route) => {
    const { dispatch } = this.props;
    dispatch(navigate(route));
  }

  render() {
    const {
      classes,
      savedBooks,
      styleTheme,
      isLoading,
    } = this.props;

    return (
      <div className={classes.root}>
        <Nav logout={this.logout} styleTheme={styleTheme} />
        <BooksGrid
          data={savedBooks}
          removeBookFromShelf={this.removeBookFromShelf}
          page="library"
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  savedBooks: state.savedBooks,
  styleTheme: state.styleTheme,
});

export default withStyles(styles)(connect(mapStateToProps)(Library));
