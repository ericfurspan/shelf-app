import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import BooksGrid from '../components/BooksGrid';
import { addBook } from '../redux/actions';
import stockBookImg from '../static/img/defaultBook.png';
import Typography from '@material-ui/core/Typography';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#E9F0FE',
  },
};

class Explore extends React.Component {
  render() {
    const {
      classes,
      searchResults,
      addBookToShelf,
    } = this.props;

    const formattedResults = searchResults && searchResults.map(b => ({
      title: b.volumeInfo.title,
      author: b.volumeInfo.authors ? b.volumeInfo.authors[0] : 'No Author Listed',
      description: b.volumeInfo.description || b.volumeInfo.subtitle,
      image_link: b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail : stockBookImg,
      isbn: b.isbn,
    }));

    return (
      <div className={classes.root}>
        {formattedResults && (
          <>
            {/*<Typography></Typography>*/}
            <BooksGrid
              books={formattedResults}
              page="explore"
              addBookToShelf={addBookToShelf}
            />
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  searchResults: state.searchResults,
});

const mapDispatchToProps = dispatch => ({
  addBookToShelf: (book, shelfType) => dispatch(addBook(book, shelfType)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Explore));
