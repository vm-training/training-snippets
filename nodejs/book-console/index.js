
const { createBook, updateBook, removeBook, listBook } = require('./book')

const argv = require('yargs/yargs')(process.argv.slice(2))
    .command(
        'add',
        'To add book',
        function (yargs) {
            return yargs.options({
                't': {
                    alias: 'title',
                    demandOption: true,
                    describe: 'Title of the book'
                },
                'a': {
                    alias: 'author',
                    demandOption: true,
                    describe: 'Author of the book'
                }

            })
        },
        function (argv) {
            createBook(argv.title, argv.author)
        }
    )
    .command(
        'update',
        'To update book',
        function (yargs) {
            return yargs.options({
                't': {
                    alias: 'title',
                    demandOption: true,
                    describe: 'Title of the book'
                },
                'n': {
                    alias: 'newtitle',
                    demandOption: true,
                    describe: 'New title of the book'
                }

            })
        },
        function (argv) {
            updateBook(argv.title, argv.newtitle)
        }
    )
    .command(
        'list',
        'To list book',
        function (yargs) {
            return
        },
        function (argv) {
            listBook()
        }
    )
    .command(
        'remove',
        'To remove book',
        function (yargs) {
            return yargs.option('t', {
                alias: 'title',
                demandOption: true,
                describe: 'Title of the book'
            })
        },
        function (argv) {
            removeBook(argv.title)
        }
    )
    .help()
    .argv

