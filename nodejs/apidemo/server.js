const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const package = require('./package.json')
const apiRoot = '/api'
const db = {
    'Microphone': {
        'product': 'Microphone',
        'brand': 'Boat',
        'price': 3000,
        'description': 'Providing noise cancellation feature'
    }
}
const port = 3000

const app = express()
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({ origin: /http:\/\/localhost/ }))
app.options('*', cors())
app.listen(port, () => {
    console.log('Server is up!')
})

const router = express.Router()
app.use(apiRoot, router)

router.get('/', (req, res) => {
    res.send(`${package.description} - v${package.version}`)
})
/*
URL: /api/products/Microphone
Method : GET
*/

router.get('/products/:product', (req, res) => {
    const product = req.params.product
    const result = db[product]
    if (!result) {
        return res.json({ error: 'Product does not exists' })
            .status(404)
    }
    return res.json(result)
})

/*
URL: /api/products/
Method: POST
Header: {"Content-Type": "application/json"}
Body
{
"product": "Speaker",
"price": "1999",
"brand": "Sony"
"description":"Woody experience!"
}
*/
router.post('/products', (req, res) => {
    const body = req.body
    if (!body.brand || !body.price) {
        return res.json({ error: 'Brand and price required' }).status(400)
    }

    if (db[body.product]) {
        return res.json({ error: 'Product already exists' }).status(400)
    }

    const data = {
        product: body.product,
        brand: body.brand,
        price: body.price,
        description: body.description
    }

    db[data.product] = data
    return res.json(data).status(201)
})

/*
URL: /api/products/Speaker
Method: PUT
Header: {"Content-Type": "application/json"}
Body
{
"price": "2999",
"description":"Must have product"
}
*/

router.put('/products/:product', (req, res) => {
    const body = req.body
    const product = req.params.product

    const data = db[product]

    if (!data) {
        return res.json({ error: 'Product not found' }).status(404)
    }

    if (body.description) {
        data.description = body.description
    }

    if (body.price) {
        data.price = body.price
    }

    return res.json(data).status(201)
})

router.delete('/products/:product', (req, res) => {
    const product = req.params.product
    const data = db[product]

    if (!data) {
        return res.json({ error: 'Product not found!' }).status(404)
    }

    delete db[product]
    return res.status(204)
})