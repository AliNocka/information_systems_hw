import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './Book.css';

import { editBook, removeBook, moveBook } from '../../model/model';

import { 
    editBookNameAction,
    editBookAuthorAction,
    removeBookAction,
    moveBookLeftAction,
    moveBookRightAction
} from '../../store/actions';


class Book extends PureComponent {

    moveLeft = async () => {
        const moveData = {
            bookId: this.props.bookId,
            bookShelfId: this.props.bookShelfId
        };
        await moveBook({
            ...moveData,
            destShelfId: moveData.bookShelfId - 1
        });
        this.props.moveBookLeftDispatch(moveData);
    }

    moveRight = async () => {
        const moveData = {
            bookId: this.props.bookId,
            bookShelfId: this.props.bookShelfId
        };
        await moveBook({
            ...moveData,
            destShelfId: moveData.bookShelfId + 1
        });
        this.props.moveBookRightDispatch(moveData);
    }

    onRemove = async () => {
        const ok = window.confirm('Удалить книгу?');
        if (!ok) {
            return;
        }

        const removeData = {
            bookId: this.props.bookId,
            bookShelfId: this.props.bookShelfId
        };
        await removeBook(removeData);
        this.props.removeBookDispatch(removeData);
    }

    onAuthorEdit = async () => {
        let newAuthor = prompt('Введите нового автора');
        if (!newAuthor || !newAuthor.trim()) {
            alert('Невалидный автор');
            return;
        }

        newAuthor = newAuthor.trim();

        const book = this.props.bookShelfs[this.props.bookShelfId].books[this.props.bookId];
        const bookEditData = {
            bookId: this.props.bookId,
            bookShelfId: this.props.bookShelfId,
            newAuthor: newAuthor
        };
        await editBook({
            ...bookEditData,
            newName: book.name
        });
        this.props.editBookAuthorDispatch(bookEditData);
    }

    onNameEdit = async () => {
        let newName = prompt('Введите новоe название книги');
        if (!newName || !newName.trim()) {
            alert('Невалидное название');
            return;
        }
        
        newName = newName.trim();

        const book = this.props.bookShelfs[this.props.bookShelfId].books[this.props.bookId];
        const bookEditData = {
            bookId: this.props.bookId,
            bookShelfId: this.props.bookShelfId,
            newName: newName,
        };
        await editBook({
            ...bookEditData,
            newAuthor: book.author
        });
        this.props.editBookNameDispatch(bookEditData);
    }

    render() {
        const { bookId, bookShelfId } = this.props;
        const book = this.props.bookShelfs[bookShelfId].books[bookId];

        return (
            <div className="bookshelf-book">
                <div className="bookshelf-book-description">
                <div className="bookshelf-book-name">
                    { book.name }
                </div>
                <div className="bookshelf-book-author">
                    { book.author }
                </div>
                </div>
                
                <div className="bookshelf-book-controls">
                <div className="bookshelf-book-controls-row">
                    <div className="bookshelf-book-controls-icon left-arrow-icon" onClick={this.moveLeft}></div>
                    <div className="bookshelf-book-controls-icon right-arrow-icon" onClick={this.moveRight}></div>
                </div>
                <div className="bookshelf-book-controls-row">
                    <div className="bookshelf-book-controls-icon delete-icon" onClick={this.onRemove}></div>
                </div>
                <div className="bookshelf-book-controls-row">
                    <div className="bookshelf-book-controls-icon editauthor-icon" onClick={this.onAuthorEdit}></div>
                    <div className="bookshelf-book-controls-icon editname-icon" onClick={this.onNameEdit}></div>
                </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ bookShelfs }) => ({ bookShelfs });

const mapDispatchToProps = dispatch => ({
    editBookNameDispatch: ({ bookId, bookShelfId, newName }) => dispatch(editBookNameAction({ bookId, bookShelfId, newName })),
    editBookAuthorDispatch: ({ bookId, bookShelfId, newAuthor }) => dispatch(editBookAuthorAction({ bookId, bookShelfId, newAuthor })),
    removeBookDispatch: ({ bookId, bookShelfId }) => dispatch(removeBookAction({ bookId, bookShelfId })),
    moveBookLeftDispatch: ({ bookId, bookShelfId }) => dispatch(moveBookLeftAction({ bookId, bookShelfId })),
    moveBookRightDispatch: ({ bookId, bookShelfId }) => dispatch(moveBookRightAction({ bookId, bookShelfId })),
});
  
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Book);
