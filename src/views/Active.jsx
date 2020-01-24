import React from 'react';
import BooksGrid from '../components/BooksGrid';

class Active extends React.Component {
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
        page="Active"
        isLoading={isLoading}
        classes={classes}
        gridWidthSm={12}
        gridWidthMd={6}
      />
    );
  }
}

export default Active;
