
const initialState = {
  isLoading: false,
  currentUser: null,
  token: null,
  error: null,
  notification: null,
  authLoading: false,
  savedBooks: [],
  searchResults: null,
  styleTheme: 'light',
  searchTerm: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_REQUEST':
      return Object.assign({}, state, {
        authLoading: true,
      });
    case 'LOGIN_SUCCESS':
      return Object.assign({}, state, {
        authLoading: false,
        currentUser: action.currentUser,
        error: null,
      });
    case 'AUTH_ERROR':
      return Object.assign({}, state, {
        authLoading: false,
        error: {
          status: action.code,
          message: action.message,
        },
        isLoading: false,
      });
    case 'API_ERROR':
      return Object.assign({}, state, {
        error: {
          status: action.code,
          message: action.message,
        },
        notification: {
          message: action.message,
          variant: 'error',
        },
        isLoading: false,
      });
    case 'REGISTRATION_REQUEST':
      return Object.assign({}, state, {
        authLoading: true,
      });
    case 'REGISTRATION_SUCCESS':
      return Object.assign({}, state, {
        authLoading: false,
        error: null,
        notification: {
          message: 'Welcome to Shelf!',
          variant: 'success',
        },
      });
    case 'CLEAR_USER':
      return Object.assign({}, state, {
        currentUser: null,
        token: null,
      });
    case 'SET_AUTH_TOKEN':
      return Object.assign({}, state, {
        token: action.token,
      });
    case 'REQUEST_SAVED_BOOKS':
      return Object.assign({}, state, {
        isLoading: true,
      });
    case 'UPDATE_SEARCH_TERM':
      return Object.assign({}, state, {
        searchTerm: action.searchTerm,
    });
    case 'TRY_SEARCH_BOOKS':
      return Object.assign({}, state, {
        isLoading: true,
      });
    case 'UPDATE_SAVED_BOOKS':
      return Object.assign({}, state, {
        savedBooks: action.books,
        isLoading: false,
        error: null,
      });
    case 'TOGGLE_STYLE_THEME':
      return Object.assign({}, state, {
        styleTheme: state.styleTheme === 'light' ? 'dark' : 'light',
        notification: {
          message: `Using ${state.styleTheme === 'light' ? 'dark' : 'light'} theme`,
          variant: 'info',
        },
      });
    case 'REMOVE_BOOK_SUCCESS':
      return Object.assign({}, state, {
        savedBooks: state.savedBooks.filter(b => b.isbn !== action.book.isbn),
        notification: {
          message: `Removed ${action.book.title}`,
          variant: 'success',
        },
      });
    case 'ADD_BOOK_SUCCESS':
      return Object.assign({}, state, {
        savedBooks: [action.book, ...state.savedBooks],
        notification: {
          message: `Added ${action.book.title}`,
          variant: 'success',
        },
      });
      case 'UPDATE_BOOK_STATUS_SUCCESS':
        return Object.assign({}, state, {
          notification: {
            message: `Marked ${action.title} as ${action.status}`,
            variant: 'success',
          },
        });
    case 'CLEAR_NOTIFICATION':
      return Object.assign({}, state, {
        notification: null,
      });
    case 'UPDATE_SEARCH_RESULTS':
      return Object.assign({}, state, {
        searchResults: action.books,
        isLoading: false,
      });
    default:
      return state;
  }
}
