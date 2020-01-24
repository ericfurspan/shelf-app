import React from 'react';
import BooksGrid from '../components/BooksGrid';

class WishList extends React.Component {
  render() {
    const {
      classes,
      books,
      isLoading,
      removeBookFromShelf,
    } = this.props;

    return (
      <BooksGrid
        books={books}
        removeBookFromShelf={removeBookFromShelf}
        page="WishList"
        isLoading={isLoading}
        classes={classes}
      />
    );
  }
}

export default WishList;
