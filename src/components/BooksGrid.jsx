import React from 'react';
import Grid from '@material-ui/core/Grid';
import Zoom from '@material-ui/core/Zoom';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import BookModal from './BookModal';


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

class BooksGrid extends React.Component {
  state = {
    selectedBook: null,
  }

  selectBook = (book) => {
    this.setState({
      selectedBook: book,
    });
  }

  render() {
    const {
      isLoading,
      classes,
      data,
      removeBookFromShelf,
      addBookToShelf,
      page,
    } = this.props;

    if (isLoading) {
      return (
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <CircularProgress size={50} color="secondary" />
        </div>
      );
    }
    const { selectedBook } = this.state;

    return (
      <div className={classes.root}>
        <BookModal
          modalOpen={selectedBook !== null}
          selectedBook={selectedBook}
          closeModal={this.selectBook}
          removeBookFromShelf={removeBookFromShelf}
          addBookToShelf={addBookToShelf}
          page={page}
        />
        <Grid spacing={2} container>
          {data && data.map((book, index) => (
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
                      image={book.image_link}
                      title={book.title}
                    />
                    <CardContent className={classes.content}>
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
                  <CardActions>
                    <Button
                      size="medium"
                      color="secondary"
                      onClick={() => this.selectBook(book)}
                    >
                      View Book
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Zoom>
          ))}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(BooksGrid);
