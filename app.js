
const express = require('express');
const app = express();
app.use(express.json());

let books = [
    { id: 1, title: "1984", author: "George Orwell", publishedYear: 1949 },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", publishedYear: 1960 },
];


app.get('/books', (req, res) => {
    res.json(books);
});


app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});


app.post('/books', (req, res) => {
    const { title, author, publishedYear } = req.body;
    const newBook = {
        id: books.length ? books[books.length - 1].id + 1 : 1,
        title,
        author,
        publishedYear
    };
    books.push(newBook);
    res.status(201).json(newBook);  // Return the entire book object
});

app.put('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex !== -1) {
        const { title, author, publishedYear } = req.body;
        books[bookIndex] = { ...books[bookIndex], title, author, publishedYear };
        res.json(books[bookIndex]);
    } else {
        res.status(404).send('Book not found');
    }
});



app.delete('/books/:id', (req, res) => {
    const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
    if (bookIndex !== -1) {
        books.splice(bookIndex, 1);
        res.json({ message: "Book deleted successfully" });
    } else {
        res.status(404).send('Book not found');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
