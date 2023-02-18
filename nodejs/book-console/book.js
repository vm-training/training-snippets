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

const createBook = (title, author) => {
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

const updateBook = (title, newtitle) => {
    let books = loadBook()
    const duplicateBooks = books.filter((book) => book.title === newtitle)
    const currentBook = books.filter((book) => book.title === title)
    let author = currentBook[0].author
    removeBook(title)
    books = loadBook()
    if (duplicateBooks.length === 0) {
        books.push({
            title: newtitle,
            author: author
        })
        console.log(`"${title}" book updated with ${newtitle}.`)
    }
    else {
        console.log('Duplicate book title!')
    }

    saveBook(books)
}

module.exports = {
    createBook,
    updateBook,
    removeBook,
    listBook
}