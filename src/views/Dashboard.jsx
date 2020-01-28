import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import WishList from './WishList';
import ActiveReading from './ActiveReading';
import Library from './Library';
import { getSavedBooks, removeBook } from '../redux/actions';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 20,
  },
  card: {
    maxWidth: 350,
    margin: 'auto',
  },
  actionarea: {
    height: 350,
    overflow: 'hidden',
  },
  media: {
    height: 100,
  },
};

class Dashboard extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getSavedBooks());
  }

  removeBookFromShelf = (book) => {
    const { dispatch } = this.props;
    dispatch(removeBook(book));
  }

  render() {
    const {
      classes,
      savedBooks,
      isLoading,
    } = this.props;

    const activeBooks = savedBooks && savedBooks.filter(b => b.shelf_type === 'Active');
    const libraryBooks = savedBooks && savedBooks.filter(b => b.shelf_type === 'Library');
    const wishListBooks = savedBooks && savedBooks.filter(b => b.shelf_type === 'WishList');

    return (
      <>
        <Grid container>
          <Grid container item xs={12} md={6}>
            <Library
              books={libraryBooks}
              classes={classes}
              isLoading={isLoading}
              removeBookFromShelf={this.removeBookFromShelf}
            />
          </Grid>
          {activeBooks.length > 0 && (
            <Grid container item xs={12} md={6}>
              <ActiveReading
                books={activeBooks}
                classes={classes}
                isLoading={isLoading}
                removeBookFromShelf={this.removeBookFromShelf}
              />
          </Grid>
          )}
          {wishListBooks.length > 0 && (
            <Grid container item xs={12} md={6}>
              <WishList
                books={wishListBooks}
                classes={classes}
                isLoading={isLoading}
                removeBookFromShelf={this.removeBookFromShelf}
              />
            </Grid>
          )}
        </Grid>
      </>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  savedBooks: state.savedBooks,
  styleTheme: state.styleTheme,
});

export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
