import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

export default class Book extends React.Component {
  render() {
    const {
      book,
      selectBook,
      index,
      classes,
    } = this.props;
    return (
      <Draggable draggableId={book.isbn} index={index}>
        {provided => (
          <Card
            className={classes.card}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            innerRef={provided.innerRef}
          >
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
                onClick={() => selectBook(book)}
              >
                View Book
              </Button>
            </CardActions>
          </Card>
        )}
      </Draggable>
    );
  }
}
