import React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import WishList from './WishList';
import Active from './Active';
import Nav from './Nav';
import Library from './Library';
import { getSavedBooks, removeBook } from '../redux/actions';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 20,
    padding: '0px 20px',
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

    return (
      <>
        <Nav />
        <Grid container>
          <Grid container item xs={12} md={8}>
            <Library
              books={savedBooks && savedBooks.filter(b => b.shelf_type === 'Library')}
              classes={classes}
              isLoading={isLoading}
              removeBookFromShelf={this.removeBookFromShelf}
            />
          </Grid>
          <Grid container item xs={12} md={2}>
            <Active
              books={savedBooks && savedBooks.filter(b => b.shelf_type === 'Active')}
              classes={classes}
              isLoading={isLoading}
              removeBookFromShelf={this.removeBookFromShelf}
            />
          </Grid>
          <Grid container item xs={12} md={2}>
            <WishList
              books={savedBooks && savedBooks.filter(b => b.shelf_type === 'WishList')}
              classes={classes}
              isLoading={isLoading}
              removeBookFromShelf={this.removeBookFromShelf}
            />
          </Grid>
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
