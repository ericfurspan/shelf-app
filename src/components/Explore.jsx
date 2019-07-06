import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Nav from './Nav';
import BooksGrid from './BooksGrid';
import { addBook } from '../redux/actions';

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
      author: b.volumeInfo.authors[0],
      description: b.volumeInfo.description || b.volumeInfo.subtitle,
      image_link: b.volumeInfo.imageLinks.thumbnail,
      isbn: b.isbn,
    }));

    return (
      <div className={classes.root}>
        <Nav logout={this.logout} styleTheme={styleTheme} />
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
