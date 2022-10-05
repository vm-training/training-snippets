
const book = require('./book')

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
            book.create(argv.title, argv.author)
        }
    )
    .command(
        'list',
        'To list book',
        function (yargs) {
            return
        },
        function (argv) {
            book.list()
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
            book.remove(argv.title)
        }
    )
    .help()
    .argv

