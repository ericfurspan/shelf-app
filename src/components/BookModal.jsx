import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Popover from '@material-ui/core/Popover';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/LibraryAdd';
import Divider from '@material-ui/core/Divider';
import CustomButton from './Button';

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[8],
    borderRadius: '4px',
    padding: theme.spacing.unit * 3,
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'scroll',
    [theme.breakpoints.down('md')]: {
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '50%',
    },
  },
  popoverButton: {
    width: '50%',
  },
  typography: {
    padding: theme.spacing.unit * 2,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  bookCover: {
    float: 'left',
    margin: '0 15px 10px 0',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  bottomRight: {
    float: 'right',
    margin: theme.spacing.unit * 2,
  },
});

class BookModal extends React.Component {
  state = {
    anchorEl: null,
  };

  openPopover = (event) => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  closePopover = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleAddBook = (book) => {
    const { addBookToShelf, closeModal } = this.props;
    addBookToShelf(book);
    this.closePopover();
    closeModal();
  }

  handleRemoveBook = (book) => {
    const { removeBookFromShelf, closeModal } = this.props;
    removeBookFromShelf(book);
    this.closePopover();
    closeModal();
  }

  render() {
    const {
      classes,
      modalOpen,
      closeModal,
      selectedBook,
      page,
    } = this.props;

    const { anchorEl } = this.state;
    const popoverOpen = Boolean(anchorEl);

    let actionButtonMethod;
    let confirmActionText;
    let removeButton;
    let addButton;

    if (page === 'explore') {
      addButton = CustomButton({
        variant: 'contained',
        color: 'primary',
        onClick: this.openPopover,
        className: classes.bottomRight,
        text: 'Add to Shelf',
        icon: <AddIcon className={classes.rightIcon} />,
      });
      actionButtonMethod = this.handleAddBook;
      confirmActionText = 'This will add the book to your Library';
    } else if (page === 'library') {
      removeButton = CustomButton({
        variant: 'contained',
        color: 'secondary',
        onClick: this.openPopover,
        className: classes.bottomRight,
        text: 'Remove from Shelf',
        icon: <DeleteIcon className={classes.rightIcon} />,
      });
      actionButtonMethod = this.handleRemoveBook;
      confirmActionText = 'This will remove the book from your library';
    }

    if (selectedBook) {
      return (
        <Modal
          aria-labelledby="book-modal"
          aria-describedby="detailed view of book"
          open={modalOpen || false}
          onClose={() => closeModal(null)}
          classes={{ root: classes.backdrop }}
        >
          <div>
            <div className={classes.paper}>
              <img src={selectedBook.image_link} alt="Book cover" className={classes.bookCover} />
              <Typography variant="h6" id="modal-title">
                {selectedBook.title}
              </Typography>
              <Typography variant="overline">
                {selectedBook.author}
              </Typography>
              <Divider variant="middle" />
              <Typography variant="subtitle1">
                {selectedBook.description.replace(/<[^>]+>/g, '')}
              </Typography>
              {addButton}
              {removeButton}
            </div>
            <Popover
              id="remove-book"
              open={popoverOpen}
              anchorEl={anchorEl}
              onClose={() => this.closePopover()}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Paper>
                <Typography variant="h6" className={classes.typography}>Are you sure?</Typography>
                <Typography variant="subtitle1" className={classes.typography}>{confirmActionText}</Typography>
                <div>
                  <Button
                    className={classes.popoverButton}
                    onClick={() => this.closePopover()}
                  >
                    No
                  </Button>
                  <Button
                    className={classes.popoverButton}
                    onClick={() => actionButtonMethod(selectedBook)}
                  >
                    Yes
                  </Button>
                </div>
              </Paper>
            </Popover>
          </div>
        </Modal>
      );
    }
    return null;
  }
}

export default withStyles(styles)(BookModal);
