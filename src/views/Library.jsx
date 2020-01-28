import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import BooksGrid from '../components/BooksGrid';
import {
  getSavedBooks,
  removeBook,
  navigate,
} from '../redux/actions';

const styles = {
  root: {
    marginTop: 20,
    flexGrow: 1,
    backgroundColor: '#E9F0FE',
  },
  pageHeader: {
    margin: '6px 24px',
  }
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

  navigate = (route) => {
    const { dispatch } = this.props;
    dispatch(navigate(route));
  }

  render() {
    const {
      classes,
      savedBooks,
      isLoading,
    } = this.props;

    return (
      <div className={classes.root}>
        <Typography variant="h4" className={classes.pageHeader}>Library</Typography>
        <Typography variant="subtitle1" className={classes.pageHeader}>All my books</Typography>
        <BooksGrid
          books={savedBooks}
          removeBookFromShelf={this.removeBookFromShelf}
          page="Library"
          isLoading={isLoading}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  savedBooks: state.savedBooks,
});

export default withStyles(styles)(connect(mapStateToProps)(Library));
