const ADD_BOOKSHELF = 'ADD_BOOKSHELF';
const ADD_BOOK = 'ADD_BOOK';
const EDIT_BOOK_NAME = 'EDIT_BOOK_NAME';
const EDIT_BOOK_AUTHOR = 'EDIT_BOOK_AUTHOR';
const REMOVE_BOOK = 'REMOVE_BOOK';
const DOWNLOAD_BOOKS_DATA = 'DOWNLOAD_BOOKS_DATA';
const MOVE_BOOK_LEFT = 'MOVE_BOOK_LEFT';
const MOVE_BOOK_RIGHT = 'MOVE_BOOK_RIGHT';


const addBookShelfAction = (bookShelf) => ({
    type: ADD_BOOKSHELF,
    payload: bookShelf
});

const addBookAction = ({ book, bookShelfId }) => ({
    type: ADD_BOOK,
    payload: { book, bookShelfId }
});

const editBookNameAction = ({ bookId, bookShelfId, newName }) => ({
    type: EDIT_BOOK_NAME,
    payload: { bookId, bookShelfId, newName }
});

const editBookAuthorAction = ({ bookId, bookShelfId, newAuthor }) => ({
    type: EDIT_BOOK_AUTHOR,
    payload: { bookId, bookShelfId, newAuthor }
});

const removeBookAction = ({ bookId, bookShelfId }) => ({
    type: REMOVE_BOOK,
    payload: { bookId, bookShelfId }
});

const downloadBooksDataAction = (bookShelfs) => ({
    type: DOWNLOAD_BOOKS_DATA,
    payload: bookShelfs
});

const moveBookLeftAction = ({ bookId, bookShelfId }) => ({
    type: MOVE_BOOK_LEFT,
    payload: { bookId, bookShelfId }
});

const moveBookRightAction = ({ bookId, bookShelfId  }) => ({
    type: MOVE_BOOK_RIGHT,
    payload: { bookId, bookShelfId }
});

export {
    ADD_BOOKSHELF,
    ADD_BOOK,
    EDIT_BOOK_NAME,
    EDIT_BOOK_AUTHOR,
    REMOVE_BOOK,
    DOWNLOAD_BOOKS_DATA,
    MOVE_BOOK_LEFT,
    MOVE_BOOK_RIGHT,
    addBookShelfAction,
    addBookAction,
    editBookNameAction,
    editBookAuthorAction,
    removeBookAction,
    downloadBooksDataAction,
    moveBookLeftAction,
    moveBookRightAction
};
