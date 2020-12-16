import { Fragment, PureComponent } from 'react';
import { connect } from 'react-redux';

import BookShelf from '../BookShelf/BookShelf';

import { getBookShelfs, addBookShelf } from '../../model/model';

import { downloadBooksDataAction, addBookShelfAction } from '../../store/actions';
import './App.css';

class App extends PureComponent {

    state = {
        isInputActive: false,
        inputValue: ''
    };

    async componentDidMount() {
        const bookShelfs = await getBookShelfs();
        this.props.downloadBooksDataDispatch(bookShelfs);
    }

    inputBookShelf = () => {
        this.setState({
            isInputActive: true
        });
    }

    onKeyDown = async (event) => {
        if (event.key === 'Escape') {
          this.setState({
            isInputState: false,
            inputValue: ''
          });
        }
    
        if (event.key === 'Enter') {
            const bookShelfName = this.state.inputValue;

            this.setState({
                isInputState: false,
                inputValue: ''
            })
            const bookShelf = { name: bookShelfName, books: [] };
            await addBookShelf(bookShelf);
            this.props.addBookShelfDispatch(bookShelf);
        }
    }
    
    onInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        });
    }

    render() {
        const { inputValue, isInputActive } = this.state;

        return (
            <Fragment>
                <header id="main-header">
                    Library
                </header>
                <main id="main-container">
                    {this.props.bookShelfs.map((bookShelf, index) => (
                        <BookShelf key={`bookshelf-${index}`} bookShelfId={index}/>
                    ))}
                    <div className="bookshelf">
                    {isInputActive && <input
                        type="text"
                        id="add-bookshelf-input"
                        placeholder="Название шкафа"
                        value={inputValue}
                        onChange={this.onInputChange}
                        onKeyDown={this.onKeyDown}
                    />}
                    {!isInputActive && <header className="bookshelf-name" onClick={this.inputBookShelf}>
                        Добавить шкаф
                    </header>}
                    </div>
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = ({ bookShelfs }) => ({ bookShelfs });

const mapDispatchToProps = dispatch => ({
    addBookShelfDispatch: (bookShelf) => dispatch(addBookShelfAction(bookShelf)),
    downloadBooksDataDispatch: (bookShelfs) => dispatch(downloadBooksDataAction(bookShelfs)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
