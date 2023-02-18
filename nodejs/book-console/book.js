const saveBook = (book) => {
    const fs = require('fs')
    const bookJSON = JSON.stringify(book)
    fs.writeFileSync(__dirname + '/book.json', bookJSON)
}

const loadBook = () => {
    const fs = require('fs')
    try {
        const databuffer = fs.readFileSync(__dirname + '/book.json')
        const bookJSON = databuffer.toString()
        return JSON.parse(bookJSON)
    }
    catch (err) {
        return []
    }
}

const addBook = (title, author) => {

    const books = loadBook()
    const duplicateBooks = books.filter((book) => book.title === title)

    if (duplicateBooks.length === 0) {
        books.push({
            title: title,
            author: author
        })
        console.log(`"${title}" book added.`)
    }
    else {
        console.log('Duplicate book title!')
    }

    saveBook(books)
}


const listBook = () => {
    const books = loadBook()
    books.forEach(book => {
        console.log(`${book.title} - ${book.author}`)
    });
}

const removeBook = (title) => {
    const books = loadBook()
    const bookToKeep = books.filter((book) => book.title !== title)
    console.log(`"${title}" book removed.`)
    saveBook(bookToKeep)
}

module.exports = {
    create: addBook,
    remove: removeBook,
    list: listBook
}