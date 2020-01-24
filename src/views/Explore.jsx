import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import Nav from './Nav';
import SearchBar from '../components/SearchBar';
import BooksGrid from '../components/BooksGrid';
import { addBook } from '../redux/actions';
import stockBookImg from '../static/img/defaultBook.png';
import { bookSearch } from '../redux/actions';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class Explore extends React.Component {
  state = {
    search: '',
  };

  addBookToShelf = (book, shelfType) => {
    const { dispatch } = this.props;
    dispatch(addBook(book, shelfType));
  }

  updateSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  }

  render() {
    const {
      isLoading,
      classes,
      styleTheme,
      searchResults,
      handleSearch,
    } = this.props;
    const { search } = this.state;

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
            books={formattedResults}
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
              {search.length > 0 && (
                <Typography variant="h6" align="center" color="inherit" noWrap>
                  No results found, try another search.
                </Typography>
              )}
              <SearchBar
                handleSearch={handleSearch}
                updateSearch={this.updateSearch}
                search={search}
              />
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

const mapDispatchToProps = dispatch => ({
  handleSearch: (e, search) => {
    e.preventDefault();
    dispatch(bookSearch(search));
  },
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Explore));
