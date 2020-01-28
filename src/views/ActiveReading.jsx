import React from 'react';
import BooksGrid from '../components/BooksGrid';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#E9F0FE',
  },
  pageHeader: {
    margin: '6px 24px',
  }
};

class ActiveReading extends React.Component {
  render() {
    const {
      classes,
      savedBooks,
      isLoading,
      removeBookFromShelf,
    } = this.props;

    const books = savedBooks && savedBooks.filter(b => b.shelf_type === 'Active');

    return books.length === 0 ? (
      null
    ) : (
      <>
        <Typography variant="h4" className={classes.pageHeader}>Actively Reading</Typography>
        <BooksGrid
          books={books}
          removeBookFromShelf={removeBookFromShelf}
          page="Active"
          isLoading={isLoading}
          classes={classes}
          gridWidthSm={12}
          gridWidthMd={6}
        />
      </>
    )
  }
}

const mapStateToProps = state => ({
  savedBooks: state.savedBooks,
});

export default withStyles(styles)(connect(mapStateToProps)(ActiveReading));
