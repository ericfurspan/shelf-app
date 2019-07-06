import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Nav from './Nav';
import BooksGrid from './BooksGrid';
import { addBook } from '../redux/actions';
import stockBookImg from '../static/img/defaultBook.png';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Explore extends React.Component {
  addBookToShelf = (book) => {
    const { dispatch } = this.props;
    dispatch(addBook(book));
  }

  render() {
    const {
      isLoading,
      classes,
      styleTheme,
      searchResults,
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
        <Nav styleTheme={styleTheme} />
        {formattedResults ? (
          <BooksGrid
            data={formattedResults}
            page="explore"
            addBookToShelf={this.addBookToShelf}
            isLoading={isLoading}
          />
        )
          : (
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
            No results found
            </div>
          )
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  searchResults: state.searchResults,
});

export default withStyles(styles)(connect(mapStateToProps)(Explore));
