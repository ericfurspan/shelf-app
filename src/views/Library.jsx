import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import BookModal from '../components/BookModal';
import DefaultBook from '../static/img/defaultBook.png';
import { connect } from 'react-redux';
import {
  getSavedBooks,
  removeBook,
  navigate,
  updateBookStatus,
} from '../redux/actions';

const styles = {
  root: {
    marginTop: 20,
    padding: '0px 20px',
    flexGrow: 1,
    backgroundColor: '#E9F0FE',
  },
  card: {
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
  formControl: {
    minWidth: 120,
  },
};

class Library extends React.Component {
  state = { selectedBook: null }

  selectBook = book => {
    this.setState({ selectedBook: book });
  }

  componentDidMount() {
    const { dispatch } = this.props;
    return dispatch(getSavedBooks());
  }

  removeBookFromShelf = book => {
    const { dispatch } = this.props;
    return dispatch(removeBook(book));
  }

  navigate = route => {
    const { dispatch } = this.props;
    return dispatch(navigate(route));
  }

  handleUpdateBookStatus = (book, status) => {
    const { dispatch } = this.props;
    return dispatch(updateBookStatus(book, status));
  }

  render() {
    const { classes, savedBooks } = this.props;
    const { selectedBook } = this.state;

    return (
      <div className={classes.root}>
        <Typography variant="h4">Library</Typography> <br /><br />
        {savedBooks && savedBooks.length > 0 ? (
          <>
            <BookModal
              modalOpen={selectedBook !== null}
              selectedBook={selectedBook}
              closeModal={this.selectBook}
              removeBookFromShelf={this.removeBookFromShelf}
              page="library"
            />
            <Grid spacing={2} container>
              {savedBooks.map((book, index) => (
                <Zoom
                  in
                  timeout={1000}
                  key={index.toString()}
                  style={{ transitionDelay: `${index}00ms` }}
                >
                  <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card className={classes.card}>
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
                      <CardActions style={{justifyContent: 'space-around'}}>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="book-status-label">Status</InputLabel>
                          <Select
                            id="book-status-label"
                            value={book.book_status}
                            onChange={e => this.handleUpdateBookStatus(book, e.target.value)}
                          >
                            <MenuItem value='Active'>Active</MenuItem>
                            <MenuItem value='Finished'>Finished</MenuItem>
                            <MenuItem value='Next Up'>Next Up</MenuItem>
                          </Select>
                        </FormControl>
                        <Button
                          variant="contained"
                          size="medium"
                          color="secondary"
                          onClick={() => this.selectBook(book)}
                        >
                          More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                </Zoom>
              ))}
            </Grid>
          </>
        ) : (
          <>
            <Typography variant="h5" align="center">Your Library is empty!</Typography> <br />
            <Typography variant="h6" align="center">Use the search bar above to find books and start building your digital shelf.</Typography>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  savedBooks: state.savedBooks,
});

export default withStyles(styles)(connect(mapStateToProps)(Library));
