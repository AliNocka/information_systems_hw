import { PureComponent } from 'react';
import { connect } from 'react-redux';
import './BookShelf.css';

import { addBook } from '../../model/model'; 

import Book from '../Book/Book';
import { addBookAction } from '../../store/actions';


class BookShelf extends PureComponent {

    onBookAdd = async () => {
        let bookName = prompt('Введите название книги', '');
        if (!bookName || !bookName.trim()) {
            alert('Невалидное название книги!');
            return;
        }
        bookName = bookName.trim();

        let bookAuthor = prompt('Введите автора', '').trim();
        if (!bookAuthor || !bookAuthor.trim()) {
            alert('Невалидный автор!');
            return;
        }

        bookAuthor = bookAuthor.trim();
        const newBookData = { 
            book: {
                name: bookName,
                author: bookAuthor
            },
            bookShelfId: this.props.bookShelfId
        };

        await addBook(newBookData);
        this.props.addBookDispatch(newBookData);
    }

    render() {
        const bookShelfId = this.props.bookShelfId;
        const bookShelf = this.props.bookShelfs[bookShelfId];

        return (
        <div className="bookshelf">
            <header className="bookshelf-name">
                { bookShelf.name }
            </header>
            <div className="bookshelf-books">
                {bookShelf.books.map((book, index) => (
                    <Book key={`book-${index}`} bookId={index} bookShelfId={bookShelfId} />
                ))}
            </div>
            <footer className="bookshelf-add-task" onClick={this.onBookAdd}>
                Добавить книгу
            </footer>
        </div>
        );
    }
}

const mapStateToProps = ({ bookShelfs }) => ({ bookShelfs });

const mapDispatchToProps = dispatch => ({
    addBookDispatch: ({ book, bookShelfId }) => dispatch(addBookAction({ book, bookShelfId })),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BookShelf);
