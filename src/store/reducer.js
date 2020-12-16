import {
    ADD_BOOKSHELF,
    ADD_BOOK,
    EDIT_BOOK_NAME,
    EDIT_BOOK_AUTHOR,
    REMOVE_BOOK,
    DOWNLOAD_BOOKS_DATA,
    MOVE_BOOK_LEFT,
    MOVE_BOOK_RIGHT
} from './actions';

const initialState = {
    bookShelfs: []
};

export default function reducer(state=initialState, {type, payload}) {
    let bookToMove = null;

    switch(type) {
    case ADD_BOOKSHELF:
        return {
            ...state,
            bookShelfs: [
                ...state.bookShelfs, payload
            ]
        };
    case ADD_BOOK:
        return {
            ...state,
            bookShelfs: state.bookShelfs.map((bookShelf, index) => (
                index === payload.bookShelfId ? {
                    ...bookShelf,
                    books: [...bookShelf.books, payload.book]
                }
                : bookShelf
            ))
        };
    case EDIT_BOOK_NAME:
        return {
            ...state,
            bookShelfs: state.bookShelfs.map((bookShelf, index) => (
                index === payload.bookShelfId ? {
                    ...bookShelf,
                    books: bookShelf.books.map((book, indexBook) => (
                        indexBook === payload.bookId ? {
                            ...book,
                            name: payload.newName
                        }
                        : book
                    ))
                }
                : bookShelf
            ))
        };
    case EDIT_BOOK_AUTHOR:
        return {
            ...state,
            bookShelfs: state.bookShelfs.map((bookShelf, index) => (
                index === payload.bookShelfId ? {
                    ...bookShelf,
                    books: bookShelf.books.map((book, indexBook) => (
                        indexBook === payload.bookId ? {
                            ...book,
                            author: payload.newAuthor
                        }
                        : book
                    ))
                }
                : bookShelf
            ))
        };
    case REMOVE_BOOK:
        return {
            ...state,
            bookShelfs: state.bookShelfs.map((bookShelf, index) => (
                index === payload.bookShelfId ? {
                    ...bookShelf,
                    books: bookShelf.books.filter((book, bookIndex) => (bookIndex !== payload.bookId))
                }
                : bookShelf
            ))
        };
    case DOWNLOAD_BOOKS_DATA:
        return {
            ...state,
            bookShelfs: payload
        }
    case MOVE_BOOK_LEFT:
        bookToMove = state.bookShelfs[payload.bookShelfId].books[payload.bookId];

        return {
            ...state,
            bookShelfs: state.bookShelfs.map((bookShelf, index) => {
                if (index === payload.bookShelfId) {
                    return {
                        ...bookShelf,
                        books: bookShelf.books.filter((book, bookIndex) => (bookIndex !== payload.bookId))
                    };
                }
                if (index === payload.bookShelfId - 1) {
                    return {
                        ...bookShelf,
                        books: [...bookShelf.books, bookToMove]
                    };
                }
                return bookShelf;
            })
        };
    case MOVE_BOOK_RIGHT:
        bookToMove = state.bookShelfs[payload.bookShelfId].books[payload.bookId];

        return {
            ...state,
            bookShelfs: state.bookShelfs.map((bookShelf, index) => {
                if (index === payload.bookShelfId) {
                    return {
                        ...bookShelf,
                        books: bookShelf.books.filter((book, bookIndex) => (bookIndex !== payload.bookId))
                    };
                }
                if (index === payload.bookShelfId + 1) {
                    return {
                        ...bookShelf,
                        books: [...bookShelf.books, bookToMove]
                    };
                }
                return bookShelf;
            })
        };
    default:
        return state;
    }
};
