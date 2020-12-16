const express = require('express');
const app = express();
const { readData, writeData } = require('./utils');

const port = 9999;
const hostname = 'localhost';

let bookShelfs = [];

app.use((request, response, next) => {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(express.json());

app.options('/*', (request, response) => {
    response.statusCode = 200;
    response.send('OK');
});

app.get('/bookshelf', async (request, response) => {
    bookShelfs = await readData();
    response.setHeader('Content-Type', 'application/json');
    response.status(200).json(bookShelfs);
});

app.post('/bookshelf', async (request, response) => {
    const bookShelf = request.body;
    bookShelfs.push(bookShelf);
    await writeData(bookShelfs);
    response.status(200).json({info: 'Bookshelf succefully created!'});
});

app.post('/bookshelf/:bookShelfId/book', async (request, response) => {
    const book = request.body;
    const bookShelfId = Number(request.params.bookShelfId);
    bookShelfs[bookShelfId].books.push(book);
    await writeData(bookShelfs);
    response.status(200).json({info: 'Book succefully created!'});
});

app.patch('/bookshelf/:bookShelfId/book/:bookId', async (request, response) => {
    const { newName, newAuthor } = request.body;
    const bookShelfId = Number(request.params.bookShelfId);
    const bookId = Number(request.params.bookId);

    bookShelfs[bookShelfId].books[bookId].name = newName;
    bookShelfs[bookShelfId].books[bookId].author = newAuthor;

    await writeData(bookShelfs);
    response.status(200).json({info: 'Book succefully changed!'});
});

app.delete('/bookshelf/:bookShelfId/book/:bookId', async (request, response) => {
    const bookShelfId = Number(request.params.bookShelfId);
    const bookId = Number(request.params.bookId);

    bookShelfs[bookShelfId].books.splice(bookId, 1);

    await writeData(bookShelfs);
    response.status(200).json({info: 'Book succefully deleted!'});
});

app.patch('/bookshelf/:bookShelfId', async (request, response) => {
    const bookShelfId = Number(request.params.bookShelfId);
    const { bookId, destShelfId } = request.body;

    const bookToMove =  bookShelfs[bookShelfId].books.splice(bookId, 1);
    bookShelfs[destShelfId].books.push(bookToMove);

    await writeData(bookShelfs);
    response.status(200).json({info: 'Book succefully moved!'});
});

app.listen(port, hostname, (error) => {
    if (error) {
        console.error(error);
    }
});
