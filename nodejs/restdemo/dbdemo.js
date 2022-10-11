const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('books.db')

db.serialize(() => {
    const createTable = `
    CREATE TABLE books (
        book_id INTEGER PRIMARY KEY,
        book_title TEXT NOT NULL,
        author TEXT NOT NULL
    );`

    db.run(createTable)
    db.run(`
                INSERT INTO 
                    books(book_title,author) 
                    VALUES(?,?)
            `,
        ['It Ends with Us', 'Colleen Hoover'],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with id ${this.lastID} `);
        });

    db.run(`
            INSERT INTO 
                books(book_title,author) 
                VALUES(?,?)
        `,
        ['ATOMIC HABITS', 'James Clear'],
        function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with id ${this.lastID} `);
        });

    db.each('SELECT book_id, book_title, author FROM books', (err, row) => {
        console.log(`${row.book_id}: ${row.book_title} - ${row.author} `)
    })

    id = 1
    db.run(`
        UPDATE books
            SET book_title = 'All Your Perfects'
            WHERE
                book_id=${id}
        `, function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been updated with id ${this.lastID} `);
    })

    db.each('SELECT book_id, book_title, author FROM books', (err, row) => {
        console.log(`${row.book_id}: ${row.book_title} - ${row.author} `)
    })

    id = 2
    db.run(`
            DELETE FROM books
            WHERE
                book_id=${id}
        `, function (err) {
        if (err) {
            return console.log(err.message);
        }
        // get the last insert id
        console.log(`A row has been deleted with id ${this.lastID} `);
    })

    db.each('SELECT book_id, book_title, author FROM books', (err, row) => {
        console.log(`${row.book_id}: ${row.book_title} - ${row.author} `)
    })
})

db.close()