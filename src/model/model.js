const hostname = 'http://localhost:9999';

const getBookShelfs = async () => {
    const response = await fetch(hostname + '/bookshelf', {method: 'GET'});
    if (response.status !== 200) {
        throw new Error(`getBookShelfs returned ${response.status}`);
    }
    const jsonData = await response.json();
    return jsonData;
};

const addBookShelf = async (bookShelf) => {
    const response = await fetch(hostname + '/bookshelf', {
        method: 'POST', 
        body: JSON.stringify(bookShelf), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`addBookShelf returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const addBook = async ({ book, bookShelfId }) => {
    const response = await fetch(hostname + `/bookshelf/${bookShelfId}/book`, {
        method: 'POST', 
        body: JSON.stringify(book), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    console.log(response);

    if (response.status !== 200) {
        throw new Error(`addBook returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const editBook = async ({ bookId, bookShelfId, newName, newAuthor }) => {
    const response = await fetch(hostname + `/bookshelf/${bookShelfId}/book/${bookId}`, {
        method: 'PATCH', 
        body: JSON.stringify({ newName: newName, newAuthor: newAuthor }), 
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`editBookName returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const removeBook = async ({ bookId, bookShelfId }) => {
    const response = await fetch(hostname + `/bookshelf/${bookShelfId}/book/${bookId}`, {
        method: 'DELETE'
    });

    if (response.status !== 200) {
        throw new Error(`removeBook returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

const moveBook = async ({ bookId, bookShelfId, destShelfId }) => {
    const response = await fetch(hostname + `/bookshelf/${bookShelfId}`, {
        method: 'PATCH',
        body: JSON.stringify({ bookId: bookId, destShelfId: destShelfId }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (response.status !== 200) {
        throw new Error(`removeBook returned ${response.status}`);
    }
    const { info } = await response.json();
    console.log(info);
};

export {
    getBookShelfs,
    addBookShelf,
    addBook,
    editBook,
    removeBook,
    moveBook,
};
