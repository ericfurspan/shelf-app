import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/LibraryAdd';
import CloseIcon from '@material-ui/icons/Close';
import Divider from '@material-ui/core/Divider';
import CustomButton from './Button';

const styles = theme => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[8],
    borderRadius: '4px',
    padding: theme.spacing(3),
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    overflow: 'scroll',
    minHeight: '40%',
    maxHeight: '80%',
    [theme.breakpoints.down('sm')]: {
      width: '80%',
    },
    [theme.breakpoints.up('lg')]: {
      minWidth: '50%',
    },
  },
  typography: {
    padding: theme.spacing(2),
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  bookCover: {
    float: 'left',
    margin: '0 15px 10px 0',
  },
  rightIcon: {
    marginLeft: theme.spacing(),
    fill: '#15202B',
  },
  bottomRight: {
    float: 'right',
    margin: theme.spacing(2),
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  closeBtn: {
    cursor: 'pointer',
    position: 'absolute',
    right: 6,
    top: 6,
  },
});

class BookModal extends React.Component {
  handleAddBookToLibrary = () => {
    const { addBookToShelf, closeModal, selectedBook } = this.props;
    addBookToShelf(selectedBook, 'Library');
    closeModal();
  }

  handleRemoveBook = () => {
    const { removeBookFromShelf, closeModal, selectedBook } = this.props;
    removeBookFromShelf(selectedBook);
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

    let addBookToLibraryBtn;
    let removeBookFromShelfBtn;

    if (page === 'explore') {
      addBookToLibraryBtn = CustomButton({
        variant: 'contained',
        color: 'secondary',
        onClick: this.handleAddBookToLibrary,
        className: classes.bottomRight,
        text: 'Add to Library',
        icon: <AddIcon className={classes.rightIcon} />,
      });
    } else if (page === 'library') {
      removeBookFromShelfBtn = CustomButton({
        variant: 'contained',
        color: 'secondary',
        onClick: this.handleRemoveBook,
        className: classes.bottomRight,
        text: 'Remove from Library',
        icon: <DeleteIcon className={classes.rightIcon} />,
      });
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
              <CloseIcon className={classes.closeBtn} onClick={() => closeModal(null)} />
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
              <div className={classes.flexRow}>
                {addBookToLibraryBtn}
                {removeBookFromShelfBtn}
              </div>
            </div>
          </div>
        </Modal>
      );
    }
    return null;
  }
}

export default withStyles(styles)(BookModal);
