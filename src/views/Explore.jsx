import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import BookModal from '../components/BookModal';
import DefaultBook from '../static/img/defaultBook.png';
import { addBook, removeBook, getSavedBooks } from '../redux/actions';

const styles = {
  root: {
    flexGrow: 1,
    marginTop: 20,
    padding: '0px 20px',
    backgroundColor: '#E9F0FE',
  },
  card: {
    position: 'relative',
    userSelect: 'none',
    maxWidth: 425,
    margin: 'auto',
    '&:hover': {
      transform: 'scale(1.02)',
    },
    transition: 'all .2s ease-in-out',
  },
  actionarea: {
    height: 350,
    overflow: 'hidden',
  },
  media: {
    height: 100,
  },
  notFoundText: {
    marginTop: 120,
  },
  modalOpenBtn: {
    position: 'absolute',
    top: 2,
    right: 2,
  }
};

class Explore extends React.Component {
  state = { selectedBook: null }

  selectBook = book => {
    this.setState({ selectedBook: book });
  }

  componentDidMount() {
    const { getSavedBooks } = this.props;
    getSavedBooks();
  }

  render() {
    const { classes, searchResults, addBookToShelf, removeBook, searchTerm, savedBooks } = this.props;
    const { selectedBook } = this.state;

    const books = searchResults && searchResults.map(b => ({
      title: b.volumeInfo.title || 'No Title Available',
      author: b.volumeInfo.authors ? b.volumeInfo.authors[0] : 'No Author Available',
      description: b.volumeInfo.description || b.volumeInfo.subtitle || 'No Description Available',
      image_link: b.volumeInfo.imageLinks ? b.volumeInfo.imageLinks.thumbnail : DefaultBook,
      isbn: b.isbn,
      existsOnShelf: savedBooks && savedBooks.find(bk => bk.isbn === b.isbn)
    }));

    return (
      <div className={classes.root}>
        <Typography variant="h4">Explore Books</Typography>
        {searchResults && <><Typography variant="h6">Found {searchResults.length} results for: "{searchTerm}"</Typography> <br /></>}
        {books && books.length > 0 ? (
          <>
            <BookModal
              modalOpen={selectedBook !== null}
              selectedBook={selectedBook}
              closeModal={this.selectBook}
              addBookToShelf={addBookToShelf}
              page="explore"
            />
            <Grid spacing={2} container>
              {books.map((book, index) => (
                <Zoom
                  in
                  timeout={1000}
                  key={index.toString()}
                  style={{ transitionDelay: `${index}00ms` }}
                >
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.card} onDoubleClick={() => this.selectBook(book)}>
                      <Fab className={classes.modalOpenBtn} color="secondary" variant="round" size="small" aria-label="expand" onClick={() => this.selectBook(book)}>
                        <ZoomInIcon color="primary"/>
                      </Fab>
                      <div className={classes.actionarea}>
                        <CardMedia
                          className={classes.media}
                          image={book.image_link || DefaultBook}
                          title={book.title}
                        />
                        <CardContent>
                          <Typography variant="h5" component="h2">
                            {book.title}
                          </Typography>
                          <Typography gutterBottom variant="overline">
                            {book.author}
                          </Typography>
                          <br />
                          <Typography component="p">
                            {book.description && book.description.replace(/<[^>]+>/g, '')}
                          </Typography>
                        </CardContent>
                      </div>
                      <CardActions style={{ justifyContent: 'space-evenly' }}>
                        <Button
                          variant={book.existsOnShelf ? 'outlined' : 'contained'}
                          color='primary'
                          size='small'
                          onClick={() => {
                            if (book.existsOnShelf) { return removeBook(book)}
                            else { return addBookToShelf(book, 'Library') }
                          }}
                        >
                          {book.existsOnShelf ? 'Remove from Library' : 'Add to Library'}
                        </Button>                       
                      </CardActions>
                    </Card>
                  </Grid>
                </Zoom>
              ))}
            </Grid>
          </>
        ) : (
          <Typography className={classes.notFoundText} variant="h5" align="center">No books to be found, try the search bar above.</Typography>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  savedBooks: state.savedBooks,
  searchResults: state.searchResults,
  searchTerm: state.searchTerm,
});

const mapDispatchToProps = dispatch => ({
  getSavedBooks: () => dispatch(getSavedBooks()),
  addBookToShelf: (book, shelfType) => dispatch(addBook(book, shelfType)),
  removeBook: book => dispatch(removeBook(book)),
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Explore));
