var express = require('express');
var app = express();
var server = app.listen(3000)

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database(__dirname + '/db/book.db')
const result = []

app.use(express.json())

db.serialize(() => {
    const createTable = `
    CREATE TABLE IF NOT EXISTS books (
        book_id INTEGER PRIMARY KEY,
        book_title TEXT NOT NULL,
        author TEXT NOT NULL
    );`

    db.run(createTable)

    db.each('SELECT book_id, book_title, author FROM books', (err, row) => {
        var book = {
            book_id: row.book_id,
            book_title: row.book_title,
            author: row.author
        }
        result.push(book)
    })

})


app.get('/api/books', function (req, res) {
    res.send(JSON.stringify(result))
    res.end();

})

app.get('/api/books/:id', function (req, res) {
    const id = req.params.id
    const output = result.filter((book) => book.book_id == id)
    res.send(JSON.stringify(output))
    res.end();
})

app.put('/api/books/:id', function (req, res) {
    if (req.body.book_title === "") {
        // 400 bad request
        res.status(400).send('book_title is required field')
        return
    }
    const id = req.params.id
    db.serialize(() => {
        db.run(`
                UPDATE books
                SET book_title = '${req.body.book_title}'
                WHERE
                    book_id=${id}
            `,
            function (err) {
                if (err) {
                    return console.log(err.message);
                }
            });
    })

    book = {
        msg: 'Record updated'
    }
    res.send(JSON.stringify(book))
    res.end();
})

app.delete('/api/books/:id', function (req, res) {
    const id = req.params.id
    db.serialize(() => {
        db.run(`
        DELETE FROM books
        WHERE
            book_id=${id}
    `, function (err) {
            if (err) {
                return console.log(err.message);
            }
        })
    })
    book = {
        msg: 'Record deleted.'
    }
    res.send(JSON.stringify(book))
    res.end();
})

app.post('/api/books', function (req, res) {
    if (req.body.book_title === "" || req.body.author === "") {
        // 400 bad request
        res.status(400).send('book_title and authors are required fields')
        return
    }

    db.serialize(() => {
        db.run(`
            INSERT INTO 
                books(book_title,author) 
                VALUES(?,?)
            `,
            [req.body.book_title, req.body.author],
            function (err) {
                if (err) {
                    return console.log(err.message);
                }
            });
    })

    book = {
        msg: 'New Record added'
    }
    res.status(201)
    res.send(JSON.stringify(book))
    res.end();
})

